import { supabase } from './supabaseClient'

const SLOT_WINDOW_DIAS = 30

function toMinutes(value) {
  const [h, m] = value.split(':').map(Number)
  return h * 60 + m
}

function minutesToHHMM(mins) {
  const h = String(Math.floor(mins / 60)).padStart(2, '0')
  const m = String(mins % 60).padStart(2, '0')
  return `${h}:${m}`
}

function normalizeTime(value) {
  return value.slice(0, 5)
}

function formatDateISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function groupBy(list, keyFn) {
  return list.reduce((acc, item) => {
    const key = keyFn(item)
    ;(acc[key] ??= []).push(item)
    return acc
  }, {})
}

/**
 * fetchAvailableSlots — calcula os horários realmente livres pros próximos
 * `days` dias, a partir de availability_rules (regra semanal recorrente),
 * availability_exceptions (bloqueios/liberações pontuais) e appointments já
 * ocupados (qualquer status diferente de 'cancelled'). Roda no cliente:
 * as três tabelas têm leitura pública liberada por RLS especificamente pra
 * isso (ver supabase/schema.sql).
 */
export async function fetchAvailableSlots({ modalidade, days = SLOT_WINDOW_DIAS } = {}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const end = new Date(today)
  end.setDate(end.getDate() + days)

  const [rulesRes, exceptionsRes, bookedRes] = await Promise.all([
    supabase.from('availability_rules').select('*').eq('ativo', true),
    supabase
      .from('availability_exceptions')
      .select('*')
      .gte('data', formatDateISO(today))
      .lte('data', formatDateISO(end)),
    supabase
      .from('appointments')
      .select('data, horario')
      .neq('status', 'cancelled')
      .gte('data', formatDateISO(today))
      .lte('data', formatDateISO(end)),
  ])

  if (rulesRes.error) throw rulesRes.error
  if (exceptionsRes.error) throw exceptionsRes.error
  if (bookedRes.error) throw bookedRes.error

  const rules = rulesRes.data ?? []
  const exceptionsByDate = groupBy(exceptionsRes.data ?? [], (e) => e.data)
  const bookedSet = new Set((bookedRes.data ?? []).map((b) => `${b.data}|${normalizeTime(b.horario)}`))

  const now = new Date()
  const hojeISO = formatDateISO(today)
  const minutosAgora = now.getHours() * 60 + now.getMinutes()

  const slotsByDate = []

  for (let i = 0; i < days; i += 1) {
    const day = new Date(today)
    day.setDate(day.getDate() + i)
    const dateISO = formatDateISO(day)
    const dow = day.getDay()
    const dayExceptions = exceptionsByDate[dateISO] ?? []

    const bloqueioDiaInteiro = dayExceptions.some(
      (e) =>
        e.tipo === 'bloqueio' &&
        !e.hora_inicio &&
        (!e.modalidade || !modalidade || e.modalidade === modalidade)
    )
    if (bloqueioDiaInteiro) continue

    const daySlots = new Map()

    for (const rule of rules) {
      if (rule.dia_semana !== dow) continue
      if (modalidade && rule.modalidade !== modalidade) continue

      let cursor = toMinutes(rule.hora_inicio)
      const fim = toMinutes(rule.hora_fim)
      while (cursor + rule.duracao_minutos <= fim) {
        const horario = minutesToHHMM(cursor)
        daySlots.set(`${horario}|${rule.modalidade}`, { horario, modalidade: rule.modalidade })
        cursor += rule.duracao_minutos
      }
    }

    for (const exception of dayExceptions) {
      if (exception.tipo !== 'liberacao' || !exception.hora_inicio) continue
      if (modalidade && exception.modalidade && exception.modalidade !== modalidade) continue
      const horario = normalizeTime(exception.hora_inicio)
      const mod = exception.modalidade ?? modalidade ?? 'Presencial'
      daySlots.set(`${horario}|${mod}`, { horario, modalidade: mod })
    }

    for (const exception of dayExceptions) {
      if (exception.tipo !== 'bloqueio' || !exception.hora_inicio) continue
      const inicio = toMinutes(exception.hora_inicio)
      const fim = exception.hora_fim ? toMinutes(exception.hora_fim) : inicio + 1
      for (const [key, slot] of daySlots) {
        const slotMin = toMinutes(slot.horario)
        if (slotMin >= inicio && slotMin < fim) daySlots.delete(key)
      }
    }

    for (const [key, slot] of daySlots) {
      if (bookedSet.has(`${dateISO}|${slot.horario}`)) daySlots.delete(key)
    }

    const slots = Array.from(daySlots.values())
      .filter((slot) => dateISO !== hojeISO || toMinutes(slot.horario) > minutosAgora)
      .sort((a, b) => a.horario.localeCompare(b.horario))

    if (slots.length > 0) {
      slotsByDate.push({ data: dateISO, slots })
    }
  }

  return slotsByDate
}

/**
 * createAppointment — grava o pedido (sempre 'pending', RLS não deixa criar
 * com outro status) e dispara a notificação por e-mail. Se o e-mail falhar,
 * o agendamento continua salvo (a Sarah ainda vê no /admin/agendamentos) —
 * por isso o erro da function é só logado, nunca propagado pro chamador.
 */
export async function createAppointment({ nome, contato, modalidade, data, horario, mensagem }) {
  const { data: inserted, error } = await supabase
    .from('appointments')
    .insert({ nome, contato, modalidade, data, horario, mensagem: mensagem || null })
    .select()
    .single()

  if (error) throw error

  try {
    await supabase.functions.invoke('notify-booking', { body: { appointmentId: inserted.id } })
  } catch (notifyError) {
    console.error('Falha ao notificar por e-mail (o agendamento já foi salvo):', notifyError)
  }

  return inserted
}
