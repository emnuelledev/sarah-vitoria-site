import SectionTitle from './SectionTitle'
import './MapSection.css'

/**
 * MapSection — embed do Google Maps a partir do endereço confirmado.
 * Sem endereço definitivo, não inventa localização (mostra placeholder).
 */
function MapSection({ localizacao }) {
  const { definida, endereco, mapsEmbedUrl, mapsUrl } = localizacao

  return (
    <section className="section section--tight map-section">
      <div className="container">
        <SectionTitle eyebrow="Localização" title="Onde encontrar a Sarah" />

        {definida && mapsEmbedUrl ? (
          <div className="map-section__embed-wrap">
            <iframe
              title="Localização do consultório"
              src={mapsEmbedUrl}
              width="100%"
              height="360"
              style={{ border: 0, borderRadius: 'var(--radius-md)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : (
          <div className="map-section__placeholder">
            <span>Mapa em breve</span>
            <p>{endereco}</p>
          </div>
        )}

        <div className="map-section__footer">
          <p className="map-section__address">{endereco}</p>
          {mapsUrl && (
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              Abrir no Google Maps
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export default MapSection
