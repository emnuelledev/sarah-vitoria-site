import { Link } from 'react-router-dom'
import PageMeta from '../components/ui/PageMeta'
import Hero from '../components/ui/Hero'
import SectionTitle from '../components/ui/SectionTitle'
import CTASection from '../components/ui/CTASection'
import ContentCard from '../components/ui/ContentCard'
import ImagePlaceholder from '../components/ui/ImagePlaceholder'
import Sparkles from '../components/ui/Sparkles'
import Reveal from '../components/ui/Reveal'
import { contents } from '../data/contents'
import { metodo, comoFunciona } from '../data/method'
import fotoSarah from '../assets/sarah/sarah-consultorio-frente.jpg'
import './Home.css'

function Home() {
  const destaques = contents.slice(0, 4)

  return (
    <>
      <PageMeta
        title="Home"
        description="Nutrição gentil e adaptada à vida real, com a nutricionista Sarah Vitória. Conheça o Método Metamorfose."
      />
      <Hero
        variant="split"
        signature
        eyebrow="Sarah Vitória · Nutricionista"
        title={
          <>
            Nutrição que se adapta à <em>sua vida real</em>.
          </>
        }
        text="Um acompanhamento pensado para caber na rotina como ela é — com mais apoio, menos cobrança e espaço para recomeçar sempre que for preciso."
        primaryCta={{ label: 'Agendar consulta', to: '/agendamento' }}
        secondaryCta={{ label: 'Conhecer o acompanhamento', to: '/acompanhamento' }}
        imageLabel="Fotografia principal — Sarah Vitória"
        imageSrc={fotoSarah}
        imageAlt="Sarah Vitória, nutricionista, sorrindo em seu consultório"
      />

      {/* ABORDAGEM */}
      <section className="section home-abordagem">
        <div className="container home-abordagem__grid">
          <Reveal as="p" className="home-abordagem__frase">
            “Equilíbrio na vida real — não a busca por uma dieta perfeita.”
          </Reveal>
          <Reveal as="div" className="home-abordagem__texto" delay={100}>
            <p>
              A nutrição, aqui, é gentil. Sem julgamentos, sem regras rígidas demais para
              caber no seu dia. É sobre ajustar a alimentação à vida que você já vive —
              com mais apoio e menos cobrança, um passo por vez.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PREVIEW — MÉTODO METAMORFOSE */}
      <section className="metamorfose-preview">
        <Sparkles variant="butterfly" />
        <div className="container metamorfose-preview__inner">
          <Reveal as="p" className="eyebrow metamorfose-preview__eyebrow">
            O acompanhamento
          </Reveal>
          <Reveal as="h2" className="metamorfose-preview__titulo" delay={60}>
            Método <em>Metamorfose</em>
          </Reveal>
          <Reveal as="p" className="metamorfose-preview__chamada" delay={120}>
            {metodo.chamada}
          </Reveal>

          <Reveal as="ul" className="metamorfose-preview__campos" delay={180}>
            {comoFunciona.map((fase) => (
              <li key={fase.numero}>{fase.titulo}</li>
            ))}
          </Reveal>

          <Reveal delay={220}>
            <Link to="/acompanhamento" className="btn btn-on-dark">
              Conhecer o acompanhamento
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PREVIEW — SOBRE SARAH */}
      <section className="section home-sobre">
        <div className="container home-sobre__grid">
          <Reveal as="div" className="home-sobre__imagem">
            <ImagePlaceholder label="Fotografia — Sarah Vitória" ratio="1 / 1" />
          </Reveal>
          <Reveal as="div" className="home-sobre__texto" delay={100}>
            <p className="eyebrow">Quem está do outro lado</p>
            <h2>Antes de ser a nutri Sarah, eu também sou…</h2>
            <p className="home-sobre__descricao">
              Fé, família, dança, curiosidade por outras culturas e uma vontade constante
              de aprender coisas novas. Tudo isso também faz parte da profissional que
              recebe você.
            </p>
            <Link to="/sobre" className="btn-ghost">
              Conheça a Sarah
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CONTEÚDOS EM DESTAQUE */}
      <section className="section section--tight home-conteudos">
        <div className="container">
          <div className="home-conteudos__header">
            <SectionTitle
              eyebrow="Conteúdos"
              title="Para entender melhor sua alimentação"
              description="Reflexões e informações que também circulam no Instagram da Sarah."
            />
            <Link to="/conteudos" className="btn-ghost home-conteudos__link">
              Ver todos os conteúdos
            </Link>
          </div>

          <div className="home-conteudos__grid">
            {destaques.map((item, index) => (
              <ContentCard content={item} key={item.id} delay={index * 70} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Vamos começar?"
        title="Seu acompanhamento começa com uma conversa."
        description="Agende sua consulta e dê o primeiro passo para uma nutrição que faz sentido na sua vida."
        ctaLabel="Agendar consulta"
        ctaTo="/agendamento"
        variant="lilas"
      />
    </>
  )
}

export default Home
