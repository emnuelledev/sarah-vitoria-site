import PageMeta from '../components/ui/PageMeta'
import Hero from '../components/ui/Hero'
import SectionTitle from '../components/ui/SectionTitle'
import CTASection from '../components/ui/CTASection'
import SpotifyEmbed from '../components/ui/SpotifyEmbed'
import Sparkles from '../components/ui/Sparkles'
import HobbyList from '../components/ui/HobbyList'
import Reveal from '../components/ui/Reveal'
import siteConfig from '../data/siteConfig'
import {
  profissional,
  filosofia,
  alemDaNutricao,
  heroSobre,
  fechamento,
} from '../data/about'
import fotoSarahHero from '../assets/sarah/sarah-consultorio-alt.jpg'
import fotoSarahLaptop from '../assets/sarah/sarah-consultorio-laptop.jpg'
import './Sobre.css'

const CAMPOS_PROFISSIONAIS = [
  { label: 'História', valor: profissional.historia },
  { label: 'Formação', valor: profissional.formacaoPlaceholder },
  { label: 'Registro profissional', valor: profissional.crn },
  { label: 'Especializações', valor: profissional.especializacoes },
  { label: 'Abordagem', valor: profissional.abordagem },
]

function Sobre() {
  return (
    <>
      <PageMeta
        title="Sobre"
        description="Conheça a Sarah Vitória — a pessoa e a profissional por trás do acompanhamento nutricional."
      />
      <Hero
        variant="split"
        signature
        eyebrow="Sobre"
        title={
          <>
            {heroSobre.aberturaLinha1}
            <br />
            <em>{heroSobre.aberturaLinha2}</em>
          </>
        }
        text="Uma nutricionista — mas também tudo o que veio antes e continua junto: fé, família, curiosidade e uma vida cheia de pequenos afetos."
        imageLabel="Fotografia autoral — Sarah Vitória"
        imageRatio="4 / 5"
        imageSrc={fotoSarahHero}
        imageAlt="Sarah Vitória em seu consultório"
      />

      {/* SARAH VITÓRIA — PROFISSIONAL */}
      <section className="section sobre-profissional">
        <div className="container sobre-profissional__layout">
          <Reveal as="div" className="sobre-profissional__foto">
            <img src={fotoSarahLaptop} alt="Sarah Vitória trabalhando em seu consultório" />
          </Reveal>
          <div className="sobre-profissional__conteudo">
            <SectionTitle eyebrow="Sarah Vitória" title="A profissional" />
            <div className="sobre-profissional__grid">
              {CAMPOS_PROFISSIONAIS.map((campo, index) => {
                const isLista = Array.isArray(campo.valor)
                const isPlaceholder = !isLista && campo.valor.trim().startsWith('[')
                return (
                  <Reveal as="div" className="sobre-profissional__item" key={campo.label} delay={index * 60}>
                    <p className="eyebrow sobre-profissional__label">{campo.label}</p>
                    {isLista ? (
                      <ul className="sobre-profissional__lista">
                        {campo.valor.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        className={
                          'sobre-profissional__valor' + (isPlaceholder ? ' is-placeholder' : '')
                        }
                      >
                        {campo.valor}
                      </p>
                    )}
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FILOSOFIA */}
      <section className="sobre-filosofia">
        <div className="container sobre-filosofia__inner">
          <Reveal as="p" className="sobre-filosofia__frase">
            “{filosofia.frase}”
          </Reveal>
          <Reveal as="p" className="sobre-filosofia__texto" delay={100}>
            {filosofia.texto}
          </Reveal>
        </div>
      </section>

      {/* SARAH ALÉM DA NUTRIÇÃO */}
      <section className="section sobre-alem">
        <Sparkles variant="petal" />
        <div className="container">
          <SectionTitle
            eyebrow="Sarah além da nutrição"
            title="Quem também cuida de quem cuida"
            description={alemDaNutricao.introducao}
          />

          <Reveal as="p" className="sobre-alem__quantidade" delay={80}>
            {alemDaNutricao.quantidadeLabel}
          </Reveal>

          <HobbyList items={alemDaNutricao.itens} />
        </div>
      </section>

      {/* PLAYLIST */}
      <section className="section section--tight sobre-playlist">
        <div className="container container--narrow">
          <SectionTitle
            eyebrow="Playlist"
            title="O que toca por aqui"
            description="Uma seleção que acompanha o dia a dia — tão parte da rotina quanto o café da manhã."
            align="center"
          />
          <Reveal delay={80}>
            <SpotifyEmbed playlistEmbedUrl={siteConfig.spotify.playlistEmbedUrl} />
          </Reveal>
        </div>
      </section>

      {/* FECHAMENTO */}
      <section className="sobre-fechamento">
        <div className="container">
          <Reveal as="p" className="sobre-fechamento__texto">
            {fechamento.texto}
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Conheça meu acompanhamento"
        description="Da pessoa por trás da profissional para o cuidado que você vai receber."
        ctaLabel="Conheça meu acompanhamento"
        ctaTo="/acompanhamento"
        variant="dark"
      />
    </>
  )
}

export default Sobre
