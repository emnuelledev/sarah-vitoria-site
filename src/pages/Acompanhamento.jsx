import PageMeta from '../components/ui/PageMeta'
import Hero from '../components/ui/Hero'
import SectionTitle from '../components/ui/SectionTitle'
import CTASection from '../components/ui/CTASection'
import MethodStep from '../components/ui/MethodStep'
import MaterialPreview from '../components/ui/MaterialPreview'
import FAQAccordion from '../components/ui/FAQAccordion'
import Sparkles from '../components/ui/Sparkles'
import Reveal from '../components/ui/Reveal'
import TestimonialCard from '../components/ui/TestimonialCard'
import {
  metodo,
  comoFunciona,
  oQueEsperar,
  paraQuem,
  planos,
  planosNota,
  materiais,
} from '../data/method'
import { fetchFaq, fetchTestimonials } from '../lib/content'
import useAsync from '../lib/useAsync'
import './Acompanhamento.css'

const METODO_DETALHES = [
  { label: 'Duração', valor: metodo.duracao },
  { label: 'Formato', valor: metodo.formato },
]

function Acompanhamento() {
  const { data: testimonials } = useAsync(fetchTestimonials, [])
  const { data: faq } = useAsync(fetchFaq, [])

  return (
    <>
      <PageMeta
        title="Acompanhamento"
        description="Conheça o Método Metamorfose: como funciona o acompanhamento nutricional com a Sarah Vitória."
      />
      <Hero
        variant="simple"
        align="center"
        eyebrow="Acompanhamento"
        title="Acompanhamento nutricional"
        text="Um cuidado contínuo, construído junto com você — que respeita seu ritmo, sua rotina e o que faz sentido na sua vida."
        primaryCta={{ label: 'Agendar consulta', to: '/agendamento' }}
      />

      {/* MÉTODO METAMORFOSE */}
      <section className="metodo-metamorfose">
        <Sparkles variant="butterfly" />
        <div className="container metodo-metamorfose__inner">
          <Reveal as="p" className="eyebrow metodo-metamorfose__eyebrow">
            O acompanhamento se chama
          </Reveal>
          <Reveal as="h2" className="metodo-metamorfose__titulo" delay={60}>
            Método <em>Metamorfose</em>
          </Reveal>
          <Reveal as="p" className="metodo-metamorfose__conceito" delay={100}>
            {metodo.conceito}
          </Reveal>

          <div className="metodo-metamorfose__detalhes">
            {METODO_DETALHES.map((item, index) => (
              <Reveal
                as="div"
                className="metodo-metamorfose__detalhe"
                key={item.label}
                delay={160 + index * 60}
              >
                <p className="eyebrow">{item.label}</p>
                <p>{item.valor}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="section section--tight como-funciona">
        <div className="container">
          <SectionTitle eyebrow="Como funciona" title="As 3 fases do Método Metamorfose" />
          <div className="como-funciona__lista">
            {comoFunciona.map((etapa, index) => (
              <MethodStep
                key={etapa.numero}
                numero={etapa.numero}
                titulo={etapa.titulo}
                descricao={etapa.descricao}
                delay={index * 70}
              />
            ))}
          </div>
        </div>
      </section>

      {/* O QUE VOCÊ PODE ESPERAR */}
      <section className="section section--tight o-que-esperar">
        <div className="container">
          <SectionTitle
            eyebrow="Diferenciais"
            title="O que você pode esperar do método"
          />
          <div className="o-que-esperar__grid">
            {oQueEsperar.map((item, index) => (
              <Reveal as="div" className="o-que-esperar__item" key={item.titulo} delay={index * 60}>
                <span className="o-que-esperar__numero" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{item.titulo}</h3>
                <p>{item.descricao}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section className="section para-quem">
        <div className="container">
          <SectionTitle eyebrow="Para quem" title="Talvez você se reconheça em uma dessas frases" />
          <ul className="para-quem__lista">
            {paraQuem.map((frase, index) => (
              <Reveal as="li" key={frase} className="para-quem__item" delay={index * 80}>
                <span className="para-quem__aspas" aria-hidden="true">
                  “
                </span>
                <p>{frase}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="section section--tight depoimentos">
        <div className="container">
          <SectionTitle
            eyebrow="Depoimentos"
            title="Quem já passou pelo acompanhamento"
            description="Avaliações reais, direto do perfil da Sarah no Google."
          />
          <div className="depoimentos__grid">
            {(testimonials ?? []).map((depoimento, index) => (
              <TestimonialCard key={depoimento.id} testimonial={depoimento} delay={index * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* INVESTIMENTO */}
      <section className="section investimento">
        <div className="container">
          <SectionTitle
            eyebrow="Investimento"
            title="Planos"
            description="Valores válidos para a data de publicação deste site — sujeitos a atualização."
          />
          <div className="investimento__grid">
            {planos.map((plano, index) => (
              <Reveal
                as="div"
                className={'investimento__card' + (plano.destaque ? ' is-destaque' : '')}
                key={plano.id}
                delay={index * 90}
              >
                <div className="investimento__header">
                  <h3 className="investimento__nome">{plano.nome}</h3>
                  {plano.destaque && <span className="investimento__badge">Mais completo</span>}
                </div>
                <p className="investimento__preco">
                  {plano.preco}
                  <span>{plano.condicao}</span>
                </p>
                <ul className="investimento__lista">
                  {plano.inclui.map((linha) => (
                    <li key={linha}>{linha}</li>
                  ))}
                </ul>
                {plano.bonus.length > 0 && (
                  <>
                    <p className="investimento__bonus-titulo">E ainda você ganha</p>
                    <ul className="investimento__lista investimento__lista--bonus">
                      {plano.bonus.map((linha) => (
                        <li key={linha}>{linha}</li>
                      ))}
                    </ul>
                  </>
                )}
              </Reveal>
            ))}
          </div>
          <p className="investimento__nota">{planosNota}</p>
        </div>
      </section>

      {/* ALÉM DA CONSULTA */}
      <section className="section alem-consulta">
        <div className="container">
          <SectionTitle
            eyebrow="Além da consulta"
            title="Materiais desenvolvidos pela Sarah"
            description="Recursos práticos que já fazem parte da forma como a Sarah acompanha suas pacientes — apresentados aqui como exemplo do que pode compor o acompanhamento."
          />
          <div className="alem-consulta__grid">
            {materiais.map((material, index) => (
              <MaterialPreview
                key={material.id}
                titulo={material.titulo}
                descricao={material.descricao}
                imagem={material.imagem}
                download={material.download}
                delay={index * 60}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--tight acompanhamento-faq">
        <div className="container container--narrow">
          <SectionTitle eyebrow="Perguntas frequentes" title="Antes de agendar" />
          <FAQAccordion items={faq ?? []} />
        </div>
      </section>

      <CTASection
        eyebrow="Pronta para começar?"
        title="Quero iniciar meu acompanhamento"
        ctaLabel="Quero iniciar meu acompanhamento"
        ctaTo="/agendamento"
        variant="lilas"
      />
    </>
  )
}

export default Acompanhamento
