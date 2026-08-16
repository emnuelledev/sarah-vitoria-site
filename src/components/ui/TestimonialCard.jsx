import Reveal from './Reveal'
import './TestimonialCard.css'

function StarIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}>
      <path
        d="M12 3.8l2.55 5.17 5.7.83-4.13 4.02.97 5.68L12 16.68l-5.1 2.82.98-5.68L3.75 9.8l5.7-.83L12 3.8z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarRating({ estrelas = 5 }) {
  return (
    <div className="testimonial-card__estrelas" aria-label={`${estrelas} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} filled={index < estrelas} />
      ))}
    </div>
  )
}

/**
 * TestimonialCard — avaliação real de paciente (Google) ou, enquanto não
 * houver avaliações reais disponíveis, um placeholder claramente
 * identificado (colchetes + estilo itálico/esmaecido) — nunca uma fala
 * inventada.
 */
function TestimonialCard({ testimonial, delay = 0 }) {
  const { nome, estrelas, texto } = testimonial
  const isPlaceholder = nome.trim().startsWith('[')

  return (
    <Reveal
      as="article"
      className={'testimonial-card' + (isPlaceholder ? ' is-placeholder' : '')}
      delay={delay}
    >
      {!isPlaceholder && <StarRating estrelas={estrelas} />}
      <span className="testimonial-card__aspas" aria-hidden="true">
        “
      </span>
      <p className="testimonial-card__texto">{texto}</p>
      <div className="testimonial-card__rodape">
        <p className="testimonial-card__nome">{nome}</p>
        {!isPlaceholder && <p className="testimonial-card__fonte">Avaliação no Google</p>}
      </div>
    </Reveal>
  )
}

export default TestimonialCard
