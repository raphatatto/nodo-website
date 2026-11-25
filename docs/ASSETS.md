# Recursos visuais — referências, origem e licenciamento

Registro obrigatório de toda imagem, vídeo, modelo 3D, textura, ícone ou mockup de terceiros usado no site. Diretrizes completas em [`NODO/visual-research.md`](../NODO/visual-research.md) e `NODO/README.md` §07.

## Princípios

- Priorizar elementos **originais** (CSS, SVG, Three.js, shaders, renders próprios) antes de recursos prontos.
- Direção de arte: paleta Carbon · Paper · Silver · Navy; minimalismo, futurismo material, precisão, conexão.
- Evitar: fotos corporativas genéricas, robôs, cérebros digitais, hologramas clichês, neon, verde como cor de marca.
- **Não inventar URLs** e não usar recurso sem verificar disponibilidade e licença no momento do download.
- Não publicar trabalhos de clientes/empregadores sem autorização; marcar projetos conceituais como tal.
- Otimizar para web antes de versionar (AVIF/WebP para imagem, MP4/WebM curtos para vídeo, GLB comprimido para 3D, texturas em KTX2/WebP quando aplicável).
- As imagens em `NODO/assets/` são **referências internas** (incluem capturas de estúdios terceiros como Lusion e Basement): não publicar no site.

## Estrutura de pastas

| Pasta                     | Conteúdo                                            |
| ------------------------- | --------------------------------------------------- |
| `public/brand/`           | Logotipo, símbolo, favicon definitivos (SVG)        |
| `public/images/`          | Fotografia e imagens editoriais                     |
| `public/projects/<slug>/` | Capas e mídias de cases                             |
| `public/models/`          | Modelos 3D (`.glb`)                                 |
| `public/textures/`        | Texturas, HDRIs, mapas de material                  |
| `public/videos/`          | Loops e vídeos curtos pré-renderizados (com poster) |

Nomes em kebab-case, sem espaços ou acentos: `knot-chrome-v1.glb`, `hero-a-poster.avif`.

## Bibliotecas consideradas

Os termos abaixo são um resumo para orientação — **as licenças mudam e variam por item: confirmar sempre na página do recurso no momento do download** e registrar o link da licença.

| Biblioteca                                           | Tipo                          | Observação de licença (verificar)                                                                                                          |
| ---------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [Unsplash](https://unsplash.com/)                    | Fotografia                    | Unsplash License: uso comercial permitido; restrições a revenda sem modificação e a serviços concorrentes.                                 |
| [Pexels](https://www.pexels.com/)                    | Fotografia e vídeo            | Pexels License: uso comercial permitido; restrições a revenda sem modificação e a uso que sugira endosso de pessoas/marcas retratadas.     |
| [Poly Haven](https://polyhaven.com/)                 | HDRIs, texturas, modelos      | Publicados como CC0.                                                                                                                       |
| [ambientCG](https://ambientcg.com/)                  | Texturas/materiais PBR, HDRIs | Publicados como CC0.                                                                                                                       |
| [Sketchfab](https://sketchfab.com/)                  | Modelos 3D                    | Licença **por modelo** (CC BY, CC BY-NC, CC0, Standard/Editorial da loja). Evitar NC e Editorial para uso comercial; respeitar atribuição. |
| [Spline Community](https://community.spline.design/) | Cenas 3D interativas          | Termos **por arquivo** e termos da plataforma Spline; verificar permissão de remix e uso comercial.                                        |
| [SVG Repo](https://www.svgrepo.com/)                 | Ícones e vetores              | Licença **por item** (CC0, MIT, CC BY, etc.); alguns exigem atribuição. Ícones de interface padrão: preferir `lucide-react`.               |
| [Mixkit](https://mixkit.co/)                         | Vídeo, música, efeitos        | Licenças Mixkit distintas por categoria; verificar a aplicável a cada item.                                                                |
| [LS Graphics](https://www.ls.graphics/)              | Mockups de dispositivos       | Itens gratuitos e pagos com licenças próprias; verificar termos de uso comercial e atribuição.                                             |

Outras fontes citadas no DS (Pixabay, Mockup World, LottieFiles) seguem a mesma regra de verificação.

## Termos de pesquisa (inglês)

Abstract chrome sculpture · Interconnected metallic objects · Torus knot · Navy blue abstract geometry · Futuristic editorial photography · Brutalist architecture · Generative art · Particle network · Computational geometry · Liquid metal · Brushed aluminum · Digital product mockup · Abstract glass sculpture.

## Registro de recursos

Adicionar uma linha por recurso **antes** de usá-lo em uma rota pública.

| Arquivo no projeto                                | Tipo                       | Fonte (URL do item)                                                                                                          | Autor                                                      | Licença (URL)                                                              | Atribuição exigida?                  | Modificações                                                                                                                                           | Data       | Responsável |
| ------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | ----------- |
| `src/app/icon.svg`                                | Favicon                    | Original NODO (provisório)                                                                                                   | NODO                                                       | Próprio                                                                    | Não                                  | —                                                                                                                                                      | 2026-11-24 | —           |
| `public/images/hero-b/knot-render.jpg`            | Render 3D (imagem)         | [unsplash.com/photos/vmvlYqgURY4](https://unsplash.com/photos/vmvlYqgURY4) — "Abstract chrome sculpture on black background" | Luke Hales ([@lukehales](https://unsplash.com/@lukehales)) | [Unsplash License](https://unsplash.com/license) (gratuita, não Unsplash+) | Não exigida; creditado na proposta B | Redimensionado para 2400×1560; reflexo Navy aplicado por CSS (blend), arquivo original intacto                                                         | 2026-11-25 | Etapa 2     |
| `public/projects/energy-intelligence/cover.jpg`   | Capa de projeto (conceito) | Original NODO — fornecido pelo usuário                                                                                       | NODO                                                       | Próprio (uso permitido, confirmado pelo usuário)                           | Não                                  | JPG q86 (1400×900)                                                                                                                                     | 2026-11-25 | Etapa 3     |
| `public/projects/intelligent-assistant/cover.jpg` | Capa de projeto (conceito) | Original NODO — fornecido pelo usuário                                                                                       | NODO                                                       | Próprio (uso permitido, confirmado pelo usuário)                           | Não                                  | Wordmark de marca, domínio da barra de endereço e título da aba removidos (preenchimento com a cor do entorno); reduzido de 3600 para 2400 px; JPG q86 | 2026-11-25 | Etapa 3     |
| `public/projects/digital-experience/cover.jpg`    | Capa de projeto (conceito) | Original NODO — fornecido pelo usuário                                                                                       | NODO                                                       | Próprio (uso permitido, confirmado pelo usuário)                           | Não                                  | Reduzido de 2160 para 1800 px; JPG q86                                                                                                                 | 2026-11-25 | Etapa 3     |
| `public/projects/connected-operations/cover.jpg`  | Capa de projeto (conceito) | Original NODO — fornecido pelo usuário                                                                                       | NODO                                                       | Próprio (uso permitido, confirmado pelo usuário)                           | Não                                  | JPG q86 (1448×1086)                                                                                                                                    | 2026-11-25 | Etapa 3     |

**Uso restrito:** o render acima é usado apenas na rota interna `/playground/hero-b` (404 em produção). Antes do lançamento, substituir por render próprio de The Knot (slot em `src/experiments/hero-b/render.ts`, com prompt de geração).

### Referências visuais — não publicar

| Origem                                                                                                                                        | Uso                                                                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `NODO/assets/**`                                                                                                                              | Referências do DS (inclui capturas de estúdios terceiros). Citadas nas fichas das propostas; nunca importadas.                                   |
| Imagens enviadas pelo usuário na Etapa 2 (esfera de pontos, cubos chrome, fita de vidro Navy, lâminas translúcidas, metal líquido, nó chrome) | Referência de direção de arte para The Intelligence, The Structure, The Flow e The Knot. Licença desconhecida — não versionadas, não publicadas. |
| Unsplash "a black and white photo of a knot" (Rick Rothenberg)                                                                                | Avaliado e descartado (textura e tom marrom fora da paleta).                                                                                     |
