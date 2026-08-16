import Reveal from './Reveal'
import './MethodStep.css'

/**
 * MethodStep — item numerado grande, usado em "Como funciona" e
 * previews do Método Metamorfose. Números grandes ecoam a linguagem
 * visual já usada nos materiais da Sarah.
 */
function MethodStep({ numero, titulo, descricao, delay = 0 }) {
  return (
    <Reveal as="div" className="method-step" delay={delay}>
      <span className="method-step__numero" aria-hidden="true">
        {numero}
      </span>
      <div className="method-step__content">
        <h3 className="method-step__titulo">{titulo}</h3>
        <p className="method-step__descricao">{descricao}</p>
      </div>
    </Reveal>
  )
}

export default MethodStep
