import SectionTitle from './SectionTitle'
import ImagePlaceholder from './ImagePlaceholder'
import Reveal from './Reveal'
import siteConfig from '../../data/siteConfig'
import './InstagramSection.css'

/**
 * InstagramSection — grade estilo feed (3 colunas, tiles quadrados),
 * preparada para futura integração do feed real via API. Sem token/API
 * disponível ainda: nenhum post é simulado, cada tile é um placeholder
 * visual coerente com a identidade + CTA para seguir o perfil.
 */
function InstagramSection() {
  const { instagram } = siteConfig.contato

  return (
    <section className="section instagram-section">
      <div className="container">
        <SectionTitle
          eyebrow="Instagram"
          title="Acompanhe também pelo Instagram"
          description="É lá que a Sarah conversa com mais frequência sobre alimentação, rotina e relação com a comida."
          align="center"
        />

        <Reveal className="instagram-section__grid" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="instagram-section__tile" key={index}>
              <ImagePlaceholder label="Post" ratio="1 / 1" />
            </div>
          ))}
        </Reveal>

        <Reveal className="instagram-section__cta" delay={90}>
          <a
            href={instagram.url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            Seguir {instagram.handle} no Instagram
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export default InstagramSection
