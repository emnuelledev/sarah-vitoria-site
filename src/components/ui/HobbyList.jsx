import Reveal from './Reveal'
import './HobbyList.css'

/**
 * HobbyList — lista de "pequenas paixões" com um emoji nativo por item
 * (pedido da Sarah: emojis "estilo iPhone" em vez dos ícones em line art —
 * como são caracteres Unicode normais, o navegador renderiza cada um com a
 * fonte de emoji do próprio aparelho, então em iPhone/Mac já aparece no
 * estilo nativo da Apple automaticamente, sem precisar de nenhuma imagem).
 */
const EMOJIS = {
  Pilates: '🧘',
  'Dança do ventre': '💃',
  'Fé católica': '✝️',
  'Família e amigos por perto': '❤️',
  'Cultura japonesa': '⛩️',
  'Estudando japonês': '🀄',
  'Shows ao vivo': '🎤',
  Cachorros: '🐶',
  'Experimentar culinárias diferentes': '🍽️',
  'Culinária árabe, a favorita': '🧆',
  'Fotografar a lua': '🌙',
  'Fotografar o pôr do sol': '🌅',
  Cerejeiras: '🌸',
  Leitura: '📖',
  'Romance e fantasia': '🔮',
}

function HobbyList({ items }) {
  return (
    <ul className="hobby-list">
      {items.map((item, index) => (
        <Reveal
          as="li"
          key={item.texto}
          className={'hobby-list__item' + (item.tone === 'sakura' ? ' hobby-list__item--sakura' : '')}
          delay={(index % 6) * 50}
        >
          <span className="hobby-list__icon" aria-hidden="true">
            {EMOJIS[item.texto] || '✦'}
          </span>
          <span className="hobby-list__label">{item.texto}</span>
        </Reveal>
      ))}
    </ul>
  )
}

export default HobbyList
