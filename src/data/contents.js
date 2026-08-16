// ============================================================================
// contents.js
// Fonte única dos conteúdos editoriais (Home — destaques / Conteúdos — grid).
// Temas baseados na comunicação real da Sarah. Imagens ainda não fornecidas
// usam placeholder editorial (ver componente ContentCard). Clicar em um card
// leva para a página própria do artigo (rota /conteudos/:id, ver
// Artigo.jsx) — `corpo` é o texto integral do artigo; enquanto a Sarah não
// envia o texto real de cada um, fica como placeholder claramente
// identificado (nunca inventado).
//
// Para adicionar um novo conteúdo, basta incluir um novo objeto no array.
// `url` pode apontar futuramente para o post correspondente no Instagram
// (aparece como link extra na página do artigo, além do texto completo).
// ============================================================================

export const categories = ['Todos', 'Comportamento', 'Nutrição', 'Rotina', 'Saúde']

const PLACEHOLDER_CORPO = '[Texto completo do artigo a ser fornecido pela Sarah.]'

export const contents = [
  {
    id: 'frutose-frutas-engorda',
    categoria: 'Nutrição',
    titulo: 'A frutose das frutas pode engordar?',
    descricao:
      'Um mito comum revisitado com calma: entenda a diferença entre o açúcar da fruta e o açúcar adicionado.',
    corpo: PLACEHOLDER_CORPO,
    imagem: null,
    url: null,
    data: null,
  },
  {
    id: 'comer-rapido',
    categoria: 'Comportamento',
    titulo: 'Comer rápido faz você comer mais?',
    descricao:
      'Por que o ritmo da refeição influencia tanto a saciedade — e como desacelerar sem virar regra rígida.',
    corpo: PLACEHOLDER_CORPO,
    imagem: null,
    url: null,
    data: null,
  },
  {
    id: 'sinais-relacao-com-comida',
    categoria: 'Comportamento',
    titulo: 'Sinais de que sua relação com a comida precisa de atenção',
    descricao:
      'Alguns comportamentos merecem um olhar mais gentil e atento — sem julgamento, sem alarmismo.',
    corpo: PLACEHOLDER_CORPO,
    imagem: null,
    url: null,
    data: null,
  },
  {
    id: 'vitamina-d',
    categoria: 'Saúde',
    titulo: 'Vitamina D',
    descricao:
      'O que ela faz no corpo, por que costuma faltar e como pensar nisso dentro da rotina alimentar.',
    corpo: PLACEHOLDER_CORPO,
    imagem: null,
    url: null,
    data: null,
  },
  {
    id: 'constipacao-alimentacao',
    categoria: 'Saúde',
    titulo: 'Constipação e alimentação',
    descricao:
      'Ajustes simples na alimentação e na rotina que podem fazer diferença no funcionamento do intestino.',
    corpo: PLACEHOLDER_CORPO,
    imagem: null,
    url: null,
    data: null,
  },
]

export default contents
