# Dra. Hianka Freire — site organizado para GitHub Pages

Os arquivos foram **reformatados e comentados para facilitar a edição**, mantendo as seções, os estilos na ordem original e as funções de menu, galeria, vídeo e agendamento via WhatsApp.

## Estrutura

```text
index.html       Página, textos, fotos, links, formulário e seções
style.css        Aparência, fontes, cores, molduras e ajustes para celular
script.js        Menu, vídeo, filtros e envio do formulário por WhatsApp
assets/          Imagens, logo e vídeo — copie da versão original
README.md        Estas instruções
```

## O que editar e onde

| Quero alterar | Arquivo | Onde encontrar |
| --- | --- | --- |
| Nome, profissão, CRO e textos | `index.html` | Procure `HIANKA FREIRE`, `CRO-PE` ou os comentários `01`, `02`... |
| Foto da capa | `index.html` | `assets/dra-hianka-nova.webp` |
| Foto do Sobre | `index.html` | `assets/dra-hianka.webp` |
| Serviços | `index.html` | `03 — ESPECIALIDADES` |
| Fotos da galeria | `index.html` | `05 — GALERIA` e atributos `data-image` |
| Número visível e links do WhatsApp | `index.html` | Procure `5587991691014` |
| Número que recebe os formulários | `script.js` | `WA_NUMBER` no início |
| Instagram Dev Kayko | `index.html` | Procure `alien_okyak` |
| Cores gerais | `style.css` | `:root`, no início; confira substituições em `Edição 3` |
| Moldura da foto inicial | `style.css` | `hero-photo-wrap` e `hero-photo-surface` (correção final) |
| Formulário | `index.html` | `07 — FORMULÁRIO` |
| Mensagem enviada no formulário | `script.js` | `const message = [` |

## Publicar no GitHub

1. Abra seu repositório no GitHub.
2. Envie os arquivos **`index.html`, `style.css`, `script.js` e `README.md`** para a raiz do repositório.
3. **Muito importante:** preserve a pasta `assets/` original com todos os arquivos de imagem, logo e vídeo listados em `assets/LEIA-ME.txt`. Os arquivos reais não foram anexados aqui e não estão no ZIP.
4. Vá em **Settings → Pages → Deploy from a branch**; selecione `main` e `/ (root)`.
5. Ao alterar CSS ou JavaScript, aumente o parâmetro `?v=3` nos links do `<head>` de `index.html` para limpar o cache mais facilmente.

## Como editar diretamente no GitHub

Abra o arquivo desejado, clique em **Edit (ícone do lápis)**, altere o texto ou estilo e clique em **Commit changes**. Não altere `id`, `class`, `data-*` ou caminhos de `assets/` sem ajustar as referências correspondentes.

## Observações

- O formulário **não cria consultas automaticamente**: ele abre o WhatsApp com os dados preenchidos para a equipe confirmar o atendimento.
- O site não tem backend nem banco de dados.
- Confirme com a profissional as informações publicadas e as autorizações para uso dos registros clínicos.

## Correção do formulário (versão 4)

O formulário de avaliação abre o WhatsApp em **nova aba** e mantém a landing page aberta. Se o navegador bloquear a aba, aparece um link para abrir manualmente. Após a publicação, o `index.html` usa `script.js?v=4` para evitar a versão antiga em cache. O envio da mensagem ainda precisa ser confirmado pelo visitante no WhatsApp.


## Correção WhatsApp / calendário (versão 5)
- O agendamento tenta abrir `wa.me` em **nova aba**, sem redirecionar `index.html`.
- Caso o navegador bloqueie a nova aba, aparece um **link manual** para abrir WhatsApp, também em nova aba.
- O clique no link é o método mais compatível com bloqueadores de pop-up.
- O calendário de data foi substituído por um calendário personalizado em azul-petróleo e dourado, com dias passados desativados.
- Edite as cores na seção `CALENDÁRIO PERSONALIZADO` do `style.css`.
- Os arquivos CSS e JS usam `?v=5` para evitar cache antigo.
- Em celulares, o sistema pode alternar para o aplicativo WhatsApp; a aba do site continua existindo no navegador.
