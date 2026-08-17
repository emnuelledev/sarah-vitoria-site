import { useState } from 'react'
import useAsync from '../../lib/useAsync'
import { fetchAppointments, updateAppointmentStatus } from '../../lib/admin'

const STATUS_LABEL = { pending: 'Pendente', confirmed: 'Confirmado', cancelled: 'Cancelado' }

function formatarDataBr(iso) {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

function Agendamentos() {
  const [reloadKey, setReloadKey] = useState(0)
  const { data: appointments, loading, error } = useAsync(fetchAppointments, [reloadKey])
  const [atualizandoId, setAtualizandoId] = useState(null)

  const handleStatus = async (id, status) => {
    setAtualizandoId(id)
    try {
      await updateAppointmentStatus(id, status)
      setReloadKey((key) => key + 1)
    } catch (err) {
      console.error(err)
      window.alert('Não deu para atualizar o status agora. Tente de novo.')
    } finally {
      setAtualizandoId(null)
    }
  }

  return (
    <div>
      <h1>Agendamentos</h1>
      <p className="admin-subtitulo">
        Pedidos enviados pelo formulário do site. Confirmar libera a Sarah para combinar o horário — o
        horário fica reservado (ninguém mais consegue escolhê-lo) assim que o pedido é criado, mesmo antes
        da confirmação.
      </p>

      {loading && <p className="admin-empty">Carregando…</p>}
      {error && <p className="admin-erro">Não deu para carregar os agendamentos agora.</p>}

      {!loading && !error && (
        <div className="admin-table-wrap">
          {(appointments ?? []).length === 0 ? (
            <p className="admin-empty">Nenhum agendamento ainda.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Nome</th>
                  <th>Contato</th>
                  <th>Modalidade</th>
                  <th>Mensagem</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item) => (
                  <tr key={item.id}>
                    <td>{formatarDataBr(item.data)}</td>
                    <td>{item.horario.slice(0, 5)}</td>
                    <td>{item.nome}</td>
                    <td>{item.contato}</td>
                    <td>{item.modalidade}</td>
                    <td>{item.mensagem || '—'}</td>
                    <td>
                      <span className={`admin-badge admin-badge--${item.status}`}>
                        {STATUS_LABEL[item.status]}
                      </span>
                    </td>
                    <td className="admin-table__acoes">
                      <button
                        type="button"
                        className="admin-btn admin-btn--primary"
                        disabled={item.status === 'confirmed' || atualizandoId === item.id}
                        onClick={() => handleStatus(item.id, 'confirmed')}
                      >
                        Confirmar
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--perigo"
                        disabled={item.status === 'cancelled' || atualizandoId === item.id}
                        onClick={() => handleStatus(item.id, 'cancelled')}
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

export default Agendamentos
