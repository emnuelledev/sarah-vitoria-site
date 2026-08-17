import { useState } from 'react'
import useAsync from '../../lib/useAsync'
import { fetchAllContents, createContent, updateContent, deleteContent } from '../../lib/admin'
import { categories } from '../../data/contents'

const CATEGORIAS_EDITAVEIS = categories.filter((categoria) => categoria !== 'Todos')

const FORM_VAZIO = {
  id: '',
  categoria: CATEGORIAS_EDITAVEIS[0] ?? '',
  titulo: '',
  descricao: '',
  corpo: '',
  imagem_url: '',
  url: '',
  publicado: true,
  ordem: '0',
}

function Conteudos() {
  const [reloadKey, setReloadKey] = useState(0)
  const { data: contents, loading, error } = useAsync(fetchAllContents, [reloadKey])
  const recarregar = () => setReloadKey((key) => key + 1)

  const [form, setForm] = useState(FORM_VAZIO)
  const [editandoId, setEditandoId] = useState(null)
  const [salvando, setSalvando] = useState(false)
  const [erroForm, setErroForm] = useState(null)

  const iniciarEdicao = (item) => {
    setEditandoId(item.id)
    setForm({
      id: item.id,
      categoria: item.categoria,
      titulo: item.titulo,
      descricao: item.descricao,
      corpo: item.corpo ?? '',
      imagem_url: item.imagem_url ?? '',
      url: item.url ?? '',
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
      categoria: form.categoria,
      titulo: form.titulo,
      descricao: form.descricao,
      corpo: form.corpo,
      imagem_url: form.imagem_url || null,
      url: form.url || null,
      publicado: form.publicado,
      ordem: Number(form.ordem) || 0,
    }

    try {
      if (editandoId) {
        await updateContent(editandoId, payload)
      } else {
        if (!form.id.trim()) throw new Error('id obrigatório')
        await createContent({ id: form.id.trim(), ...payload })
      }
      cancelarEdicao()
      recarregar()
    } catch (err) {
      console.error(err)
      setErroForm(
        !editandoId && !form.id.trim()
          ? 'Preencha o identificador (usado na URL do artigo).'
          : 'Não deu para salvar — confira se o identificador já não está em uso.'
      )
    } finally {
      setSalvando(false)
    }
  }

  const handleExcluir = async (id) => {
    if (!window.confirm('Excluir este conteúdo?')) return
    try {
      await deleteContent(id)
      if (editandoId === id) cancelarEdicao()
      recarregar()
    } catch (err) {
      console.error(err)
      window.alert('Não deu para excluir agora.')
    }
  }

  return (
    <div>
      <h1>Conteúdos</h1>
      <p className="admin-subtitulo">
        Artigos exibidos na Home e em /conteudos. Desmarcar "Publicado" tira o artigo do site sem apagar o
        texto.
      </p>

      {loading && <p className="admin-empty">Carregando…</p>}
      {error && <p className="admin-erro">Não deu para carregar os conteúdos agora.</p>}

      {!loading && !error && (
        <div className="admin-table-wrap">
          {(contents ?? []).length === 0 ? (
            <p className="admin-empty">Nenhum conteúdo cadastrado ainda.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Ordem</th>
                  <th>Categoria</th>
                  <th>Título</th>
                  <th>Publicado</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((item) => (
                  <tr key={item.id}>
                    <td>{item.ordem}</td>
                    <td>{item.categoria}</td>
                    <td>{item.titulo}</td>
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
        <h2>{editandoId ? `Editar: ${editandoId}` : 'Novo conteúdo'}</h2>
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form__row">
            <label className="admin-field">
              <span>Identificador (URL)</span>
              <input
                type="text"
                placeholder="ex.: meu-novo-artigo"
                required
                disabled={Boolean(editandoId)}
                value={form.id}
                onChange={(event) => setForm({ ...form, id: event.target.value })}
              />
            </label>
            <label className="admin-field">
              <span>Categoria</span>
              <select
                value={form.categoria}
                onChange={(event) => setForm({ ...form, categoria: event.target.value })}
              >
                {CATEGORIAS_EDITAVEIS.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
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
            <span>Título</span>
            <input
              type="text"
              required
              value={form.titulo}
              onChange={(event) => setForm({ ...form, titulo: event.target.value })}
            />
          </label>

          <label className="admin-field">
            <span>Descrição curta (card)</span>
            <textarea
              rows={2}
              required
              value={form.descricao}
              onChange={(event) => setForm({ ...form, descricao: event.target.value })}
            />
          </label>

          <label className="admin-field">
            <span>Texto completo do artigo</span>
            <textarea
              rows={6}
              value={form.corpo}
              onChange={(event) => setForm({ ...form, corpo: event.target.value })}
            />
          </label>

          <div className="admin-form__row">
            <label className="admin-field">
              <span>URL da imagem (opcional)</span>
              <input
                type="text"
                value={form.imagem_url}
                onChange={(event) => setForm({ ...form, imagem_url: event.target.value })}
              />
            </label>
            <label className="admin-field">
              <span>Link externo (opcional, ex.: Instagram)</span>
              <input
                type="text"
                value={form.url}
                onChange={(event) => setForm({ ...form, url: event.target.value })}
              />
            </label>
          </div>

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
              {salvando ? 'Salvando…' : editandoId ? 'Salvar alterações' : 'Criar conteúdo'}
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

export default Conteudos
