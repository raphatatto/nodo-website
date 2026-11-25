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

| Arquivo no projeto | Tipo    | Fonte (URL do item)        | Autor | Licença (URL) | Atribuição exigida? | Modificações | Data       | Responsável |
| ------------------ | ------- | -------------------------- | ----- | ------------- | ------------------- | ------------ | ---------- | ----------- |
| `src/app/icon.svg` | Favicon | Original NODO (provisório) | NODO  | Próprio       | Não                 | —            | 2026-11-24 | —           |

_Nenhum recurso de terceiros em uso nesta etapa._
