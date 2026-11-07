# Nosso Infinito ❤️

Um presente de Leonardo para Geovana. Site mobile-first em Next.js, React, TypeScript, Tailwind CSS e Framer Motion, com todas as 28 fotos reais do ZIP.

## Abrir e editar

Requer Node.js 20.9 ou superior. Abra um terminal nesta pasta:

```sh
npm ci
npm run dev
```

Abra `http://localhost:3000`. Para criar a versão final:

```sh
npm run typecheck
npm run build
```

A pasta `out/` contém o site estático completo para hospedagem HTTPS. Não abra o `index.html` diretamente pelo explorador: sirva a pasta por HTTP, por exemplo com `npx serve out`.

## Onde editar

| Conteúdo | Arquivo |
| --- | --- |
| As 28 declarações, títulos e categorias | `src/data/memories.ts` |
| Carta, linha do tempo, mensagem final, música e filme | `src/data/content.ts` |
| Fotos originais numeradas | `public/photos/01.jpg` até `28.jpg` |
| Cores, fontes, espaçamento e animações | `src/app/globals.css` |
| Coração e abertura | `src/components/HeartIntro.tsx` |
| Duração da interação (2.400 ms) | `src/hooks/useHeartInteraction.ts` |
| Associação entre fotos originais e numeração | `scripts/photo-manifest.json` |

Os arquivos originais foram preservados. A ordem foi escolhida para combinar as fotografias com as declarações. Nenhuma data foi inventada.

## Trocar ou acrescentar fotos

1. Coloque o JPEG em `public/photos`, usando dois dígitos (`01.jpg`, `29.jpg` etc.).
2. Edite ou acrescente o objeto em `src/data/memories.ts`, com `id`, `image`, `title`, `message`, `category` e `alt`.
3. Execute `npm run photos` para gerar versões WebP de 480 e 960 px e atualizar as dimensões.
4. Execute `npm run build` e publique novamente.

O campo `position` controla o enquadramento do card. A ampliação sempre mostra a imagem inteira. Ao adicionar fotos, atualize também a contagem no texto de apresentação e no filtro em `MemoryGallery.tsx`.

## Adicionar a música e o filme

Crie `public/media`, coloque seus arquivos nessa pasta e preencha os objetos no final de `src/data/content.ts`:

```ts
export const music: MediaItem = {
  title: 'Nossa música',
  src: '/media/nossa-musica.mp3',
};
export const film: MediaItem = {
  title: 'Nosso filme',
  src: '/media/nosso-filme.mp4',
  poster: '/photos/24-960.webp',
  caption: 'Uma descrição do nosso filme.',
};
```

Os players nativos aparecem automaticamente quando `src` está preenchido. Não há autoplay. Sem arquivo, aparecem as mensagens de preparação.

## QR Code

Depois de publicar no Cloudflare Pages, gere ou atualize o QR com o endereço `pages.dev` retornado:

```sh
npm run qr -- "https://seu-endereco-final" "../qr-code"
```

O script gera PNG de alta resolução, SVG e uma etiqueta HTML para imprimir. Abra `etiqueta.html` no navegador e imprima em escala 100%. Preserve a área branca ao redor do código. Teste o QR impresso em outro celular antes de prender na bolsa.

O QR apenas codifica o endereço: ele não altera as permissões da hospedagem.

## Estrutura e comportamento

- `src/app`: página, metadados e estilos globais.
- `src/components`: coração, modal acessível, cartões e visualizador.
- `src/sections`: apresentação, galeria, história, carta, música, filme e final.
- `src/hooks`: progresso da abertura.
- `src/data`: conteúdo tipado separado dos componentes.
- `src/lib`: tipos para futuras integrações.
- `assets`: arte original do coração, gerada especificamente para o presente.
- `public`: arquivos usados no site, todos hospedados localmente.

Um toque inicia o despertar de 2,4 segundos; o movimento do dedo libera partículas e ondas. O mouse também ativa a interação. Enter e Espaço funcionam no botão do coração. O visualizador permite setas do teclado e deslizar para os lados. Escape fecha os diálogos; o foco volta ao botão que os abriu. A preferência por movimento reduzido é respeitada.

## Futuras expansões

Os tipos `Memory` e `MediaItem` separam os dados da interface. Um backend poderá fornecer os mesmos objetos. Esta entrega não inclui login, painel administrativo, upload online ou banco de dados; a edição é feita nos arquivos. Para essas funções, adicione um serviço de dados e autenticação antes de disponibilizar qualquer rota de administração.

## Publicação

O projeto exporta arquivos estáticos (`output: 'export'`), conforme a [documentação do Next.js](https://nextjs.org/docs/app/guides/static-exports). A publicação principal usa Cloudflare Pages; o repositório também contém um fluxo do GitHub Pages. Não há chaves ou credenciais no projeto. `robots.txt` e metadados pedem aos buscadores que não indexem o presente; isso não substitui controle de acesso.

## Verificação

Build de produção e TypeScript verificados. A experiência foi exercitada no navegador interno e em Chromium com desktop e celular: abertura, 28 imagens, filtros, ampliação, troca de fotos, carta, mensagem secreta e reinício. As imagens carregam sob demanda em WebP, com JPEG de reserva. Fontes e arte são locais. Não foram testados aparelhos físicos ou Safari nativo.
