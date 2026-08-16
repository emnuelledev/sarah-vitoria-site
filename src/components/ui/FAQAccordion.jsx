import { useState } from 'react'
import Reveal from './Reveal'
import './FAQAccordion.css'

/**
 * FAQAccordion — accordion elegante e acessível (aria-expanded, ids únicos).
 * items: [{ pergunta, resposta }]
 */
function FAQAccordion({ items }) {
  // Abre por padrão a primeira pergunta que já tem resposta real (em vez de
  // sempre a primeira do array), para não abrir de cara num placeholder.
  const primeiraRespondida = items.findIndex((item) => !item.resposta.trim().startsWith('['))
  const [openIndex, setOpenIndex] = useState(primeiraRespondida >= 0 ? primeiraRespondida : 0)

  return (
    <ul className="faq-accordion">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const isPlaceholder = item.resposta.trim().startsWith('[')
        const panelId = `faq-painel-${index}`
        const buttonId = `faq-pergunta-${index}`

        return (
          <Reveal as="li" key={item.pergunta} className="faq-accordion__item" delay={index * 40}>
            <h3 className="faq-accordion__heading">
              <button
                type="button"
                id={buttonId}
                className="faq-accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <span>{item.pergunta}</span>
                <span className={'faq-accordion__icon' + (isOpen ? ' is-open' : '')} aria-hidden="true">
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={'faq-accordion__panel' + (isOpen ? ' is-open' : '')}
            >
              {/* wrapper único: o grid 0fr/1fr do painel só anima 1 item de
                  grid corretamente — com resposta + link como itens separados,
                  o link (linha implícita) vazava do painel fechado */}
              <div className="faq-accordion__panel-inner">
                <p className={isPlaceholder ? 'is-placeholder' : ''}>{item.resposta}</p>
                {item.download && (
                  <a href={item.download.href} download className="faq-accordion__download">
                    ↓ {item.download.label}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        )
      })}
    </ul>
  )
}

export default FAQAccordion
