import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoMark from '../../assets/logo/logo-mark-offwhite.png'
import auraMark from '../../assets/aura/aura-mark-light.png'
import siteConfig from '../../data/siteConfig'
import AuraModal from './AuraModal'
import './Footer.css'

function Footer() {
  const { brand, contato, localizacao, footer } = siteConfig
  const year = new Date().getFullYear()
  const [auraModalAberto, setAuraModalAberto] = useState(false)

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={logoMark} alt={`${brand.name} — ${brand.role}`} className="footer__logo" />
          <p className="footer__role">
            {brand.role} &middot; {brand.crn}
          </p>
        </div>

        <div className="footer__col">
          <p className="eyebrow footer__label">Contato</p>
          <ul>
            <li>
              {contato.whatsapp.url ? (
                <a href={contato.whatsapp.url} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              ) : (
                <span className="footer__placeholder">WhatsApp — em breve</span>
              )}
            </li>
            <li>
              {contato.email ? (
                <a href={`mailto:${contato.email}`}>{contato.email}</a>
              ) : (
                <span className="footer__placeholder">E-mail — em breve</span>
              )}
            </li>
            <li>
              <a href={contato.instagram.url} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <p className="eyebrow footer__label">Consultório</p>
          <p className={'footer__address' + (localizacao.definida ? ' is-confirmed' : '')}>
            {localizacao.endereco}
          </p>
        </div>

        <div className="footer__col">
          <p className="eyebrow footer__label">Institucional</p>
          <ul>
            {footer.legal.map((item) => (
              <li key={item.href}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          &copy; {year} {brand.name}. Todos os direitos reservados.
        </p>
        <button
          type="button"
          className="footer__signature"
          aria-label={footer.creditos}
          aria-haspopup="dialog"
          onClick={() => setAuraModalAberto(true)}
        >
          <span aria-hidden="true">Website crafted by</span>
          <img src={auraMark} alt="" aria-hidden="true" className="footer__signature-mark" />
        </button>
      </div>

      <AuraModal isOpen={auraModalAberto} onClose={() => setAuraModalAberto(false)} aura={footer.aura} />
    </footer>
  )
}

export default Footer
