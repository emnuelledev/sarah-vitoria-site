import { useEffect } from 'react'

const SITE_NAME = 'Sarah Vitória — Nutricionista'
const DEFAULT_DESCRIPTION =
  'Acompanhamento nutricional gentil e adaptado à vida real, com a nutricionista Sarah Vitória.'

function setMeta(nameOrProp, content, isProperty = false) {
  if (!content) return
  const attr = isProperty ? 'property' : 'name'
  let tag = document.head.querySelector(`meta[${attr}="${nameOrProp}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, nameOrProp)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

/**
 * PageMeta — SEO básico por página (title, description, Open Graph).
 * Sem dependências externas: atualiza <head> via useEffect.
 */
function PageMeta({ title, description = DEFAULT_DESCRIPTION }) {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${SITE_NAME}` : SITE_NAME
    document.title = fullTitle

    setMeta('description', description)
    setMeta('og:title', fullTitle, true)
    setMeta('og:description', description, true)
    setMeta('og:type', 'website', true)
    setMeta('og:site_name', SITE_NAME, true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', description)
  }, [title, description])

  return null
}

export default PageMeta
