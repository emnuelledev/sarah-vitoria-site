import { useParams, Link, Navigate } from 'react-router-dom'
import PageMeta from '../components/ui/PageMeta'
import Hero from '../components/ui/Hero'
import ImagePlaceholder from '../components/ui/ImagePlaceholder'
import Reveal from '../components/ui/Reveal'
import { fetchContentById } from '../lib/content'
import useAsync from '../lib/useAsync'
import './Artigo.css'

/**
 * Artigo — página individual de cada conteúdo (rota /conteudos/:id).
 * Antes era um popup, mas artigos maiores pedem uma página própria (mais
 * espaço para ler, URL compartilhável, melhor para SEO). O ContentCard
 * agora navega para cá em vez de abrir um modal.
 */
function Artigo() {
  const { id } = useParams()
  const { data: item, loading } = useAsync(() => fetchContentById(id), [id])

  if (loading) return null
  if (!item) return <Navigate to="/conteudos" replace />

  const isPlaceholder = item.corpo.trim().startsWith('[')
  const paragrafos = item.corpo.split('\n\n')

  return (
    <>
      <PageMeta title={item.titulo} description={item.descricao} />
      <Hero variant="simple" eyebrow={item.categoria} title={item.titulo} text={item.descricao} />

      <section className="section section--tight artigo-page">
        <div className="container container--narrow artigo-page__conteudo">
          <Reveal as="div" className="artigo-page__imagem">
            {item.imagem ? (
              <img src={item.imagem} alt="" />
            ) : (
              <ImagePlaceholder label="Imagem do conteúdo" ratio="16 / 9" />
            )}
          </Reveal>

          <Reveal
            as="div"
            delay={80}
            className={'artigo-page__corpo' + (isPlaceholder ? ' is-placeholder' : '')}
          >
            {paragrafos.map((paragrafo, index) => (
              <p key={index}>{paragrafo}</p>
            ))}
          </Reveal>

          <Reveal as="div" delay={140} className="artigo-page__acoes">
            {item.url && (
              <a href={item.url} target="_blank" rel="noreferrer" className="btn-ghost">
                Ver no Instagram
              </a>
            )}
            <Link to="/conteudos" className="artigo-page__voltar">
              ← Voltar para Conteúdos
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}

export default Artigo
