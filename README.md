<p align="center">
  <img src="src/assets/logo/logo-original-lilac-bg.png" alt="Sarah Vitória — Nutricionista" width="100%"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_19-3A2743?style=for-the-badge&logo=react&logoColor=D395FF" alt="React 19"/>
  <img src="https://img.shields.io/badge/Vite-A16BC7?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/React_Router_7-3A2743?style=for-the-badge&logo=reactrouter&logoColor=D395FF" alt="React Router 7"/>
  <img src="https://img.shields.io/badge/Supabase-A16BC7?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/>
  <img src="https://img.shields.io/badge/Deploy-Vercel-3A2743?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
</p>

# Sarah Vitória — Site

Site institucional da nutricionista **Sarah Vitória** (São Paulo, Brasil).
Construído com **React 19 + Vite + React Router**, usando a identidade visual já
aprovada (lilás `#D395FF` + off-white `#F2EFEB`, tipografia Lora/Poppins e o logo
oficial). Backend em **Supabase** (Postgres + Auth + Edge Functions): agendamento
real com disponibilidade e sem conflito de horário, notificação por e-mail a cada
pedido, e um painel administrativo para a Sarah gerenciar tudo sem mexer em código.

> ✨ **A ideia-chave:** quase tudo que muda com frequência (conteúdos, depoimentos,
> FAQ, agendamentos) é editado direto pelo **painel `/admin`**, sem tocar em código.
> O que ainda muda pouco (contato, método, bio) está centralizado em **3 arquivos
> dentro de `src/data/`**.

---

## 📑 Índice

1. [Como rodar o projeto no seu computador](#-1-como-rodar-o-projeto-no-seu-computador)
2. [Publicar o site online (Vercel)](#-2-publicar-o-site-online-vercel)
3. [Configurando o backend (Supabase)](#-3-configurando-o-backend-supabase)
4. [Painel administrativo (/admin)](#-4-painel-administrativo-admin)
5. [Como funciona o agendamento](#-5-como-funciona-o-agendamento)
6. [Notificação por e-mail (Resend)](#-6-notificação-por-e-mail-resend)
7. [Dados que ainda são editados por arquivo](#-7-dados-que-ainda-são-editados-por-arquivo)
8. [Fotografias e materiais](#-8-fotografias-e-materiais)
9. [Cores e tipografia](#-9-cores-e-tipografia)
10. [Acessibilidade](#-10-acessibilidade)
11. [Estrutura do projeto](#-11-estrutura-do-projeto)
12. [Problemas frequentes](#-12-problemas-frequentes)
13. [Crédito de Aura Digital](#-13-crédito-de-aura-digital)

---

## 🚀 1. Como rodar o projeto no seu computador

**Requisito:** ter **Node.js 18 ou superior** instalado (`node -v` no terminal para
conferir; baixe a versão **LTS** em [nodejs.org](https://nodejs.org) se precisar).

```bash
npm install     # instala as dependências (só na primeira vez)
npm run dev     # sobe o site em modo desenvolvimento
```

Abra **http://localhost:5173** no navegador. Sem o backend configurado (próximo
passo), o site carrega normalmente — só o que depende do Supabase (conteúdos,
depoimentos, FAQ, agendamento, admin) fica vazio até isso ser feito.

```bash
npm run build     # build de produção em /dist
npm run preview   # serve o build de produção localmente
npm run lint       # oxlint
```

---

## ☁️ 2. Publicar o site online (Vercel)

1. Suba o projeto para o **GitHub**.
2. Entre em [vercel.com](https://vercel.com) e faça login **com GitHub**.
3. **Add New → Project** → escolha o repositório → **Deploy**. A Vercel detecta
   Vite sozinha.
4. **Importante — diferente de um site 100% estático:** este projeto precisa das
   variáveis de ambiente do Supabase configuradas na Vercel, senão o backend não
   funciona. Em **Settings → Environment Variables**, adicione (para Production):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

   Use os mesmos valores do seu `.env` local (ver seção 3). Depois de adicionar,
   vá em **Deployments → Redeploy** — variáveis novas só valem a partir do
   próximo build.

Cada push para o GitHub gera um novo deploy automático.

---

## 🗄️ 3. Configurando o backend (Supabase)

1. Crie um projeto gratuito em [supabase.com](https://supabase.com).
2. Copie `.env.example` para `.env` e preencha com a **Project URL** e a chave
   **anon public** (ou **publishable**, no sistema de chaves novo) — em
   *Project Settings → API*.
3. No **SQL Editor** do painel Supabase, rode nesta ordem:
   - `supabase/schema.sql` — cria as tabelas e as políticas de RLS.
   - `supabase/seed.sql` — popula com o conteúdo que já existia no site
     (conteúdos, depoimentos, FAQ) e uma regra de disponibilidade de exemplo
     (seg–sex, 9h–18h, presencial), só para ter algo para testar.
4. Crie o usuário de login da Sarah em **Authentication → Users → Add user**
   (e-mail + senha). Não existe cadastro público — esse é o único jeito de criar
   acesso ao `/admin`.

```
supabase/
  schema.sql              tabelas + row level security
  seed.sql                popula com o conteúdo inicial
  functions/
    notify-booking/       Edge Function: e-mail via Resend a cada novo pedido
```

---

## 🔐 4. Painel administrativo (/admin)

Login em **`/admin/login`** (também linkado como "Login" no rodapé do site) com o
e-mail/senha criados no passo anterior. Depois de logada, a Sarah tem:

| Página | Para quê serve |
|---|---|
| `/admin` | Visão geral — pedidos pendentes, confirmados, atalhos |
| `/admin/agendamentos` | Confirmar ou cancelar os pedidos recebidos pelo site |
| `/admin/disponibilidade` | Cadastrar regras semanais de horário + bloqueios/liberações pontuais |
| `/admin/conteudos` | Criar, editar e publicar/despublicar artigos |
| `/admin/depoimentos` | Editar os depoimentos exibidos em Acompanhamento |
| `/admin/faq` | Editar as perguntas frequentes do accordion |

No topo de cada página tem **"Voltar ao site"** (sai do painel sem encerrar a
sessão) e **"Sair"** (logout de verdade).

---

## 📅 5. Como funciona o agendamento

Não é um campo de texto livre — o formulário em `/agendamento` mostra só
horários **realmente disponíveis**, calculados a partir de:

- **`availability_rules`** — regra semanal recorrente (ex.: seg–sex, 9h–18h,
  consultas de 60min, presencial), cadastrada em `/admin/disponibilidade`.
- **`availability_exceptions`** — bloqueios pontuais (feriado, dia indisponível)
  ou liberações extras fora da regra padrão.
- **`appointments`** já ocupados — o banco tem uma constraint que impede dois
  agendamentos ativos no mesmo horário, mesmo em caso de duas pessoas enviando
  o pedido ao mesmo tempo.

O pedido entra como **pendente**; a Sarah confirma ou cancela em
`/admin/agendamentos`. WhatsApp e e-mail continuam disponíveis como canal
alternativo, para quem preferir combinar direto.

---

## ✉️ 6. Notificação por e-mail (Resend)

Opcional, mas recomendado — avisa a Sarah por e-mail a cada novo pedido:

1. Crie uma conta gratuita em [resend.com](https://resend.com) e gere uma API key.
2. Implante a Edge Function (requer a
   [Supabase CLI](https://supabase.com/docs/guides/cli) logada e linkada:
   `supabase link --project-ref SEU_PROJECT_REF`):
   ```bash
   supabase functions deploy notify-booking
   ```
3. Configure os secrets da function:
   ```bash
   supabase secrets set RESEND_API_KEY=... NOTIFY_EMAIL=email-da-sarah@exemplo.com
   ```

Sem isso configurado, o agendamento continua funcionando normalmente — o pedido
fica salvo e visível em `/admin/agendamentos` — só o e-mail automático não sai.

---

## ✏️ 7. Dados que ainda são editados por arquivo

Conteúdos, depoimentos, FAQ e agendamentos vivem no banco e são editados pelo
`/admin`. O que ainda muda pouco segue em arquivo, sempre marcado como
placeholder quando a informação não foi confirmada pela Sarah — nada é
inventado:

| Arquivo | O que é |
|---|---|
| `src/data/siteConfig.js` | Contato (WhatsApp/e-mail/Instagram), endereço/Google Maps, playlist do Spotify, modalidades de atendimento, dados do crédito da Aura Digital no rodapé |
| `src/data/method.js` | Método Metamorfose: conceito, "Como funciona", "Para quem", materiais de "Além da consulta" |
| `src/data/about.js` | Bloco profissional da Sarah — história, formação, CRN, especializações, abordagem |
| `src/data/contents.js` | Só a lista fixa de categorias usada no filtro de Conteúdos e no admin — os artigos em si vêm do banco |

---

## 🖼️ 8. Fotografias e materiais

Onde ainda não há foto/mockup definitivo, o site usa `ImagePlaceholder` — um
placeholder editorial (não uma foto genérica) que indica claramente o que deve
entrar ali. Basta importar a imagem real e passá-la para o componente
correspondente (`ContentCard`, `MaterialPreview`, ou substituir o
`ImagePlaceholder` dentro do `Hero`).

---

## 🎨 9. Cores e tipografia

- Tokens de marca centralizados como **variáveis CSS** em `src/styles/variables.css`.
- Tipografias: **Lora** (editorial/títulos) e **Poppins** (suporte/corpo), via Google Fonts.
- Cores de marca: lilás `#D395FF`, lilás escuro `#A16BC7`, marfim `#F2EFEB`,
  branco lilás `#F9F5FC`, roxo profundo `#3A2743`.
- Paleta revisada para contraste mínimo AA (4.5:1) em texto de corpo — o
  "Lilás Escuro" da marca foi mantido intacto como cor decorativa, e um tom
  funcional mais escuro (`--text-suave`) foi criado especificamente para texto
  secundário legível.

---

## ♿ 10. Acessibilidade

- HTML semântico, skip-link, foco visível, `aria-*` no menu mobile, accordion e navegação.
- Respeita `prefers-reduced-motion`.
- As microinterações de entrada (`Reveal`) usam progressive enhancement: se o
  JavaScript não rodar, o conteúdo permanece visível por padrão (ver `html.js`
  em `index.html` / `global.css`).

---

## 📂 11. Estrutura do projeto

```
src/
  components/
    admin/      RequireAuth, AdminLayout, admin.css        → painel /admin
    layout/     Header, Footer, Layout                     → wrapper com skip-link
    ui/         Hero, SectionTitle, CTASection, ContentCard, InstagramSection,
                FAQAccordion, SpotifyEmbed, MapSection, MethodStep,
                MaterialPreview, ImagePlaceholder, Reveal, PageMeta
  pages/        Home, Sobre, Acompanhamento, Conteudos, Agendamento, Privacidade
    admin/      Login, Dashboard, Agendamentos, Disponibilidade, Conteudos,
                Depoimentos, Faq                            → telas do admin
  lib/          supabaseClient.js, AuthContext.jsx           → conexão + sessão
                content.js, availability.js                 → leitura/escrita pública
                admin.js, useAsync.js                        → CRUD do painel
  data/         siteConfig.js, method.js, about.js, contents.js  (ver seção 7)
  assets/       logo/, aura/, sarah/                         → imagens do site
  styles/       variables.css (tokens de marca), global.css
supabase/       schema.sql, seed.sql, functions/notify-booking/  (ver seção 3)
```

---

## 🆘 12. Problemas frequentes

**A página fica em branco depois do deploy na Vercel.**
Quase sempre é falta das variáveis de ambiente `VITE_SUPABASE_URL` e
`VITE_SUPABASE_ANON_KEY` no projeto da Vercel (o `.env` local é gitignored, não
vai junto no deploy). Configure em *Settings → Environment Variables* e faça
*Redeploy* — ver seção 2.

**Aparece `Could not find the table 'public...'` no console.**
O `supabase/schema.sql` ainda não foi rodado nesse projeto Supabase — ver seção 3.

**Não consigo entrar em `/admin`.**
Confirme que o usuário foi criado em *Authentication → Users* no painel
Supabase, com o e-mail e senha certos — não existe "esqueci minha senha"
configurado nem cadastro público.

**Nenhum horário aparece no formulário de agendamento.**
Falta cadastrar (ou ativar) uma regra em `/admin/disponibilidade` para aquele
dia da semana e modalidade.

---

## 💜 13. Crédito de Aura Digital

No rodapé do site aparece **"Website crafted by Aura Digital"**. Ao clicar, abre
um popup com a identidade da Aura — configurado em `src/data/siteConfig.js`,
campo `footer.aura`:

```js
aura: {
  eyebrow: 'Creative Studio · Valencia, Spain',
  tagline: 'Designing brands. Building digital presence.',
  texto: 'A boutique creative studio for brand identity, websites and digital design.',
  email: 'emma.auradigital@gmail.com',
  url: null,        // site da Aura — quando vier, o botão "Visit website" aparece sozinho
  instagram: null,  // idem, para o link do Instagram
},
```

Logos da Aura em `src/assets/aura/`: `aura-mark-light.png` (rodapé, sobre fundo
escuro) e `aura-mark-dark.png` (popup/fundos claros).

---

<p align="center">
  <br/>
  <img src="src/assets/aura/aura-mark-dark.png" alt="Aura Digital" width="160"/>
</p>

<p align="center">
  <b>Website crafted by Aura Digital</b><br/>
  <sub><i>Creative Studio · Valencia, Spain</i></sub>
</p>

<p align="center">
  <a href="mailto:emma.auradigital@gmail.com"><img src="https://img.shields.io/badge/Email-3A2743?style=flat-square&logo=maildotru&logoColor=D395FF" alt="Email"/></a>
</p>

<p align="center">
  <sub>Site e Instagram da Aura ainda não confirmados — os botões aparecem aqui e no
  popup do rodapé assim que <code>siteConfig.footer.aura.url</code> / <code>.instagram</code> forem preenchidos.</sub>
</p>

<p align="center">
  <sub>© 2026 Sarah Vitória · Nutricionista · São Paulo, Brasil</sub>
</p>
