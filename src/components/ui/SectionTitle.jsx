import Reveal from './Reveal'
import './SectionTitle.css'

/**
 * SectionTitle — cabeçalho editorial reutilizável para seções.
 * `eyebrow`: rótulo pequeno em caps (ex.: "PREVIEW", "MÉTODO")
 * `title`: pode incluir <em> internamente para dar ênfase editorial.
 */
function SectionTitle({ eyebrow, title, description, align = 'left', size = 'md' }) {
  return (
    <Reveal
      as="div"
      className={`section-title section-title--${align} section-title--${size}`}
    >
      {eyebrow && <p className="eyebrow section-title__eyebrow">{eyebrow}</p>}
      <h2 className="section-title__title">{title}</h2>
      {description && <p className="section-title__description">{description}</p>}
    </Reveal>
  )
}

export default SectionTitle
