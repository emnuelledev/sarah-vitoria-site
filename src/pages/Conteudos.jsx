import { useMemo, useState } from 'react'
import PageMeta from '../components/ui/PageMeta'
import Hero from '../components/ui/Hero'
import ContentCard from '../components/ui/ContentCard'
import InstagramSection from '../components/ui/InstagramSection'
import { categories } from '../data/contents'
import { fetchContents } from '../lib/content'
import useAsync from '../lib/useAsync'
import './Conteudos.css'

function Conteudos() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos')
  const { data: contents } = useAsync(fetchContents, [])

  const listaFiltrada = useMemo(() => {
    const lista = contents ?? []
    if (categoriaAtiva === 'Todos') return lista
    return lista.filter((item) => item.categoria === categoriaAtiva)
  }, [contents, categoriaAtiva])

  return (
    <>
      <PageMeta
        title="Conteúdos"
        description="Reflexões e informações sobre comportamento, nutrição, rotina e saúde, por Sarah Vitória."
      />
      <Hero
        variant="simple"
        eyebrow="Conteúdos"
        title="Conteúdos para entender melhor sua alimentação — e sua relação com ela."
        text="Uma biblioteca em construção, com reflexões e informações práticas sobre comportamento, nutrição, rotina e saúde."
      />

      <section className="section section--tight conteudos-page">
        <div className="container">
          <div className="conteudos-page__filtros" role="group" aria-label="Filtrar por categoria">
            {categories.map((categoria) => (
              <button
                key={categoria}
                type="button"
                className={
                  'conteudos-page__filtro' +
                  (categoriaAtiva === categoria ? ' is-active' : '')
                }
                aria-pressed={categoriaAtiva === categoria}
                onClick={() => setCategoriaAtiva(categoria)}
              >
                {categoria}
              </button>
            ))}
          </div>

          {listaFiltrada.length > 0 ? (
            <div className="conteudos-page__grid">
              {listaFiltrada.map((item, index) => (
                <ContentCard content={item} key={item.id} delay={index * 60} />
              ))}
            </div>
          ) : (
            <p className="conteudos-page__vazio">
              Ainda não há conteúdos nesta categoria — em breve.
            </p>
          )}
        </div>
      </section>

      <InstagramSection />
    </>
  )
}

export default Conteudos
