import ImagePlaceholder from './ImagePlaceholder'
import Reveal from './Reveal'
import './MaterialPreview.css'

/**
 * MaterialPreview — mockup/preview de materiais educativos desenvolvidos
 * pela Sarah (ex.: guia de organização da dieta). Ilustrativo — não afirma
 * que o item faz parte de todos os planos.
 */
function MaterialPreview({ titulo, descricao, imagem, download, delay = 0 }) {
  return (
    <Reveal as="article" className="material-preview" delay={delay}>
      {imagem ? (
        <img src={imagem} alt="" className="material-preview__image" />
      ) : (
        <ImagePlaceholder label="Mockup do material" ratio="3 / 4" />
      )}
      <h3 className="material-preview__titulo">{titulo}</h3>
      <p className="material-preview__descricao">{descricao}</p>
      {download && (
        <a href={download} download className="material-preview__download">
          ↓ Baixar PDF
        </a>
      )}
    </Reveal>
  )
}

export default MaterialPreview
