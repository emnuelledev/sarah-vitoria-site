import { useState } from 'react'
import useAsync from '../../lib/useAsync'
import {
  fetchAvailabilityRules,
  createAvailabilityRule,
  updateAvailabilityRule,
  deleteAvailabilityRule,
  fetchAvailabilityExceptions,
  createAvailabilityException,
  deleteAvailabilityException,
} from '../../lib/admin'

const DIAS_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

const REGRA_INICIAL = {
  dia_semana: '1',
  hora_inicio: '09:00',
  hora_fim: '18:00',
  duracao_minutos: '60',
  modalidade: 'Presencial',
}

const EXCECAO_INICIAL = {
  data: '',
  tipo: 'bloqueio',
  hora_inicio: '',
  hora_fim: '',
  modalidade: '',
  motivo: '',
}

function formatarDataBr(iso) {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

function Disponibilidade() {
  const [reloadKey, setReloadKey] = useState(0)
  const recarregar = () => setReloadKey((key) => key + 1)

  const { data: rules, loading: carregandoRules } = useAsync(fetchAvailabilityRules, [reloadKey])
  const { data: exceptions, loading: carregandoExceptions } = useAsync(fetchAvailabilityExceptions, [
    reloadKey,
  ])

  const [novaRegra, setNovaRegra] = useState(REGRA_INICIAL)
  const [salvandoRegra, setSalvandoRegra] = useState(false)
  const [erroRegra, setErroRegra] = useState(null)

  const [novaExcecao, setNovaExcecao] = useState(EXCECAO_INICIAL)
  const [salvandoExcecao, setSalvandoExcecao] = useState(false)
  const [erroExcecao, setErroExcecao] = useState(null)

  const handleAdicionarRegra = async (event) => {
    event.preventDefault()
    setSalvandoRegra(true)
    setErroRegra(null)
    try {
      await createAvailabilityRule({
        dia_semana: Number(novaRegra.dia_semana),
        hora_inicio: novaRegra.hora_inicio,
        hora_fim: novaRegra.hora_fim,
        duracao_minutos: Number(novaRegra.duracao_minutos),
        modalidade: novaRegra.modalidade,
        ativo: true,
      })
      setNovaRegra(REGRA_INICIAL)
      recarregar()
    } catch (err) {
      console.error(err)
      setErroRegra('Não deu para salvar a regra. Confira se o horário final é depois do inicial.')
    } finally {
      setSalvandoRegra(false)
    }
  }

  const handleToggleRegra = async (rule) => {
    try {
      await updateAvailabilityRule(rule.id, { ativo: !rule.ativo })
      recarregar()
    } catch (err) {
      console.error(err)
      window.alert('Não deu para atualizar a regra agora.')
    }
  }

  const handleExcluirRegra = async (id) => {
    if (!window.confirm('Excluir esta regra de disponibilidade?')) return
    try {
      await deleteAvailabilityRule(id)
      recarregar()
    } catch (err) {
      console.error(err)
      window.alert('Não deu para excluir a regra agora.')
    }
  }

  const handleAdicionarExcecao = async (event) => {
    event.preventDefault()
    setSalvandoExcecao(true)
    setErroExcecao(null)
    try {
      await createAvailabilityException({
        data: novaExcecao.data,
        tipo: novaExcecao.tipo,
        hora_inicio: novaExcecao.hora_inicio || null,
        hora_fim: novaExcecao.tipo === 'bloqueio' ? novaExcecao.hora_fim || null : null,
        modalidade: novaExcecao.modalidade || null,
        motivo: novaExcecao.motivo || null,
      })
      setNovaExcecao(EXCECAO_INICIAL)
      recarregar()
    } catch (err) {
      console.error(err)
      setErroExcecao('Não deu para salvar. Confira se a data foi preenchida.')
    } finally {
      setSalvandoExcecao(false)
    }
  }

  const handleExcluirExcecao = async (id) => {
    try {
      await deleteAvailabilityException(id)
      recarregar()
    } catch (err) {
      console.error(err)
      window.alert('Não deu para excluir agora.')
    }
  }

  return (
    <div>
      <h1>Disponibilidade</h1>
      <p className="admin-subtitulo">
        As regras semanais definem os horários que aparecem no formulário de agendamento do site. Use
        bloqueios/liberações pontuais para exceções (feriado, dia extra, etc.).
      </p>

      {/* REGRAS SEMANAIS */}
      <div className="admin-card">
        <h2>Regras semanais</h2>

        {carregandoRules && <p className="admin-empty">Carregando…</p>}
        {!carregandoRules && (rules ?? []).length === 0 && (
          <p className="admin-empty">Nenhuma regra cadastrada ainda.</p>
        )}
        {!carregandoRules && (rules ?? []).length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Horário</th>
                  <th>Duração</th>
                  <th>Modalidade</th>
                  <th>Ativa</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule.id}>
                    <td>{DIAS_SEMANA[rule.dia_semana]}</td>
                    <td>
                      {rule.hora_inicio.slice(0, 5)} – {rule.hora_fim.slice(0, 5)}
                    </td>
                    <td>{rule.duracao_minutos} min</td>
                    <td>{rule.modalidade}</td>
                    <td>{rule.ativo ? 'Sim' : 'Não'}</td>
                    <td className="admin-table__acoes">
                      <button type="button" className="admin-btn" onClick={() => handleToggleRegra(rule)}>
                        {rule.ativo ? 'Desativar' : 'Ativar'}
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--perigo"
                        onClick={() => handleExcluirRegra(rule.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <form className="admin-form" onSubmit={handleAdicionarRegra} style={{ marginTop: '1.5rem' }}>
          <h2 style={{ fontSize: '0.95rem' }}>Adicionar regra</h2>
          <div className="admin-form__row">
            <label className="admin-field">
              <span>Dia da semana</span>
              <select
                value={novaRegra.dia_semana}
                onChange={(event) => setNovaRegra({ ...novaRegra, dia_semana: event.target.value })}
              >
                {DIAS_SEMANA.map((dia, index) => (
                  <option key={dia} value={index}>
                    {dia}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span>Modalidade</span>
              <select
                value={novaRegra.modalidade}
                onChange={(event) => setNovaRegra({ ...novaRegra, modalidade: event.target.value })}
              >
                <option value="Presencial">Presencial</option>
                <option value="Online">Online</option>
              </select>
            </label>
          </div>
          <div className="admin-form__row">
            <label className="admin-field">
              <span>Início</span>
              <input
                type="time"
                required
                value={novaRegra.hora_inicio}
                onChange={(event) => setNovaRegra({ ...novaRegra, hora_inicio: event.target.value })}
              />
            </label>
            <label className="admin-field">
              <span>Fim</span>
              <input
                type="time"
                required
                value={novaRegra.hora_fim}
                onChange={(event) => setNovaRegra({ ...novaRegra, hora_fim: event.target.value })}
              />
            </label>
            <label className="admin-field">
              <span>Duração da consulta (min)</span>
              <input
                type="number"
                min="15"
                step="5"
                required
                value={novaRegra.duracao_minutos}
                onChange={(event) => setNovaRegra({ ...novaRegra, duracao_minutos: event.target.value })}
              />
            </label>
          </div>
          {erroRegra && <p className="admin-erro">{erroRegra}</p>}
          <div>
            <button type="submit" className="admin-btn admin-btn--primary" disabled={salvandoRegra}>
              {salvandoRegra ? 'Salvando…' : 'Adicionar regra'}
            </button>
          </div>
        </form>
      </div>

      {/* EXCEÇÕES PONTUAIS */}
      <div className="admin-card">
        <h2>Bloqueios e liberações pontuais</h2>

        {carregandoExceptions && <p className="admin-empty">Carregando…</p>}
        {!carregandoExceptions && (exceptions ?? []).length === 0 && (
          <p className="admin-empty">Nenhuma exceção cadastrada.</p>
        )}
        {!carregandoExceptions && (exceptions ?? []).length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo</th>
                  <th>Horário</th>
                  <th>Modalidade</th>
                  <th>Motivo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {exceptions.map((exception) => (
                  <tr key={exception.id}>
                    <td>{formatarDataBr(exception.data)}</td>
                    <td>{exception.tipo === 'bloqueio' ? 'Bloqueio' : 'Liberação extra'}</td>
                    <td>
                      {exception.hora_inicio
                        ? `${exception.hora_inicio.slice(0, 5)}${
                            exception.hora_fim ? ` – ${exception.hora_fim.slice(0, 5)}` : ''
                          }`
                        : 'Dia inteiro'}
                    </td>
                    <td>{exception.modalidade || 'Todas'}</td>
                    <td>{exception.motivo || '—'}</td>
                    <td className="admin-table__acoes">
                      <button
                        type="button"
                        className="admin-btn admin-btn--perigo"
                        onClick={() => handleExcluirExcecao(exception.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <form className="admin-form" onSubmit={handleAdicionarExcecao} style={{ marginTop: '1.5rem' }}>
          <h2 style={{ fontSize: '0.95rem' }}>Adicionar exceção</h2>
          <div className="admin-form__row">
            <label className="admin-field">
              <span>Data</span>
              <input
                type="date"
                required
                value={novaExcecao.data}
                onChange={(event) => setNovaExcecao({ ...novaExcecao, data: event.target.value })}
              />
            </label>
            <label className="admin-field">
              <span>Tipo</span>
              <select
                value={novaExcecao.tipo}
                onChange={(event) => setNovaExcecao({ ...novaExcecao, tipo: event.target.value })}
              >
                <option value="bloqueio">Bloqueio (indisponível)</option>
                <option value="liberacao">Liberação (horário extra)</option>
              </select>
            </label>
            <label className="admin-field">
              <span>Modalidade (opcional)</span>
              <select
                value={novaExcecao.modalidade}
                onChange={(event) => setNovaExcecao({ ...novaExcecao, modalidade: event.target.value })}
              >
                <option value="">Todas</option>
                <option value="Presencial">Presencial</option>
                <option value="Online">Online</option>
              </select>
            </label>
          </div>

          {novaExcecao.tipo === 'bloqueio' ? (
            <div className="admin-form__row">
              <label className="admin-field">
                <span>Início (vazio = dia inteiro)</span>
                <input
                  type="time"
                  value={novaExcecao.hora_inicio}
                  onChange={(event) => setNovaExcecao({ ...novaExcecao, hora_inicio: event.target.value })}
                />
              </label>
              <label className="admin-field">
                <span>Fim</span>
                <input
                  type="time"
                  value={novaExcecao.hora_fim}
                  onChange={(event) => setNovaExcecao({ ...novaExcecao, hora_fim: event.target.value })}
                />
              </label>
            </div>
          ) : (
            <div className="admin-form__row">
              <label className="admin-field">
                <span>Horário</span>
                <input
                  type="time"
                  required
                  value={novaExcecao.hora_inicio}
                  onChange={(event) => setNovaExcecao({ ...novaExcecao, hora_inicio: event.target.value })}
                />
              </label>
            </div>
          )}

          <label className="admin-field">
            <span>Motivo (opcional)</span>
            <input
              type="text"
              value={novaExcecao.motivo}
              onChange={(event) => setNovaExcecao({ ...novaExcecao, motivo: event.target.value })}
            />
          </label>

          {erroExcecao && <p className="admin-erro">{erroExcecao}</p>}
          <div>
            <button type="submit" className="admin-btn admin-btn--primary" disabled={salvandoExcecao}>
              {salvandoExcecao ? 'Salvando…' : 'Adicionar exceção'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Disponibilidade
