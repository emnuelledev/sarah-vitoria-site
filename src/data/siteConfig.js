// ============================================================================
// siteConfig.js
// Config central do site — dados de contato, links externos e flags de
// integração futura. Tudo que ainda não foi confirmado pela cliente entra
// como PLACEHOLDER (claramente identificado) em vez de ser inventado.
//
// Para atualizar quando a informação real chegar: troque apenas o valor,
// nada mais no site precisa mudar.
// ============================================================================

const ENDERECO = 'Rua Pedro Soares de Andrade, 62 — São Miguel Paulista, São Paulo - SP'

// Mensagem padrão do wa.me — deixa claro pra Sarah que o contato veio do
// site (pedido dela), sem presumir intenção específica da pessoa.
const WHATSAPP_NUMERO = '5511977697545'
const WHATSAPP_MENSAGEM = 'Olá, Sarah! Vim através do seu site e gostaria de saber mais sobre o acompanhamento nutricional.'

// Localização confirmada pela Sarah: link real do Google Maps para a
// ficha dela (Nutricionista Sarah Vitória), não só uma busca genérica pelo
// endereço — inclui as coordenadas exatas da ficha para o embed também
// apontar para o pin certo.
const MAPS_COORDENADAS = { lat: -23.4956418, lng: -46.4365171 }

export const siteConfig = {
  brand: {
    name: 'Sarah Vitória',
    role: 'Nutricionista',
    // CRN confirmado no material "Acompanhamento Nutricional — Método Metamorfose"
    crn: 'CRN3-88388/P',
  },

  // Link central do sistema de agendamento (Calendly, Doctoralia, etc.).
  // Enquanto não houver integração, o CTA usa este placeholder e pode virar
  // um formulário/modal futuramente.
  agendamento: {
    url: null, // ex.: 'https://calendly.com/sarahvitoria'
    placeholder: 'Link de agendamento em configuração',
  },

  contato: {
    whatsapp: {
      // confirmado pela Sarah
      numero: '+55 11 97769-7545',
      url: `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`,
      // base sem mensagem fixa — usada pelo formulário de agendamento, que
      // monta sua própria mensagem com os dados preenchidos
      baseUrl: `https://wa.me/${WHATSAPP_NUMERO}`,
    },
    email: 'vitoriasarah253@gmail.com', // confirmado pela Sarah
    instagram: {
      handle: '@nutrisarahvitoria', // confirmado — perfil real do Instagram
      url: 'https://instagram.com/nutrisarahvitoria',
    },
  },

  // Endereço + localização no Google Maps confirmados pela Sarah — link
  // aponta direto para a ficha dela ("Nutricionista Sarah Vitória"), e o
  // embed usa as coordenadas exatas dessa ficha (sem necessidade de API key)
  // em vez de uma busca genérica pelo endereço.
  localizacao: {
    definida: true,
    endereco: ENDERECO,
    mapsEmbedUrl: `https://www.google.com/maps?q=${MAPS_COORDENADAS.lat},${MAPS_COORDENADAS.lng}&z=16&output=embed`,
    mapsUrl: 'https://maps.app.goo.gl/EvbbGCYiTLZS69nj8',
  },

  spotify: {
    // Embed de teste (playlist de exemplo, NÃO é a da Sarah) — só para ver o
    // componente funcionando de verdade. Trocar pelo link real da playlist
    // da Sarah assim que ela mandar.
    playlistEmbedUrl: 'https://open.spotify.com/embed/playlist/55nxNlbqVWkRpszjjGqc41?utm_source=generator&si=436d66f404cb49f3',
  },

  modalidades: [
    {
      id: 'presencial',
      titulo: 'Atendimento presencial',
      descricao: `Consultório na ${ENDERECO}.`,
    },
    {
      id: 'online',
      titulo: 'Atendimento online',
      descricao: 'Consulta por videochamada, de onde você estiver.',
    },
  ],

  footer: {
    legal: [
      { label: 'Política de Privacidade', href: '/privacidade' },
    ],
    creditos: 'Website crafted by Aura Digital',
    // Clicar na assinatura do rodapé abre um popup com a identidade visual
    // real da Aura (mesmo padrão usado nos outros sites da agência — cores,
    // tipografia e textos extraídos do site real auradigital, não do site
    // da Sarah). auraUrl/auraInstagram ainda não informados — quando vierem,
    // aparecem como links extras dentro do popup automaticamente.
    aura: {
      eyebrow: 'Creative Studio · Valencia, Spain',
      tagline: 'Designing brands. Building digital presence.',
      texto: 'A boutique creative studio for brand identity, websites and digital design.',
      email: 'emma.auradigital@gmail.com',
      url: null, // ex.: 'https://auradigital.studio'
      instagram: null, // ex.: 'https://instagram.com/auradigital'
    },
  },
}

export default siteConfig
