// ============================================================================
// about.js — página Sobre
// Dados profissionais (com o texto real de apresentação da Sarah, extraído
// do material "Acompanhamento Nutricional — Método Metamorfose") + a
// personalidade real da Sarah, organizados para uma composição editorial
// (não uma lista de cards idênticos).
// ============================================================================

// Bloco profissional — formação acadêmica (graduação) preenchida com um
// valor provisório (Nutrição — FMU) a pedido da Sarah, só para não ficar em
// branco; ajustar quando o diploma/histórico oficial vier para confirmar o
// texto exato. Especializações vêm do certificado real enviado pela Sarah
// (Formação em Nutrição Comportamental, UNIFATEC/Centro de Nutrição
// Comportamental) — nunca inventadas.
export const profissional = {
  historia:
    'Sou nutricionista com foco em comportamento alimentar. A minha maior motivação é te ajudar a construir uma relação saudável com os alimentos — um planejamento alimentar que se encaixe na sua rotina e nas suas preferências, sempre de forma leve e equilibrada.',
  formacaoPlaceholder: 'Graduação em Nutrição — FMU (Faculdades Metropolitanas Unidas)',
  crn: 'CRN3-88388/P',
  especializacoes: [
    'Formação em Nutrição Comportamental (80h) — Centro de Nutrição Comportamental, em parceria com o UNIFATEC (Centro Universitário de Tecnologia de Curitiba). Voltada a comer intuitivo, mindful eating, comer restritivo e imagem corporal, transtornos alimentares e acolhimento no atendimento nutricional.',
    'Nutri GLP-1: a chave para resultados duradouros (22h) — Escola de Nutrição Aplicada.',
  ],
  abordagem:
    'Você não vai me ver sendo rigorosa ou prescrevendo coisas que não foram combinadas entre nós. No acompanhamento nutricional individual, você é parte ativa — e te ouvir é muito importante para mim. Você é a protagonista dessa jornada.',
}

export const filosofia = {
  frase: 'Podemos recomeçar, reajustar, recalcular.',
  texto:
    'Uma nutrição gentil, leve e sem julgamentos — com mais apoio e menos cobrança. A vida real não segue um plano perfeito, e o acompanhamento também não precisa seguir.',
}

// "Sarah além da nutrição" — composição editorial mista (não cards uniformes).
// `size` sugere peso visual (grande, media, pequena) para variar a composição.
// `tone: 'sakura'` marca os itens ligados à cultura japonesa, que recebem um
// leve toque de rosa sakura na composição — um aceno discreto, sem ícones
// literais (torii, kanji etc.), coerente com a paleta da marca.
export const alemDaNutricao = {
  introducao:
    'A profissional que acolhe também carrega uma vida inteira fora do consultório — é ela quem escuta.',
  quantidadeLabel: '15 pequenas paixões que também fazem parte de quem cuida de você',
  itens: [
    { texto: 'Pilates', size: 'md' },
    { texto: 'Dança do ventre', size: 'lg' },
    { texto: 'Fé católica', size: 'md' },
    { texto: 'Família e amigos por perto', size: 'lg' },
    { texto: 'Cultura japonesa', size: 'sm', tone: 'sakura' },
    { texto: 'Estudando japonês', size: 'md', tone: 'sakura' },
    { texto: 'Shows ao vivo', size: 'sm' },
    { texto: 'Cachorros', size: 'md' },
    { texto: 'Experimentar culinárias diferentes', size: 'lg' },
    { texto: 'Culinária árabe, a favorita', size: 'md' },
    { texto: 'Fotografar a lua', size: 'sm' },
    { texto: 'Fotografar o pôr do sol', size: 'md' },
    { texto: 'Cerejeiras', size: 'sm', tone: 'sakura' },
    { texto: 'Leitura', size: 'md' },
    { texto: 'Romance e fantasia', size: 'lg' },
  ],
}

export const heroSobre = {
  aberturaLinha1: 'Antes de ser a nutri Sarah,',
  aberturaLinha2: 'eu também sou…',
}

export const fechamento = {
  texto:
    'Não é só técnica. É também bagagem de afeto — tudo isso constrói a profissional que recebe você.',
}
