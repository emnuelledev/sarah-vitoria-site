import { supabase } from './supabaseClient'

// ============================================================================
// admin.js — chamadas ao Supabase usadas só pelo painel /admin (exigem
// sessão autenticada; RLS bloqueia tudo isso pra visitante anônimo, ver
// supabase/schema.sql). Separado de src/lib/content.js e
// src/lib/availability.js, que são as leituras públicas do site.
// ============================================================================

// ---- Agendamentos ----

export async function fetchAppointments() {
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .order('data', { ascending: true })
    .order('horario', { ascending: true })

  if (error) throw error
  return data
}

export async function updateAppointmentStatus(id, status) {
  const { error } = await supabase.from('appointments').update({ status }).eq('id', id)
  if (error) throw error
}

// ---- Disponibilidade — regras semanais ----

export async function fetchAvailabilityRules() {
  const { data, error } = await supabase
    .from('availability_rules')
    .select('*')
    .order('dia_semana', { ascending: true })
    .order('hora_inicio', { ascending: true })

  if (error) throw error
  return data
}

export async function createAvailabilityRule(rule) {
  const { error } = await supabase.from('availability_rules').insert(rule)
  if (error) throw error
}

export async function updateAvailabilityRule(id, patch) {
  const { error } = await supabase.from('availability_rules').update(patch).eq('id', id)
  if (error) throw error
}

export async function deleteAvailabilityRule(id) {
  const { error } = await supabase.from('availability_rules').delete().eq('id', id)
  if (error) throw error
}

// ---- Disponibilidade — exceções pontuais ----

export async function fetchAvailabilityExceptions() {
  const { data, error } = await supabase
    .from('availability_exceptions')
    .select('*')
    .order('data', { ascending: true })

  if (error) throw error
  return data
}

export async function createAvailabilityException(exception) {
  const { error } = await supabase.from('availability_exceptions').insert(exception)
  if (error) throw error
}

export async function deleteAvailabilityException(id) {
  const { error } = await supabase.from('availability_exceptions').delete().eq('id', id)
  if (error) throw error
}

// ---- Conteúdos ----

export async function fetchAllContents() {
  const { data, error } = await supabase.from('contents').select('*').order('ordem', { ascending: true })
  if (error) throw error
  return data
}

export async function createContent(row) {
  const { error } = await supabase.from('contents').insert(row)
  if (error) throw error
}

export async function updateContent(id, patch) {
  const { error } = await supabase
    .from('contents')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
  if (error) throw error
}

export async function deleteContent(id) {
  const { error } = await supabase.from('contents').delete().eq('id', id)
  if (error) throw error
}

// ---- Depoimentos ----

export async function fetchAllTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('ordem', { ascending: true })
  if (error) throw error
  return data
}

export async function createTestimonial(row) {
  const { error } = await supabase.from('testimonials').insert(row)
  if (error) throw error
}

export async function updateTestimonial(id, patch) {
  const { error } = await supabase.from('testimonials').update(patch).eq('id', id)
  if (error) throw error
}

export async function deleteTestimonial(id) {
  const { error } = await supabase.from('testimonials').delete().eq('id', id)
  if (error) throw error
}

// ---- FAQ ----

export async function fetchAllFaq() {
  const { data, error } = await supabase.from('faq').select('*').order('ordem', { ascending: true })
  if (error) throw error
  return data
}

export async function createFaqEntry(row) {
  const { error } = await supabase.from('faq').insert(row)
  if (error) throw error
}

export async function updateFaqEntry(id, patch) {
  const { error } = await supabase.from('faq').update(patch).eq('id', id)
  if (error) throw error
}

export async function deleteFaqEntry(id) {
  const { error } = await supabase.from('faq').delete().eq('id', id)
  if (error) throw error
}
