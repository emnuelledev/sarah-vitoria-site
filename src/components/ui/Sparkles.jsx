import './Sparkles.css'

/**
 * Sparkles — decoração minimalista espalhada (inspirada nos "brilhinhos" do
 * site da Aura), em duas variantes de traço fino:
 *   - "butterfly": pequenas borboletas em line art, para as áreas do
 *     Método Metamorfose (o próprio método nasce da metáfora
 *     lagarta → casulo → borboleta, então o símbolo aqui é literal ao
 *     conceito, não decorativo genérico).
 *   - "petal": pequenas flores de cerejeira em line art, para o aceno à
 *     cultura japonesa na página Sobre.
 *
 * Propositalmente minimalista: poucos elementos, traço fino, tamanhos e
 * opacidades variados — não deve competir com o texto.
 */
const LAYOUTS = {
  butterfly: [
    { top: '8%', left: '6%', size: 22, rotate: -12, opacity: 0.55 },
    { top: '18%', left: '88%', size: 16, rotate: 10, opacity: 0.4 },
    { top: '38%', left: '93%', size: 26, rotate: -6, opacity: 0.5 },
    { top: '72%', left: '4%', size: 18, rotate: 14, opacity: 0.4 },
    { top: '85%', left: '80%', size: 20, rotate: -18, opacity: 0.5 },
    { top: '52%', left: '12%', size: 13, rotate: 6, opacity: 0.3 },
    { top: '10%', left: '48%', size: 14, rotate: -8, opacity: 0.28 },
  ],
  petal: [
    { top: '8%', left: '90%', size: 22, rotate: 0, opacity: 0.55 },
    { top: '20%', left: '5%', size: 15, rotate: 24, opacity: 0.4 },
    { top: '40%', left: '95%', size: 26, rotate: -12, opacity: 0.5 },
    { top: '62%', left: '7%', size: 17, rotate: 10, opacity: 0.4 },
    { top: '82%', left: '84%', size: 19, rotate: -20, opacity: 0.5 },
    { top: '50%', left: '48%', size: 13, rotate: 8, opacity: 0.28 },
    { top: '12%', left: '45%', size: 14, rotate: -14, opacity: 0.3 },
  ],
}

function ButterflyIcon() {
  return (
    <svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 11c-1-6-6.5-9-9.5-8-2 .7-2 4 .2 5.4C8.7 9.8 12.6 10 16 11z" />
        <path d="M16 11c1-6 6.5-9 9.5-8 2 .7 2 4-.2 5.4C24.3 9.8 20.4 10 16 11z" />
        <path d="M16 12c-.8 4.6-4.6 6.3-6.6 5.8-1.5-.4-1.6-2.7-.2-3.7 1.4-1 4.3-1.5 6.8-2.1z" />
        <path d="M16 12c.8 4.6 4.6 6.3 6.6 5.8 1.5-.4 1.6-2.7.2-3.7-1.4-1-4.3-1.5-6.8-2.1z" />
        <line x1="16" y1="7.5" x2="16" y2="16.5" />
      </g>
    </svg>
  )
}

// Uma pétala desenhada uma vez e repetida 5x por rotação em torno do centro
// — garante uma silhueta de florzinha (sakura) simétrica e legível mesmo em
// tamanhos pequenos, em vez de 5 curvas desenhadas à mão (que liam como um
// rabisco genérico e não como uma flor reconhecível).
const PETAL_PATH = 'M12 12c0-3.7 1.9-6.4 3.6-6.8.9 2.2-.5 5.3-3.6 6.8z'

function PetalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        {[0, 72, 144, 216, 288].map((deg) => (
          <path key={deg} d={PETAL_PATH} transform={`rotate(${deg} 12 12)`} />
        ))}
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}

function Sparkles({ variant = 'butterfly', className = '' }) {
  const layout = LAYOUTS[variant] || LAYOUTS.butterfly
  const Icon = variant === 'petal' ? PetalIcon : ButterflyIcon

  return (
    <div className={`sparkles sparkles--${variant} ${className}`} aria-hidden="true">
      {layout.map((item, index) => (
        <span
          key={index}
          className="sparkles__item"
          style={{
            top: item.top,
            left: item.left,
            width: item.size,
            height: item.size,
            opacity: item.opacity,
            '--r': `${item.rotate}deg`,
          }}
        >
          <Icon />
        </span>
      ))}
    </div>
  )
}

export default Sparkles
