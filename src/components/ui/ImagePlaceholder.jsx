/**
 * ImagePlaceholder — placeholder editorial para fotografias/materiais ainda
 * não fornecidos. Nunca simula uma foto real; deixa claro que é um espaço
 * reservado, mas com acabamento visual coerente com a identidade.
 */
function ImagePlaceholder({ label = 'Imagem a definir', ratio = '4 / 5', className = '' }) {
  return (
    <div
      className={`placeholder-frame ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label}
    >
      <span className="placeholder-frame__label">{label}</span>
    </div>
  )
}

export default ImagePlaceholder
