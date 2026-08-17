import PageMeta from '../components/ui/PageMeta'
import Hero from '../components/ui/Hero'
import SectionTitle from '../components/ui/SectionTitle'
import MapSection from '../components/ui/MapSection'
import SchedulingForm from '../components/ui/SchedulingForm'
import Sparkles from '../components/ui/Sparkles'
import Reveal from '../components/ui/Reveal'
import { WhatsAppIcon, MailIcon, InstagramIcon } from '../components/ui/ContactIcons'
import siteConfig from '../data/siteConfig'
import './Agendamento.css'

function Agendamento() {
  const { modalidades, agendamento, contato } = siteConfig

  return (
    <>
      <PageMeta
        title="Agendamento"
        description="Agende sua consulta com a nutricionista Sarah Vitória — atendimento presencial ou online."
      />
      <Hero
        variant="simple"
        align="center"
        eyebrow="Agendamento"
        title="Agende sua consulta"
        text="Escolha a modalidade que faz mais sentido para você. Em instantes você recebe a confirmação e os próximos passos."
      />

      {/* MODALIDADES */}
      <section className="section section--tight modalidades">
        <div className="container">
          <SectionTitle eyebrow="Modalidades" title="Como você prefere ser atendida" />
          <div className="modalidades__grid">
            {modalidades.map((modalidade, index) => (
              <Reveal as="div" className="modalidades__item" key={modalidade.id} delay={index * 80}>
                <span className="modalidades__numero">{String(index + 1).padStart(2, '0')}</span>
                <h3>{modalidade.titulo}</h3>
                <p>{modalidade.descricao}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AGENDAMENTO PRINCIPAL */}
      <section className="agendamento-cta">
        <Sparkles variant="butterfly" />
        <div className="container agendamento-cta__inner">
          <Reveal>
            <p className="eyebrow agendamento-cta__eyebrow">Marcar consulta</p>
            <h2 className="agendamento-cta__titulo">Escolha o melhor horário para você</h2>

            {agendamento.url ? (
              <a href={agendamento.url} target="_blank" rel="noreferrer" className="btn btn-on-dark">
                Ver horários disponíveis
              </a>
            ) : (
              <>
                <p className="agendamento-cta__texto">
                  Escolha um horário realmente disponível na agenda da Sarah e envie seu pedido — ela
                  confirma pelo contato que você informar.
                </p>
                <SchedulingForm whatsappBaseUrl={contato.whatsapp.baseUrl} email={contato.email} />
              </>
            )}
          </Reveal>
        </div>
      </section>

      {/* CONTATO */}
      <section className="section section--tight contato">
        <div className="container">
          <SectionTitle eyebrow="Contato" title="Prefere falar antes de agendar?" />
          <div className="contato__chips">
            {contato.whatsapp.url ? (
              <Reveal as="a" className="contato__chip" href={contato.whatsapp.url} target="_blank" rel="noreferrer">
                <span className="contato__chip-icon">
                  <WhatsAppIcon />
                </span>
                {contato.whatsapp.numero}
              </Reveal>
            ) : (
              <Reveal as="p" className="contato__chip contato__chip--placeholder">
                <span className="contato__chip-icon">
                  <WhatsAppIcon />
                </span>
                Número em breve
              </Reveal>
            )}

            {contato.email ? (
              <Reveal as="a" className="contato__chip" delay={70} href={`mailto:${contato.email}`}>
                <span className="contato__chip-icon">
                  <MailIcon />
                </span>
                {contato.email}
              </Reveal>
            ) : (
              <Reveal as="p" className="contato__chip contato__chip--placeholder" delay={70}>
                <span className="contato__chip-icon">
                  <MailIcon />
                </span>
                E-mail em breve
              </Reveal>
            )}

            <Reveal
              as="a"
              className="contato__chip"
              delay={140}
              href={contato.instagram.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="contato__chip-icon">
                <InstagramIcon />
              </span>
              {contato.instagram.handle}
            </Reveal>
          </div>
        </div>
      </section>

      <MapSection localizacao={siteConfig.localizacao} />
    </>
  )
}

export default Agendamento
