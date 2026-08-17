import { useEffect, useState } from 'react'
import { fetchAvailableSlots, createAppointment } from '../../lib/availability'
import './SchedulingForm.css'

function formatarDataBr(iso) {
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}

/**
 * SchedulingForm — pede nome/contato, deixa escolher um horário realmente
 * livre (calculado por fetchAvailableSlots a partir da disponibilidade
 * cadastrada no admin) e grava o pedido como 'pending' via createAppointment
 * (que também dispara o e-mail de notificação pra Sarah). WhatsApp/e-mail
 * seguem como canal alternativo, como já era antes do backend.
 */
function SchedulingForm({ whatsappBaseUrl, email }) {
  const [nome, setNome] = useState('')
  const [contato, setContato] = useState('')
  const [modalidade, setModalidade] = useState('Presencial')
  const [mensagem, setMensagem] = useState('')

  const [diasDisponiveis, setDiasDisponiveis] = useState([])
  const [carregandoSlots, setCarregandoSlots] = useState(true)
  const [erroSlots, setErroSlots] = useState(null)
  const [dataEscolhida, setDataEscolhida] = useState(null)
  const [horarioEscolhido, setHorarioEscolhido] = useState(null)

  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState(null)
  const [sucesso, setSucesso] = useState(false)

  useEffect(() => {
    let ativo = true
    setCarregandoSlots(true)
    setErroSlots(null)
    setDataEscolhida(null)
    setHorarioEscolhido(null)

    fetchAvailableSlots({ modalidade })
      .then((dias) => {
        if (!ativo) return
        setDiasDisponiveis(dias)
        setCarregandoSlots(false)
      })
      .catch((error) => {
        if (!ativo) return
        console.error(error)
        setErroSlots('Não deu para carregar os horários disponíveis agora.')
        setCarregandoSlots(false)
      })

    return () => {
      ativo = false
    }
  }, [modalidade])

  const contatoPreenchido = nome.trim() && contato.trim()
  const camposValidos = contatoPreenchido && dataEscolhida && horarioEscolhido

  const montarMensagem = () =>
    [
      `Nome: ${nome}`,
      `Contato para retorno: ${contato}`,
      `Modalidade: ${modalidade}`,
      dataEscolhida && horarioEscolhido
        ? `Dia/horário: ${formatarDataBr(dataEscolhida)} às ${horarioEscolhido}`
        : null,
      mensagem ? `Mensagem: ${mensagem}` : null,
    ]
      .filter(Boolean)
      .join('\n')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!camposValidos) return

    setEnviando(true)
    setErroEnvio(null)

    try {
      await createAppointment({
        nome,
        contato,
        modalidade,
        data: dataEscolhida,
        horario: horarioEscolhido,
        mensagem,
      })
      setSucesso(true)
    } catch (error) {
      console.error(error)
      const horarioJaOcupado = error?.code === '23505'
      setErroEnvio(
        horarioJaOcupado
          ? 'Esse horário acabou de ser reservado por outra pessoa — escolha outro, por favor.'
          : 'Não deu para enviar seu pedido agora. Tente de novo ou fale direto pelo WhatsApp/e-mail abaixo.'
      )
      if (horarioJaOcupado) {
        setDataEscolhida(null)
        setHorarioEscolhido(null)
        fetchAvailableSlots({ modalidade })
          .then(setDiasDisponiveis)
          .catch(() => {})
      }
    } finally {
      setEnviando(false)
    }
  }

  const handleWhatsapp = () => {
    if (!contatoPreenchido || !whatsappBaseUrl) return
    const texto = [
      'Olá, Sarah! Vim através do site e gostaria de agendar uma consulta.',
      '',
      montarMensagem(),
    ].join('\n')
    window.open(`${whatsappBaseUrl}?text=${encodeURIComponent(texto)}`, '_blank', 'noreferrer')
  }

  const handleEmail = () => {
    if (!contatoPreenchido || !email) return
    const assunto = `Agendamento pelo site — ${nome}`
    const corpo = [montarMensagem(), '', '— Agendamento solicitado através do site da Sarah Vitória.'].join(
      '\n'
    )
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`
  }

  if (sucesso) {
    return (
      <div className="scheduling-form scheduling-form__sucesso">
        <p>
          Pedido enviado! A Sarah confirma o horário de {formatarDataBr(dataEscolhida)} às {horarioEscolhido}{' '}
          falando com você pelo contato informado ({contato}).
        </p>
      </div>
    )
  }

  return (
    <form className="scheduling-form" onSubmit={handleSubmit}>
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

      <label className="scheduling-form__field">
        <span>Modalidade</span>
        <select value={modalidade} onChange={(event) => setModalidade(event.target.value)}>
          <option value="Presencial">Presencial</option>
          <option value="Online">Online</option>
        </select>
      </label>

      <div className="scheduling-form__field">
        <span>Escolha o dia e horário</span>

        {carregandoSlots && <p className="scheduling-form__aviso">Carregando horários disponíveis…</p>}
        {erroSlots && <p className="scheduling-form__aviso">{erroSlots}</p>}
        {!carregandoSlots && !erroSlots && diasDisponiveis.length === 0 && (
          <p className="scheduling-form__aviso">
            Nenhum horário disponível nos próximos dias para essa modalidade — fale direto pelo WhatsApp
            ou e-mail abaixo.
          </p>
        )}

        {!carregandoSlots && diasDisponiveis.length > 0 && (
          <div className="scheduling-form__dias">
            {diasDisponiveis.map((dia) => (
              <div className="scheduling-form__dia" key={dia.data}>
                <p className="scheduling-form__dia-label">{formatarDataBr(dia.data)}</p>
                <div className="scheduling-form__horarios">
                  {dia.slots.map((slot) => {
                    const ativo = dataEscolhida === dia.data && horarioEscolhido === slot.horario
                    return (
                      <button
                        type="button"
                        key={`${slot.horario}-${slot.modalidade}`}
                        className={'scheduling-form__horario' + (ativo ? ' is-ativo' : '')}
                        onClick={() => {
                          setDataEscolhida(dia.data)
                          setHorarioEscolhido(slot.horario)
                        }}
                      >
                        {slot.horario}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <label className="scheduling-form__field">
        <span>Mensagem (opcional)</span>
        <textarea rows={3} value={mensagem} onChange={(event) => setMensagem(event.target.value)} />
      </label>

      {erroEnvio && <p className="scheduling-form__erro">{erroEnvio}</p>}

      <div className="scheduling-form__ctas">
        <button type="submit" className="btn btn-on-dark" disabled={!camposValidos || enviando}>
          {enviando ? 'Enviando…' : 'Confirmar pedido de agendamento'}
        </button>
      </div>

      <p className="scheduling-form__nota">
        Ao enviar, seu pedido fica com a Sarah para confirmação — a resposta vem pelo contato informado
        acima. Prefere combinar direto? Use o WhatsApp ou e-mail:
      </p>
      <div className="scheduling-form__ctas">
        <button
          type="button"
          className="btn-ghost btn-ghost--on-dark"
          disabled={!contatoPreenchido}
          onClick={handleWhatsapp}
        >
          Enviar por WhatsApp
        </button>
        <button
          type="button"
          className="btn-ghost btn-ghost--on-dark"
          disabled={!contatoPreenchido}
          onClick={handleEmail}
        >
          Enviar por e-mail
        </button>
      </div>
    </form>
  )
}

export default SchedulingForm
