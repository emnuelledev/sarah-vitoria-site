# Sarah Vitória — Website (v1)

Primeira versão navegável do site da nutricionista Sarah Vitória, em React + JSX,
usando a identidade visual já aprovada (lilás `#D395FF` + off-white `#F2EFEB`,
tipografia Lora/Poppins e o logo oficial).

Backend em Supabase (Postgres + Auth + Edge Functions) — agendamento real com
disponibilidade e sem conflito de horário, painel admin (`/admin`) para a
Sarah editar conteúdos/depoimentos/FAQ e confirmar agendamentos, e
notificação por e-mail a cada novo pedido.

## Como rodar

```bash
npm install
npm run dev       # ambiente de desenvolvimento (http://localhost:5173)
npm run build     # build de produção em /dist
npm run preview   # serve o build de produção localmente
```

## Configurando o backend (Supabase)

1. Crie um projeto gratuito em [supabase.com](https://supabase.com).
2. Copie `.env.example` para `.env` e preencha com a **Project URL** e a
   chave **anon public** (ou **publishable**, no sistema de chaves novo) do
   projeto — em Project Settings → API.
3. No **SQL Editor** do painel Supabase, rode (nessa ordem):
   - `supabase/schema.sql` — cria as tabelas e as políticas de RLS.
   - `supabase/seed.sql` — popula com o conteúdo que já existia em
     `src/data/` (conteúdos, depoimentos, FAQ) e uma regra de disponibilidade
     de exemplo (seg–sex, 9h–18h, presencial) pra ter algo pra testar.
4. Crie o usuário de admin da Sarah em **Authentication → Users → Add user**
   (e-mail + senha) — é o login usado em `/admin`. Não existe cadastro público
   nessa tela.
5. Para o e-mail de notificação de novo agendamento:
   - crie uma conta gratuita em [resend.com](https://resend.com) e gere uma
     API key;
   - implante a Edge Function: `supabase functions deploy notify-booking`
     (requer a [Supabase CLI](https://supabase.com/docs/guides/cli) logada e
     linkada ao projeto: `supabase link --project-ref SEU_PROJECT_REF`);
   - configure os secrets da function:
     `supabase secrets set RESEND_API_KEY=... NOTIFY_EMAIL=email-da-sarah@exemplo.com`.
   - Sem isso configurado, o agendamento continua funcionando normalmente
     (fica salvo e visível em `/admin/agendamentos`) — só o e-mail automático
     não é enviado.

Estrutura do backend:

```
supabase/
  schema.sql              tabelas + row level security
  seed.sql                popula com o conteúdo atual de src/data/
  functions/
    notify-booking/       Edge Function: e-mail via Resend a cada novo pedido
```

## Estrutura

```
src/
  components/
    admin/      RequireAuth, AdminLayout, admin.css (painel /admin)
    layout/     Header, Footer, Layout (wrapper com skip-link)
    ui/         Hero, SectionTitle, CTASection, ContentCard, InstagramSection,
                FAQAccordion, SpotifyEmbed, MapSection, MethodStep,
                MaterialPreview, ImagePlaceholder, Reveal, PageMeta
  pages/        Home, Sobre, Acompanhamento, Conteudos, Agendamento, Privacidade
    admin/      Login, Dashboard, Agendamentos, Disponibilidade, Conteudos,
                Depoimentos, Faq — telas do painel administrativo
  lib/          supabaseClient.js, AuthContext.jsx, content.js (leitura
                pública), availability.js (cálculo de horários livres +
                criação de agendamento), admin.js (CRUD do painel), useAsync.js
  data/         siteConfig.js, method.js, about.js, contents.js (só a lista
                de categorias — os artigos em si vêm do banco)
  assets/logo/  3 versões do logo já aprovado (extraídas do arquivo original)
  styles/       variables.css (tokens de marca), global.css
supabase/       schema.sql, seed.sql, functions/notify-booking/ (ver acima)
```

## O que já está pronto para edição rápida

Tudo que ainda não foi confirmado pela Sarah está centralizado e marcado como
placeholder — nenhuma informação foi inventada (CRN, formação, preços,
endereço, conteúdo do Método Metamorfose, etc.):

- **`src/data/siteConfig.js`** — contato (WhatsApp/e-mail/Instagram),
  endereço/Google Maps, playlist do Spotify, modalidades de atendimento.
- **`src/data/method.js`** — conceito/duração/formato do Método Metamorfose,
  etapas do "Como funciona", frases do "Para quem", materiais de "Além da
  consulta".
- **`src/data/about.js`** — bloco profissional (história, formação, CRN,
  especializações, abordagem) e a composição de "Sarah além da nutrição".

Conteúdos (artigos), depoimentos, FAQ e agendamentos não ficam mais em
arquivos — são editados direto pelo painel **`/admin`** (login criado no
Supabase, ver seção acima).

## Fotografias e materiais

Como ainda não há fotos/mockups definitivos, o site usa `ImagePlaceholder` —
um placeholder editorial (não uma foto genérica) que indica claramente o que
deve entrar ali. Basta importar a imagem real e passá-la para o componente
correspondente (`ContentCard`, `MaterialPreview`, ou substituir o
`ImagePlaceholder` dentro do `Hero`).

## Integrações futuras (estrutura já preparada, sem lógica de backend)

O agendamento já é real (Supabase + Edge Function, ver acima). Seguem
pendentes:

- **Spotify**: `siteConfig.spotify.playlistEmbedUrl` — componente
  `SpotifyEmbed` já pronto para o iframe oficial.
- **Google Maps**: `siteConfig.localizacao` — componente `MapSection` já
  pronto para embed + endereço + botão "Abrir no Google Maps".
- **Instagram**: `InstagramSection` está pronto para receber a integração real
  do feed (API/token) no lugar do placeholder visual atual.

## Notas de acessibilidade

- HTML semântico, skip-link, foco visível, `aria-*` no menu mobile, accordion
  e navegação.
- Respeita `prefers-reduced-motion`.
- As microinterações de entrada (`Reveal`) usam progressive enhancement: se o
  JavaScript não rodar, o conteúdo permanece visível por padrão (ver
  `html.js` em `index.html` / `global.css`).
- Paleta revisada para contraste mínimo AA (4.5:1) em texto de corpo — o tom
  "Lilás Escuro" da marca (`#A16BC7`) foi mantido intacto como cor
  decorativa/swatch, e um tom funcional mais escuro (`--text-suave`) foi
  criado especificamente para texto secundário legível.
