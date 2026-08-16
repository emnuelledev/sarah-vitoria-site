import { Link } from 'react-router-dom'
import ImagePlaceholder from './ImagePlaceholder'
import Reveal from './Reveal'
import './ContentCard.css'

/**
 * ContentCard — card editorial reutilizável (Home "Conteúdos em destaque" e
 * página Conteúdos). É um preview: imagem, categoria, título e descrição
 * curta. Ao clicar, leva para a página própria do artigo (`/conteudos/:id`,
 * ver `Artigo.jsx`) — assim quem só quer bater o olho decide se segue lendo
 * ou não, sem depender de um popup (que fica apertado para artigos maiores).
 */
function ContentCard({ content, delay = 0 }) {
  const { id, categoria, titulo, descricao, imagem } = content

  return (
    <Reveal as="article" className="content-card" delay={delay}>
      <Link to={`/conteudos/${id}`} className="content-card__link">
        {imagem ? (
          <img src={imagem} alt="" className="content-card__image" />
        ) : (
          <ImagePlaceholder label="Imagem do conteúdo" ratio="4 / 3" />
        )}
        <div className="content-card__body">
          <span className="eyebrow content-card__category">{categoria}</span>
          <h3 className="content-card__title">{titulo}</h3>
          <p className="content-card__description">{descricao}</p>
          <span className="content-card__read">
            Ler artigo
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  )
}

export default ContentCard
