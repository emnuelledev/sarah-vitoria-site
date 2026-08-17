import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import './admin.css'

const LINKS = [
  { to: '/admin', label: 'Início', end: true },
  { to: '/admin/agendamentos', label: 'Agendamentos' },
  { to: '/admin/disponibilidade', label: 'Disponibilidade' },
  { to: '/admin/conteudos', label: 'Conteúdos' },
  { to: '/admin/depoimentos', label: 'Depoimentos' },
  { to: '/admin/faq', label: 'FAQ' },
]

function AdminLayout() {
  const { signOut } = useAuth()

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <span className="admin-topbar__brand">Sarah Vitória · Admin</span>
        <nav className="admin-topbar__nav" aria-label="Navegação do painel">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => 'admin-topbar__link' + (isActive ? ' is-active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin-topbar__acoes">
          <Link to="/" className="admin-topbar__voltar">
            Voltar ao site
          </Link>
          <button type="button" className="admin-topbar__sair" onClick={() => signOut()}>
            Sair
          </button>
        </div>
      </header>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
