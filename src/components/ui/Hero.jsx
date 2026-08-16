import { Link } from 'react-router-dom'
import ImagePlaceholder from './ImagePlaceholder'
import Reveal from './Reveal'
import assinatura from '../../assets/logo/logo-mark-lilasescuro.png'
import './Hero.css'

/**
 * Hero — cabeçalho editorial reutilizável.
 * variant="split": imagem + texto lado a lado (Home, Sobre)
 * variant="simple": hero centrado, mais enxuto (Acompanhamento, Conteúdos, Agendamento)
 * signature: exibe a assinatura/marca da Sarah (versão lilás escuro) acima do título,
 * usada quando faz sentido reforçar a identidade dentro da composição do hero.
 */
function Hero({
  variant = 'simple',
  eyebrow,
  title,
  text,
  primaryCta,
  secondaryCta,
  imageLabel = 'Fotografia principal',
  imageRatio = '4 / 5',
  imageSrc,
  imageAlt,
  align = 'left',
  signature = false,
}) {
  if (variant === 'split') {
    return (
      <section className="hero hero--split">
        <div className="container hero--split__grid">
          <Reveal as="div" className="hero--split__text">
            {signature && (
              <img
                src={assinatura}
                alt=""
                aria-hidden="true"
                className="hero__signature"
              />
            )}
            {eyebrow && <p className="eyebrow hero__eyebrow">{eyebrow}</p>}
            <h1 className="hero__title">{title}</h1>
            {text && <p className="hero__text">{text}</p>}
            {(primaryCta || secondaryCta) && (
              <div className="hero__ctas">
                {primaryCta && (
                  <Link to={primaryCta.to} className="btn btn-primary">
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link to={secondaryCta.to} className="btn-ghost">
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </Reveal>
          <Reveal as="div" className="hero--split__image" delay={140}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageAlt || ''}
                className="hero__foto"
                style={{ aspectRatio: imageRatio }}
              />
            ) : (
              <ImagePlaceholder label={imageLabel} ratio={imageRatio} />
            )}
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section className={`hero hero--simple hero--${align}`}>
      <div className="container hero--simple__inner">
        <Reveal>
          {eyebrow && <p className="eyebrow hero__eyebrow">{eyebrow}</p>}
          <h1 className="hero__title hero__title--simple">{title}</h1>
          {text && <p className="hero__text">{text}</p>}
          {(primaryCta || secondaryCta) && (
            <div className="hero__ctas">
              {primaryCta && (
                <Link to={primaryCta.to} className="btn btn-primary">
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link to={secondaryCta.to} className="btn-ghost">
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}

export default Hero
