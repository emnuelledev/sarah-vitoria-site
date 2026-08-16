import { useState } from 'react'
import './SchedulingForm.css'

/**
 * SchedulingForm — formulário de agendamento sem backend (nenhuma API/DB
 * nesta fase): a pessoa preenche os dados e escolhe enviar por WhatsApp
 * (wa.me com mensagem já preenchida) ou por e-mail (mailto) — os dois
 * caminhos que a Sarah pediu, sem depender de um sistema de agendamento
 * externo ainda não definido.
 */
function SchedulingForm({ whatsappBaseUrl, email }) {
  const [nome, setNome] = useState('')
  const [contato, setContato] = useState('')
  const [modalidade, setModalidade] = useState('Presencial')
  const [diaHorario, setDiaHorario] = useState('')
  const [mensagem, setMensagem] = useState('')

  const camposValidos = nome.trim() && contato.trim()

  const montarMensagem = () =>
    [
      `Nome: ${nome}`,
      `Contato para retorno: ${contato}`,
      `Modalidade: ${modalidade}`,
      diaHorario ? `Dia/horário de preferência: ${diaHorario}` : null,
      mensagem ? `Mensagem: ${mensagem}` : null,
    ]
      .filter(Boolean)
      .join('\n')

  const handleWhatsapp = (event) => {
    event.preventDefault()
    if (!camposValidos || !whatsappBaseUrl) return

    const texto = [
      'Olá, Sarah! Vim através do site e gostaria de agendar uma consulta.',
      '',
      montarMensagem(),
    ].join('\n')

    window.open(`${whatsappBaseUrl}?text=${encodeURIComponent(texto)}`, '_blank', 'noreferrer')
  }

  const handleEmail = (event) => {
    event.preventDefault()
    if (!camposValidos || !email) return

    const assunto = `Agendamento pelo site — ${nome}`
    const corpo = [montarMensagem(), '', '— Agendamento solicitado através do site da Sarah Vitória.'].join(
      '\n'
    )

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`
  }

  return (
    <form className="scheduling-form" onSubmit={(event) => event.preventDefault()}>
      <div className="scheduling-form__row">
        <label className="scheduling-form__field">
          <span>Nome</span>
          <input type="text" required value={nome} onChange={(event) => setNome(event.target.value)} />
        </label>
        <label className="scheduling-form__field">
          <span>Seu WhatsApp ou e-mail</span>
          <input
            type="text"
            required
            value={contato}
            onChange={(event) => setContato(event.target.value)}
          />
        </label>
      </div>

      <div className="scheduling-form__row">
        <label className="scheduling-form__field">
          <span>Modalidade</span>
          <select value={modalidade} onChange={(event) => setModalidade(event.target.value)}>
            <option value="Presencial">Presencial</option>
            <option value="Online">Online</option>
          </select>
        </label>
        <label className="scheduling-form__field">
          <span>Dia/horário de preferência</span>
          <input
            type="text"
            placeholder="Ex.: terças à tarde (sujeito à agenda)"
            value={diaHorario}
            onChange={(event) => setDiaHorario(event.target.value)}
          />
        </label>
      </div>

      <label className="scheduling-form__field">
        <span>Mensagem (opcional)</span>
        <textarea rows={3} value={mensagem} onChange={(event) => setMensagem(event.target.value)} />
      </label>

      <div className="scheduling-form__ctas">
        <button
          type="button"
          className="btn btn-on-dark"
          disabled={!camposValidos}
          onClick={handleWhatsapp}
        >
          Enviar por WhatsApp
        </button>
        <button
          type="button"
          className="btn-ghost btn-ghost--on-dark"
          disabled={!camposValidos}
          onClick={handleEmail}
        >
          Enviar por e-mail
        </button>
      </div>
      <p className="scheduling-form__nota">
        Ao enviar, seu WhatsApp ou aplicativo de e-mail abre com os dados já preenchidos — é só
        confirmar o envio. A Sarah confirma a data e o horário com você a partir da sua preferência.
      </p>
    </form>
  )
}

export default SchedulingForm
