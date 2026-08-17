import { supabase } from './supabaseClient'

// Mapeia a linha do banco pro mesmo formato que ContentCard/Artigo já usam
// (vindo antes de src/data/contents.js) — assim os componentes não mudam.
function mapContentRow(row) {
  return {
    id: row.id,
    categoria: row.categoria,
    titulo: row.titulo,
    descricao: row.descricao,
    corpo: row.corpo,
    imagem: row.imagem_url,
    url: row.url,
    data: row.created_at,
  }
}

export async function fetchContents() {
  const { data, error } = await supabase
    .from('contents')
    .select('*')
    .order('ordem', { ascending: true })

  if (error) throw error
  return data.map(mapContentRow)
}

export async function fetchContentById(id) {
  const { data, error } = await supabase.from('contents').select('*').eq('id', id).maybeSingle()

  if (error) throw error
  return data ? mapContentRow(data) : null
}

export async function fetchTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('ordem', { ascending: true })

  if (error) throw error
  return data
}

// FAQAccordion espera `download: { label, href }` (ou undefined) — mapeamos
// aqui pra manter o componente igual ao que já existia com faq.js.
function mapFaqRow(row) {
  return {
    id: row.id,
    pergunta: row.pergunta,
    resposta: row.resposta,
    download: row.download_href
      ? { label: row.download_label, href: row.download_href }
      : undefined,
  }
}

export async function fetchFaq() {
  const { data, error } = await supabase.from('faq').select('*').order('ordem', { ascending: true })

  if (error) throw error
  return data.map(mapFaqRow)
}
