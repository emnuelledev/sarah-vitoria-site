import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import PageMeta from '../../components/ui/PageMeta'
import '../../components/admin/admin.css'

function Login() {
  const { session, signIn } = useAuth()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)

  if (session) {
    const destino = location.state?.from?.pathname ?? '/admin'
    return <Navigate to={destino} replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setEnviando(true)
    setErro(null)

    const { error } = await signIn(email, senha)

    setEnviando(false)
    if (error) setErro('E-mail ou senha incorretos.')
  }

  return (
    <>
      <PageMeta title="Admin" description="Área restrita do site da Sarah Vitória." />
      <div className="admin-login">
        <form className="admin-login__form" onSubmit={handleSubmit}>
          <h1>Painel administrativo</h1>
          <label className="admin-field">
            <span>E-mail</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Senha</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
            />
          </label>
          {erro && <p className="admin-erro">{erro}</p>}
          <button type="submit" className="admin-btn admin-btn--primary" disabled={enviando}>
            {enviando ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
