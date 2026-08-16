import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import './CTASection.css'

/**
 * CTASection — bloco de encerramento com forte presença da cor da marca.
 * variant: 'lilas' (fundo lilás, texto roxo profundo) | 'dark' (fundo roxo profundo)
 */
function CTASection({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaTo = '/agendamento',
  variant = 'lilas',
}) {
  return (
    <section className={`cta-section cta-section--${variant}`}>
      <div className="container cta-section__inner">
        <Reveal>
          {eyebrow && <p className="eyebrow cta-section__eyebrow">{eyebrow}</p>}
          <h2 className="cta-section__title">{title}</h2>
          {description && <p className="cta-section__description">{description}</p>}
          <Link
            to={ctaTo}
            className={`btn ${variant === 'dark' ? 'btn-on-dark' : 'btn-primary'} cta-section__btn`}
          >
            {ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

export default CTASection
