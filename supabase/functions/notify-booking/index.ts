// notify-booking — Edge Function chamada pelo site logo após um visitante
// criar um pedido de agendamento (status 'pending'). Busca o registro com a
// service role key (só existe aqui, nunca no front) e dispara um e-mail pra
// Sarah via Resend. Se RESEND_API_KEY/NOTIFY_EMAIL não estiverem
// configurados, não falha o agendamento — só deixa de enviar o e-mail (o
// pedido já foi salvo e aparece no /admin/agendamentos de qualquer forma).
//
// Secrets necessários (Project Settings → Edge Functions → Secrets, ou
// `supabase secrets set`):
//   RESEND_API_KEY   — chave da conta Resend (resend.com)
//   NOTIFY_EMAIL     — e-mail da Sarah, que recebe a notificação
//   NOTIFY_FROM_EMAIL — opcional; remetente. Sem domínio verificado no
//                       Resend, use o padrão de testes 'onboarding@resend.dev'.
//
// SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY já existem automaticamente no
// ambiente de toda Edge Function — não precisam ser configurados à mão.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const NOTIFY_EMAIL = Deno.env.get('NOTIFY_EMAIL')
const FROM_EMAIL = Deno.env.get('NOTIFY_FROM_EMAIL') ?? 'onboarding@resend.dev'

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  let appointmentId
  try {
    ;({ appointmentId } = await req.json())
  } catch {
    return jsonResponse({ error: 'JSON inválido' }, 400)
  }

  if (!appointmentId) {
    return jsonResponse({ error: 'appointmentId é obrigatório' }, 400)
  }

  const { data: appointment, error } = await supabaseAdmin
    .from('appointments')
    .select('*')
    .eq('id', appointmentId)
    .single()

  if (error || !appointment) {
    return jsonResponse({ error: 'Agendamento não encontrado' }, 404)
  }

  if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
    console.warn('RESEND_API_KEY/NOTIFY_EMAIL não configurados — e-mail não enviado.')
    return jsonResponse({ ok: true, emailSent: false })
  }

  const dataFormatada = new Date(`${appointment.data}T00:00:00`).toLocaleDateString('pt-BR')
  const corpo = [
    `Nome: ${appointment.nome}`,
    `Contato: ${appointment.contato}`,
    `Modalidade: ${appointment.modalidade}`,
    `Data: ${dataFormatada}`,
    `Horário: ${appointment.horario}`,
    appointment.mensagem ? `Mensagem: ${appointment.mensagem}` : null,
    '',
    'Confirme ou recuse esse pedido no painel admin do site (/admin/agendamentos).',
  ]
    .filter(Boolean)
    .join('\n')

  const emailResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `Novo pedido de agendamento — ${appointment.nome}`,
      text: corpo,
    }),
  })

  if (!emailResponse.ok) {
    console.error('Falha ao enviar e-mail via Resend:', await emailResponse.text())
    return jsonResponse({ ok: true, emailSent: false })
  }

  return jsonResponse({ ok: true, emailSent: true })
})
