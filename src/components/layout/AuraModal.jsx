import { useEffect } from 'react'
import auraMark from '../../assets/aura/aura-mark-light.png'
import './AuraModal.css'

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4 6.5l8 6.5 8-6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AuraModal({ isOpen, onClose, aura }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="aura-modal__backdrop" onClick={onClose}>
      <div
        className="aura-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="aura-modal-titulo"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="aura-modal__glow" aria-hidden="true" />

        <button type="button" className="aura-modal__fechar" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        <img src={auraMark} alt="Aura Digital" className="aura-modal__mark" />

        <p className="aura-modal__eyebrow">{aura.eyebrow}</p>
        <h2 id="aura-modal-titulo" className="aura-modal__tagline">
          {aura.tagline}
        </h2>
        <p className="aura-modal__texto">{aura.texto}</p>

        <div className="aura-modal__links">
          <a href={`mailto:${aura.email}`} className="aura-modal__cta">
            Send email <MailIcon />
          </a>
          {aura.url && (
            <a href={aura.url} target="_blank" rel="noreferrer" className="aura-modal__link">
              Site
            </a>
          )}
          {aura.instagram && (
            <a href={aura.instagram} target="_blank" rel="noreferrer" className="aura-modal__link">
              Instagram
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuraModal
