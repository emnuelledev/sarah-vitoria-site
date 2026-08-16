# Sarah Vitória — Website (v1)

Primeira versão navegável do site da nutricionista Sarah Vitória, em React + JSX,
usando a identidade visual já aprovada (lilás `#D395FF` + off-white `#F2EFEB`,
tipografia Lora/Poppins e o logo oficial).

Sem backend nesta etapa — dados estáticos/mockados em `src/data/`, prontos para
receber conteúdo definitivo e futuras integrações (agendamento, Spotify, Google
Maps, Instagram).

## Como rodar

```bash
npm install
npm run dev       # ambiente de desenvolvimento (http://localhost:5173)
npm run build     # build de produção em /dist
npm run preview   # serve o build de produção localmente
```

## Estrutura

```
src/
  components/
    layout/     Header, Footer, Layout (wrapper com skip-link)
    ui/         Hero, SectionTitle, CTASection, ContentCard, InstagramSection,
                FAQAccordion, SpotifyEmbed, MapSection, MethodStep,
                MaterialPreview, ImagePlaceholder, Reveal, PageMeta
  pages/        Home, Sobre, Acompanhamento, Conteudos, Agendamento, Privacidade
  data/         siteConfig.js, contents.js, method.js, faq.js, about.js
  assets/logo/  3 versões do logo já aprovado (extraídas do arquivo original)
  styles/       variables.css (tokens de marca), global.css
```

## O que já está pronto para edição rápida

Tudo que ainda não foi confirmado pela Sarah está centralizado e marcado como
placeholder — nenhuma informação foi inventada (CRN, formação, preços, horários,
endereço, conteúdo do Método Metamorfose, respostas do FAQ, etc.):

- **`src/data/siteConfig.js`** — contato (WhatsApp/e-mail/Instagram), link de
  agendamento, endereço/Google Maps, playlist do Spotify, modalidades de
  atendimento.
- **`src/data/method.js`** — conceito/duração/formato do Método Metamorfose,
  etapas do "Como funciona", frases do "Para quem", materiais de "Além da
  consulta".
- **`src/data/faq.js`** — perguntas e respostas do accordion (Acompanhamento).
- **`src/data/about.js`** — bloco profissional (história, formação, CRN,
  especializações, abordagem) e a composição de "Sarah além da nutrição".
- **`src/data/contents.js`** — cards de conteúdo (Home e página Conteúdos);
  basta adicionar um novo objeto ao array para publicar um novo card.

## Fotografias e materiais

Como ainda não há fotos/mockups definitivos, o site usa `ImagePlaceholder` —
um placeholder editorial (não uma foto genérica) que indica claramente o que
deve entrar ali. Basta importar a imagem real e passá-la para o componente
correspondente (`ContentCard`, `MaterialPreview`, ou substituir o
`ImagePlaceholder` dentro do `Hero`).

## Integrações futuras (estrutura já preparada, sem lógica de backend)

- **Agendamento**: `siteConfig.agendamento.url` — quando definido, o botão
  passa a abrir o link diretamente.
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
