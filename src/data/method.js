// ============================================================================
// method.js
// Estrutura do "Método Metamorfose". Conteúdo real extraído do material
// "Acompanhamento Nutricional — Método Metamorfose" fornecido pela Sarah.
// O que ainda não aparece nesse material (ex.: duração exata de cada fase)
// permanece como placeholder claramente identificado.
// ============================================================================

export const metodo = {
  nome: 'Metamorfose',
  chamada:
    'Pensado como uma lagarta presa em seu casulo que, aos poucos, se permite voar livre como uma borboleta.',
  conceito:
    'Depois de perceber que, na realidade atual, muitas pessoas possuem uma relação não muito legal com a alimentação, a Sarah criou o Método Metamorfose — pensando em uma lagarta presa em seu casulo que aos poucos se permite voar livre como uma borboleta.',
  duracao:
    'Consulta avulsa ou acompanhamento contínuo, com consultas a cada 30 dias.',
  formato:
    'Acompanhamento individual, estruturado em 3 fases — Mapeando, Intervenção e Acompanhamento.',
}

// "Como funciona" — as 3 fases reais do Método Metamorfose.
export const comoFunciona = [
  {
    numero: '01',
    titulo: 'Mapeando',
    descricao:
      'O momento ideal para mapear sua rotina, seus gostos e seus objetivos. Você recebe um questionário pré-consulta para que a Sarah faça uma análise sobre você antes mesmo do primeiro encontro. Na primeira consulta, ela analisa seu histórico de alimentação, histórico de possíveis doenças e exames, e faz sua avaliação nutricional completa — com aferição de todas as medidas essenciais, incluindo bioimpedância e adipômetro.',
  },
  {
    numero: '02',
    titulo: 'Intervenção',
    descricao:
      'Vocês trabalham juntas todos os problemas e queixas que impedem ou dificultam alcançar seus objetivos. Nessas consultas, a Sarah ensina o que você precisa saber e fazer para melhorar sua alimentação e sua saúde, faz a prescrição de alimentos e suplementos necessários, e vocês chegam cada vez mais perto do seu objetivo.',
  },
  {
    numero: '03',
    titulo: 'Acompanhamento',
    descricao:
      'A fase final do tratamento nutricional, quando o objetivo foi atingido ou está muito próximo. Aqui, o tempo entre as consultas aumenta gradualmente, até a alta.',
  },
]

// "O que você pode esperar do método" — os 4 pilares do acompanhamento.
export const oQueEsperar = [
  {
    titulo: 'Plano alimentar personalizado e didático',
    descricao:
      'Em todas as consultas, vocês montam juntas um plano alimentar que dá direção — 100% de acordo com sua rotina, hábitos e preferências. Inclui conversar sobre as exceções e como equilibrar a alimentação.',
  },
  {
    titulo: 'Avaliação nutricional completa',
    descricao:
      'Em todas as consultas: aferição de peso, uso de adipômetro e bioimpedância para acompanhar a composição corporal, além da análise de sinais e sintomas (como queixas de saúde intestinal ou gástrica).',
  },
  {
    titulo: 'Suplementação',
    descricao:
      'Junto ao plano alimentar, se necessário, é prescrita suplementação para prevenção e tratamento de questões de saúde ou otimização dos resultados.',
  },
  {
    titulo: 'Follow-up',
    descricao:
      'A cada 15 dias você recebe um questionário follow-up simples, para a Sarah entender como você está e como pode ajudar ainda mais caso encontre alguma dificuldade.',
  },
]

// "Para quem" — situações reais que trazem pacientes até a Sarah.
export const paraQuem = [
  'Quero melhorar minha relação com a comida.',
  'Tenho dificuldade em manter uma rotina alimentar.',
  'Quero uma estratégia que faça sentido na minha vida.',
]

// Investimento — planos reais informados pela Sarah.
// Valores podem mudar; centralizados aqui para facilitar atualização.
export const planos = [
  {
    id: 'consulta-avulsa',
    nome: 'Consulta avulsa',
    preco: 'R$ 180,00',
    condicao: 'à vista',
    inclui: [
      '1 consulta + plano alimentar no aplicativo',
      'Avaliação física com adipômetro e bioimpedância',
      'Avaliação de exames bioquímicos',
      'Prescrição de suplementos, se necessário',
      'Suporte no WhatsApp por 30 dias',
    ],
    bonus: [],
    destaque: false,
  },
  {
    id: 'plano-acompanhamento',
    nome: 'Plano de acompanhamento',
    preco: 'R$ 450,00',
    condicao: 'à vista ou 3x R$ 150,00 (crédito)*',
    inclui: [
      '3 consultas a cada 30 dias + plano alimentar no aplicativo',
      'Avaliação física com adipômetro e bioimpedância',
      'Avaliação de exames bioquímicos',
      'Prescrição de suplementação, se necessário',
    ],
    bonus: [
      'Avaliação física fotográfica',
      'Acesso a e-books de receitas',
      'Acompanhamento quinzenal por meio do follow-up',
      'Cupons de desconto em parceiros',
      'Suporte no WhatsApp por 90 dias',
      'Planner da nutri impresso',
    ],
    destaque: true,
  },
]

export const planosNota =
  '*Parcelamento sujeito às condições da forma de pagamento no momento da contratação.'

// "Além da consulta" — materiais educativos já produzidos pela Sarah.
export const materiais = [
  {
    id: 'metodo-metamorfose-completo',
    titulo: 'Guia completo do Método Metamorfose',
    descricao: 'O material completo com a metodologia, as 3 fases do acompanhamento e o investimento, em PDF.',
    imagem: null,
    download: '/downloads/metodo-metamorfose.pdf',
  },
  {
    id: 'guia-organizacao-dieta',
    titulo: 'Guia de organização da dieta',
    descricao: 'Guia prático para organizar ambiente, mercado e rotina em torno do plano alimentar.',
    imagem: null,
  },
  {
    id: 'materiais-planejamento',
    titulo: 'Materiais de planejamento',
    descricao: 'Ferramentas para planejar refeições da semana com mais clareza e menos esforço.',
    imagem: null,
  },
  {
    id: 'orientacoes-rotina',
    titulo: 'Orientações práticas de rotina',
    descricao: 'Estratégias para o dia a dia: mercado, preparo e organização dos alimentos em casa.',
    imagem: null,
  },
  {
    id: 'receitas-lanches',
    titulo: 'Receitas de lanches intermediários',
    descricao: 'Sugestões práticas para os lanches entre as refeições principais.',
    imagem: null,
  },
]

export default metodo
