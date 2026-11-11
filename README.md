# Dra. Hianka Freire — landing page profissional

Landing page responsiva para **Dra. Hianka Freire**, **Cirurgiã-Dentista**, **CRO-PE 16048**, com apresentação profissional, odontologia, ortodontia, harmonização facial, vídeo sobre Botox, galeria de registros e **solicitação de agendamento via WhatsApp**.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `dra-hianka-freire`).
2. Envie **todos os arquivos e a pasta `assets/`**, mantendo a mesma estrutura. O arquivo principal deve se chamar exatamente `index.html`.
3. Abra **Settings → Pages → Build and deployment → Deploy from a branch**. Selecione **main** e **/(root)** e salve.
4. Acesse a URL exibida em **Settings → Pages** (normalmente `https://USUARIO.github.io/dra-hianka-freire/`).

Não precisa de hospedagem paga, banco de dados, Node.js ou instalação de bibliotecas. As fontes online são carregadas pelo Google Fonts quando há conexão; sem elas, o site usa fontes locais de fallback.

## Estrutura

```text
index.html
style.css
script.js
README.md
assets/
  simbolo-hianka.svg           — símbolo redesenhado a partir da referência
  logo-hianka-freire.svg       — logo completa vetorial, com fundo transparente
  logo-hianka-freire.png       — logo completa em PNG com fundo transparente
  favicon.svg                  — ícone para a aba
  dra-hianka.webp              — foto profissional original otimizada
  dra-hianka-recorte.webp      — foto com fundo removido para a capa
  ortodontia.webp              — registro odontológico (aparelho)
  estetica-labial.webp         — registro clínico de lábios
  botox-expressoes.webp        — registro facial
  harmonizacao-facial.webp     — registro facial
  botox-video-poster.jpg       — capa do vídeo
  video-botox.mp4              — vídeo enviado sobre Botox
```

## Como funciona o agendamento

1. Paciente preenche nome, telefone, tipo de atendimento, cidade, data e período preferidos, e aceita o envio pelo WhatsApp.
2. Ao enviar, a página abre `https://wa.me/5587991691014` com **mensagem já preenchida**.
3. O paciente precisa **confirmar o envio no WhatsApp**. A clínica então responde e confirma disponibilidade.

**Importante:** este site **não** reserva automaticamente horários, **não** dispõe de agenda compartilhada nem recebe respostas de WhatsApp. Data e período são **preferências**; o agendamento só existe depois da confirmação da clínica. O site não salva os dados do paciente. O envio passa pelas políticas de privacidade do WhatsApp.

### Para alterar dados

- **WhatsApp:** no `script.js`, altere `WA_NUMBER = '5587991691014'`, e no `index.html` procure por `wa.me/5587991691014` e pelo número exibido.
- **Cidades:** edite os elementos da seção `#localidades` e as opções do seletor `#patient-city` no `index.html`.
- **Tratamentos:** atualize as seções de serviços e as opções de `#patient-service`.
- **Fotos:** substitua os arquivos em `assets/` mantendo os nomes, ou atualize os caminhos no HTML.
- **Vídeo:** substitua `assets/video-botox.mp4` por outro MP4 com codec compatível com navegadores (ex.: H.264/AAC).
- **Crédito do desenvolvedor:** no rodapé há um link para o Instagram Dev Kayko.

## Atenção antes de colocar em produção

- **Autorizações:** confirme autorização por escrito da profissional e de **cada paciente identificável** nas imagens de tratamentos e no vídeo, inclusive para divulgação pública na internet. Remova imagens sem autorização. No site há aviso de validação dessas autorizações.
- **Publicidade profissional:** submeta texto, fotografias clínicas, peças de divulgação e menções de especialidade à revisão da dentista, conforme regras aplicáveis do CFO/CRO. Não se declara resultado garantido e não se vende procedimento sem avaliação.
- **Privacidade:** o site não armazena formulários. Para implantar agenda real com horários disponíveis, confirmação automática, lembretes ou cadastro clínico, é necessária uma integração de agenda/backend com proteção adequada dos dados pessoais.
- **Endereços e Instagram:** não foram informados e por isso não foram inventados. Acrescente apenas depois de confirmados.

**Projeto pronto para GitHub Pages.**
