import ImagePlaceholder from './ImagePlaceholder'
import './SpotifyEmbed.css'

/**
 * SpotifyEmbed — espaço para o embed oficial do Spotify (iframe).
 * Sem link real ainda: mostra um placeholder no formato de card (thumb da
 * capa + texto), já preparado para receber a playlist real — nunca um
 * player falso.
 */
function SpotifyEmbed({ playlistEmbedUrl }) {
  if (!playlistEmbedUrl) {
    return (
      <div className="spotify-embed spotify-embed--placeholder">
        <div className="spotify-embed__thumb">
          <ImagePlaceholder label="Capa" ratio="1 / 1" />
        </div>
        <div className="spotify-embed__info">
          <span className="spotify-embed__note">Playlist do Spotify em breve</span>
          <p>
            Assim que o link da playlist for definido, o player oficial do Spotify aparece aqui.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="spotify-embed">
      <iframe
        title="Playlist da Sarah Vitória no Spotify"
        src={playlistEmbedUrl}
        width="100%"
        height="352"
        style={{ borderRadius: 'var(--radius-md)', border: 'none' }}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  )
}

export default SpotifyEmbed
