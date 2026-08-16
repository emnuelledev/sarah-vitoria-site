import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import logoMark from '../../assets/logo/logo-mark-dark.png'
import siteConfig from '../../data/siteConfig'
import './Header.css'

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Acompanhamento', to: '/acompanhamento' },
  { label: 'Conteúdos', to: '/conteudos' },
  { label: 'Agendamento', to: '/agendamento' },
]

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header className="header">
      <div className="header__bar container">
        <NavLink to="/" className="header__logo" aria-label={`${siteConfig.brand.name} — página inicial`}>
          <img src={logoMark} alt={`${siteConfig.brand.name} — ${siteConfig.brand.role}`} />
        </NavLink>

        <nav className="header__nav" aria-label="Navegação principal">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    'header__link' + (isActive ? ' is-active' : '')
                  }
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <NavLink to="/agendamento" className="btn btn-primary header__cta">
          Agendar consulta
        </NavLink>

        <button
          type="button"
          className={'header__toggle' + (isOpen ? ' is-open' : '')}
          aria-expanded={isOpen}
          aria-controls="menu-mobile"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="menu-mobile"
        className={'header__mobile-menu' + (isOpen ? ' is-open' : '')}
        aria-hidden={!isOpen}
      >
        <nav aria-label="Navegação principal (mobile)">
          <ul>
            {NAV_ITEMS.map((item, index) => (
              <li key={item.to} style={{ transitionDelay: `${index * 45}ms` }}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    'header__mobile-link' + (isActive ? ' is-active' : '')
                  }
                  end={item.to === '/'}
                  tabIndex={isOpen ? 0 : -1}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <NavLink
          to="/agendamento"
          className="btn btn-primary header__mobile-cta"
          tabIndex={isOpen ? 0 : -1}
        >
          Agendar consulta
        </NavLink>
      </div>
    </header>
  )
}

export default Header
