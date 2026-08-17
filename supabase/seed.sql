-- ============================================================================
-- seed.sql — popula o banco com o conteúdo que já existe hoje em src/data/
-- (contents.js, testimonials.js, faq.js), pra migração não perder nada.
-- Rode depois de schema.sql. Idempotente (ON CONFLICT ... DO UPDATE), então
-- pode rodar de novo com segurança — mas se você já editou esses registros
-- pelo painel admin, rodar de novo vai SOBRESCREVER com o texto original.
-- ============================================================================

-- ============================================================================
-- CONTEÚDOS (src/data/contents.js)
-- ============================================================================

insert into contents (id, categoria, titulo, descricao, corpo, imagem_url, url, publicado, ordem)
values
  (
    'frutose-frutas-engorda',
    'Nutrição',
    'A frutose das frutas pode engordar?',
    'Um mito comum revisitado com calma: entenda a diferença entre o açúcar da fruta e o açúcar adicionado.',
    '[Texto completo do artigo a ser fornecido pela Sarah.]',
    null, null, true, 1
  ),
  (
    'comer-rapido',
    'Comportamento',
    'Comer rápido faz você comer mais?',
    'Por que o ritmo da refeição influencia tanto a saciedade — e como desacelerar sem virar regra rígida.',
    '[Texto completo do artigo a ser fornecido pela Sarah.]',
    null, null, true, 2
  ),
  (
    'sinais-relacao-com-comida',
    'Comportamento',
    'Sinais de que sua relação com a comida precisa de atenção',
    'Alguns comportamentos merecem um olhar mais gentil e atento — sem julgamento, sem alarmismo.',
    '[Texto completo do artigo a ser fornecido pela Sarah.]',
    null, null, true, 3
  ),
  (
    'vitamina-d',
    'Saúde',
    'Vitamina D',
    'O que ela faz no corpo, por que costuma faltar e como pensar nisso dentro da rotina alimentar.',
    '[Texto completo do artigo a ser fornecido pela Sarah.]',
    null, null, true, 4
  ),
  (
    'constipacao-alimentacao',
    'Saúde',
    'Constipação e alimentação',
    'Ajustes simples na alimentação e na rotina que podem fazer diferença no funcionamento do intestino.',
    '[Texto completo do artigo a ser fornecido pela Sarah.]',
    null, null, true, 5
  )
on conflict (id) do update set
  categoria = excluded.categoria,
  titulo = excluded.titulo,
  descricao = excluded.descricao,
  corpo = excluded.corpo,
  ordem = excluded.ordem,
  updated_at = now();

-- ============================================================================
-- DEPOIMENTOS (src/data/testimonials.js — avaliações reais do Google)
-- ============================================================================

insert into testimonials (id, nome, estrelas, texto, publicado, ordem)
values
  (
    'google-emanuelle-maria', 'Emanuelle Maria', 5,
    'O lugar é lindo e super confortável para as avaliações, além das profissionais serem incríveis.',
    true, 1
  ),
  (
    'google-danuza-silva', 'Danuza Silva', 5,
    'Excelente profissional. Muito atenciosa e dedicada no que faz, é visível toda dedicação e cuidado que tem com o paciente.',
    true, 2
  ),
  (
    'google-marcela-carini', 'Marcela Carini', 5,
    'Sarah! Super competente, excelente profissional. Indico de olhos fechados!',
    true, 3
  ),
  (
    'google-marcio-roberto', 'Marcio Roberto', 5,
    'Excelente profissional, recomendo!',
    true, 4
  )
on conflict (id) do update set
  nome = excluded.nome,
  estrelas = excluded.estrelas,
  texto = excluded.texto,
  ordem = excluded.ordem;

-- ============================================================================
-- FAQ (src/data/faq.js — respostas reais da Sarah, transcritas)
-- IDs fixos (não gerados) só pra este seed poder rodar de novo sem duplicar.
-- ============================================================================

insert into faq (id, pergunta, resposta, download_label, download_href, ordem)
values
  (
    '00000000-0000-0000-0000-000000000001',
    'Como funciona a primeira consulta?',
    'A primeira consulta faz parte da fase de Mapeamento do Método Metamorfose — o momento de te conhecer bem antes de qualquer prescrição. Antes de nos encontrarmos, você recebe um questionário pré-consulta para eu entender sua rotina, seus gostos e seus objetivos. Nela, eu analiso seu histórico de alimentação, histórico de possíveis doenças e seus exames (quando você já tiver), e faço sua avaliação nutricional completa — com aferição de todas as medidas essenciais, incluindo bioimpedância e adipômetro. É a partir desse mapeamento inicial que construímos juntas o seu plano alimentar.',
    'Baixar o guia completo do Método Metamorfose (PDF)',
    '/downloads/metodo-metamorfose.pdf',
    1
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'O atendimento pode ser online?',
    'Sim! O atendimento online segue a mesma estrutura do presencial — acolhida, anamnese, história de vida e o mesmo suporte contínuo depois da consulta. A única diferença está na avaliação corporal: como as medições não podem ser feitas pessoalmente, você recebe antes um e-book com perguntas sobre peso, altura e circunferências, além de uma avaliação por inteligência artificial (Body 3D), disponível na plataforma usada para os agendamentos e atendimentos.',
    null, null, 2
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Como funcionam os retornos?',
    'Não existe a lógica tradicional de "retorno" — cada consulta é individual. O que existe é suporte contínuo pelo WhatsApp após a consulta: 30 dias na consulta avulsa e 90 dias durante o plano de acompanhamento nutricional (trimestral).',
    null, null, 3
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Preciso levar exames?',
    'Se possível, sim — de preferência com até 3 meses de realização, para estarem atualizados. Mas se você não tiver exames recentes, não tem problema: a guia para realizá-los é gerada no dia da consulta (só não dá para fazer essa avaliação específica nesse mesmo dia). Se você já tiver exames e quiser enviá-los antes pelo WhatsApp, isso ajuda — eles já ficam avaliados previamente e são só comentados durante a consulta.',
    null, null, 4
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'Existe acompanhamento entre consultas?',
    'Sim — mesmo sem a lógica tradicional de "retorno", você tem suporte pela Sarah através do WhatsApp: 30 dias após a consulta avulsa, ou 90 dias durante o plano de acompanhamento nutricional (trimestral).',
    null, null, 5
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'Quais materiais são disponibilizados?',
    'Os materiais variam de acordo com o objetivo de cada paciente. Alguns são comportamentais, usados durante ou após a consulta — como diário alimentar, rastreamento de hábitos e definição de metas. Outros são complementares: um e-book de organização (geralmente enviado na primeira consulta), um e-book sobre alimentos industrializados e um e-book de receitas, com opções específicas para datas como fim de ano e Páscoa. O envio de cada material depende do objetivo e do caso de cada paciente.',
    null, null, 6
  )
on conflict (id) do update set
  pergunta = excluded.pergunta,
  resposta = excluded.resposta,
  download_label = excluded.download_label,
  download_href = excluded.download_href,
  ordem = excluded.ordem;

-- ============================================================================
-- DISPONIBILIDADE — exemplo inicial (ajuste no /admin depois)
-- Seg a sex, 9h-18h, consultas de 1h, presencial. Comente/apague se preferir
-- cadastrar do zero pelo painel.
-- ============================================================================

insert into availability_rules (dia_semana, hora_inicio, hora_fim, duracao_minutos, modalidade, ativo)
select dia_semana, '09:00', '18:00', 60, 'Presencial', true
from generate_series(1, 5) as dia_semana
where not exists (
  select 1 from availability_rules where availability_rules.dia_semana = dia_semana
);
