import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'
import RequireAuth from './components/admin/RequireAuth'
import AdminLayout from './components/admin/AdminLayout'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Acompanhamento from './pages/Acompanhamento'
import Conteudos from './pages/Conteudos'
import Artigo from './pages/Artigo'
import Agendamento from './pages/Agendamento'
import Privacidade from './pages/Privacidade'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminAgendamentos from './pages/admin/Agendamentos'
import AdminDisponibilidade from './pages/admin/Disponibilidade'
import AdminConteudos from './pages/admin/Conteudos'
import AdminDepoimentos from './pages/admin/Depoimentos'
import AdminFaq from './pages/admin/Faq'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/acompanhamento" element={<Acompanhamento />} />
          <Route path="/conteudos" element={<Conteudos />} />
          <Route path="/conteudos/:id" element={<Artigo />} />
          <Route path="/agendamento" element={<Agendamento />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="*" element={<Home />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="agendamentos" element={<AdminAgendamentos />} />
          <Route path="disponibilidade" element={<AdminDisponibilidade />} />
          <Route path="conteudos" element={<AdminConteudos />} />
          <Route path="depoimentos" element={<AdminDepoimentos />} />
          <Route path="faq" element={<AdminFaq />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
