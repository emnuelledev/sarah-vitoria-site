import { useState } from 'react'
import useAsync from '../../lib/useAsync'
import { fetchAllFaq, createFaqEntry, updateFaqEntry, deleteFaqEntry } from '../../lib/admin'

const FORM_VAZIO = {
  pergunta: '',
  resposta: '',
  download_label: '',
  download_href: '',
  ordem: '0',
}

function Faq() {
  const [reloadKey, setReloadKey] = useState(0)
  const { data: faq, loading, error } = useAsync(fetchAllFaq, [reloadKey])
  const recarregar = () => setReloadKey((key) => key + 1)

  const [form, setForm] = useState(FORM_VAZIO)
  const [editandoId, setEditandoId] = useState(null)
  const [salvando, setSalvando] = useState(false)
  const [erroForm, setErroForm] = useState(null)

  const iniciarEdicao = (item) => {
    setEditandoId(item.id)
    setForm({
      pergunta: item.pergunta,
      resposta: item.resposta,
      download_label: item.download_label ?? '',
      download_href: item.download_href ?? '',
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
      pergunta: form.pergunta,
      resposta: form.resposta,
      download_label: form.download_label || null,
      download_href: form.download_href || null,
      ordem: Number(form.ordem) || 0,
    }

    try {
      if (editandoId) {
        await updateFaqEntry(editandoId, payload)
      } else {
        await createFaqEntry(payload)
      }
      cancelarEdicao()
      recarregar()
    } catch (err) {
      console.error(err)
      setErroForm('Não deu para salvar agora. Tente de novo.')
    } finally {
      setSalvando(false)
    }
  }

  const handleExcluir = async (id) => {
    if (!window.confirm('Excluir esta pergunta?')) return
    try {
      await deleteFaqEntry(id)
      if (editandoId === id) cancelarEdicao()
      recarregar()
    } catch (err) {
      console.error(err)
      window.alert('Não deu para excluir agora.')
    }
  }

  return (
    <div>
      <h1>Perguntas frequentes</h1>
      <p className="admin-subtitulo">Exibidas no accordion da página Acompanhamento.</p>

      {loading && <p className="admin-empty">Carregando…</p>}
      {error && <p className="admin-erro">Não deu para carregar o FAQ agora.</p>}

      {!loading && !error && (
        <div className="admin-table-wrap">
          {(faq ?? []).length === 0 ? (
            <p className="admin-empty">Nenhuma pergunta cadastrada ainda.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ordem</th>
                  <th>Pergunta</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {faq.map((item) => (
                  <tr key={item.id}>
                    <td>{item.ordem}</td>
                    <td>{item.pergunta}</td>
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
        <h2>{editandoId ? 'Editar pergunta' : 'Nova pergunta'}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <label className="admin-field">
            <span>Pergunta</span>
            <input
              type="text"
              required
              value={form.pergunta}
              onChange={(event) => setForm({ ...form, pergunta: event.target.value })}
            />
          </label>

          <label className="admin-field">
            <span>Resposta</span>
            <textarea
              rows={5}
              required
              value={form.resposta}
              onChange={(event) => setForm({ ...form, resposta: event.target.value })}
            />
          </label>

          <div className="admin-form__row">
            <label className="admin-field">
              <span>Texto do link de download (opcional)</span>
              <input
                type="text"
                value={form.download_label}
                onChange={(event) => setForm({ ...form, download_label: event.target.value })}
              />
            </label>
            <label className="admin-field">
              <span>URL do arquivo (opcional)</span>
              <input
                type="text"
                placeholder="/downloads/arquivo.pdf"
                value={form.download_href}
                onChange={(event) => setForm({ ...form, download_href: event.target.value })}
              />
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

          {erroForm && <p className="admin-erro">{erroForm}</p>}

          <div className="admin-form__row">
            <button type="submit" className="admin-btn admin-btn--primary" disabled={salvando}>
              {salvando ? 'Salvando…' : editandoId ? 'Salvar alterações' : 'Criar pergunta'}
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

export default Faq
