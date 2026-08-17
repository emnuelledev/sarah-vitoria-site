import { useState } from 'react'
import useAsync from '../../lib/useAsync'
import { fetchAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../lib/admin'

const FORM_VAZIO = { id: '', nome: '', estrelas: '5', texto: '', publicado: true, ordem: '0' }

function Depoimentos() {
  const [reloadKey, setReloadKey] = useState(0)
  const { data: testimonials, loading, error } = useAsync(fetchAllTestimonials, [reloadKey])
  const recarregar = () => setReloadKey((key) => key + 1)

  const [form, setForm] = useState(FORM_VAZIO)
  const [editandoId, setEditandoId] = useState(null)
  const [salvando, setSalvando] = useState(false)
  const [erroForm, setErroForm] = useState(null)

  const iniciarEdicao = (item) => {
    setEditandoId(item.id)
    setForm({
      id: item.id,
      nome: item.nome,
      estrelas: String(item.estrelas),
      texto: item.texto,
      publicado: item.publicado,
      ordem: String(item.ordem ?? 0),
    })
  }

  const cancelarEdicao = () => {
    setEditandoId(null)
    setForm(FORM_VAZIO)
    setErroForm(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSalvando(true)
    setErroForm(null)

    const payload = {
      nome: form.nome,
      estrelas: Number(form.estrelas),
      texto: form.texto,
      publicado: form.publicado,
      ordem: Number(form.ordem) || 0,
    }

    try {
      if (editandoId) {
        await updateTestimonial(editandoId, payload)
      } else {
        if (!form.id.trim()) throw new Error('id obrigatório')
        await createTestimonial({ id: form.id.trim(), ...payload })
      }
      cancelarEdicao()
      recarregar()
    } catch (err) {
      console.error(err)
      setErroForm(
        !editandoId && !form.id.trim()
          ? 'Preencha o identificador do depoimento.'
          : 'Não deu para salvar — confira se o identificador já não está em uso.'
      )
    } finally {
      setSalvando(false)
    }
  }

  const handleExcluir = async (id) => {
    if (!window.confirm('Excluir este depoimento?')) return
    try {
      await deleteTestimonial(id)
      if (editandoId === id) cancelarEdicao()
      recarregar()
    } catch (err) {
      console.error(err)
      window.alert('Não deu para excluir agora.')
    }
  }

  return (
    <div>
      <h1>Depoimentos</h1>
      <p className="admin-subtitulo">Exibidos na página Acompanhamento.</p>

      {loading && <p className="admin-empty">Carregando…</p>}
      {error && <p className="admin-erro">Não deu para carregar os depoimentos agora.</p>}

      {!loading && !error && (
        <div className="admin-table-wrap">
          {(testimonials ?? []).length === 0 ? (
            <p className="admin-empty">Nenhum depoimento cadastrado ainda.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ordem</th>
                  <th>Nome</th>
                  <th>Estrelas</th>
                  <th>Publicado</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((item) => (
                  <tr key={item.id}>
                    <td>{item.ordem}</td>
                    <td>{item.nome}</td>
                    <td>{item.estrelas}</td>
                    <td>{item.publicado ? 'Sim' : 'Não'}</td>
                    <td className="admin-table__acoes">
                      <button type="button" className="admin-btn" onClick={() => iniciarEdicao(item)}>
                        Editar
                      </button>
                      <button
                        type="button"
                        className="admin-btn admin-btn--perigo"
                        onClick={() => handleExcluir(item.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <div className="admin-card" style={{ marginTop: '1.5rem' }}>
        <h2>{editandoId ? `Editar: ${editandoId}` : 'Novo depoimento'}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form__row">
            <label className="admin-field">
              <span>Identificador</span>
              <input
                type="text"
                placeholder="ex.: google-nome-sobrenome"
                required
                disabled={Boolean(editandoId)}
                value={form.id}
                onChange={(event) => setForm({ ...form, id: event.target.value })}
              />
            </label>
            <label className="admin-field">
              <span>Nome</span>
              <input
                type="text"
                required
                value={form.nome}
                onChange={(event) => setForm({ ...form, nome: event.target.value })}
              />
            </label>
            <label className="admin-field">
              <span>Estrelas</span>
              <select
                value={form.estrelas}
                onChange={(event) => setForm({ ...form, estrelas: event.target.value })}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span>Ordem</span>
              <input
                type="number"
                value={form.ordem}
                onChange={(event) => setForm({ ...form, ordem: event.target.value })}
              />
            </label>
          </div>

          <label className="admin-field">
            <span>Texto</span>
            <textarea
              rows={3}
              required
              value={form.texto}
              onChange={(event) => setForm({ ...form, texto: event.target.value })}
            />
          </label>

          <label className="admin-field admin-field--checkbox">
            <input
              type="checkbox"
              checked={form.publicado}
              onChange={(event) => setForm({ ...form, publicado: event.target.checked })}
            />
            <span>Publicado no site</span>
          </label>

          {erroForm && <p className="admin-erro">{erroForm}</p>}

          <div className="admin-form__row">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={salvando}>
              {salvando ? 'Salvando…' : editandoId ? 'Salvar alterações' : 'Criar depoimento'}
            </button>
            {editandoId && (
              <button type="button" className="admin-btn" onClick={cancelarEdicao}>
                Cancelar edição
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Depoimentos
