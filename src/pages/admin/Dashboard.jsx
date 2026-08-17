import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import useAsync from '../../lib/useAsync'
import { fetchAppointments } from '../../lib/admin'

function Dashboard() {
  const { data: appointments, loading } = useAsync(fetchAppointments, [])

  const stats = useMemo(() => {
    const list = appointments ?? []
    return {
      pendentes: list.filter((item) => item.status === 'pending').length,
      confirmados: list.filter((item) => item.status === 'confirmed').length,
      total: list.length,
    }
  }, [appointments])

  return (
    <div>
      <h1>Painel</h1>
      <p className="admin-subtitulo">Visão geral dos agendamentos recebidos pelo site.</p>

      {!loading && (
        <div className="admin-card-grid">
          <div className="admin-stat">
            <strong>{stats.pendentes}</strong>
            <span>Pedidos pendentes</span>
          </div>
          <div className="admin-stat">
            <strong>{stats.confirmados}</strong>
            <span>Confirmados</span>
          </div>
          <div className="admin-stat">
            <strong>{stats.total}</strong>
            <span>Total no histórico</span>
          </div>
        </div>
      )}

      <div className="admin-card">
        <h2>Atalhos</h2>
        <p>
          <Link to="/admin/agendamentos">Ver e confirmar agendamentos →</Link>
        </p>
        <p>
          <Link to="/admin/disponibilidade">Configurar horários disponíveis →</Link>
        </p>
        <p>
          <Link to="/admin/conteudos">Editar conteúdos do site →</Link>
        </p>
        <p>
          <Link to="/admin/depoimentos">Editar depoimentos →</Link>
        </p>
        <p>
          <Link to="/admin/faq">Editar perguntas frequentes →</Link>
        </p>
      </div>
    </div>
  )
}

export default Dashboard
