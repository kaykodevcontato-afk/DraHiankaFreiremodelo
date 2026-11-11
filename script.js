'use strict';

// Landing page estática para GitHub Pages. Não salva dados pessoais em servidor.
const WA_NUMBER = '5587991691014';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const menuButton = $('.menu-toggle');
const mobileNav = $('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  menuButton.querySelector('use').setAttribute('href', '#i-menu');
}
menuButton.addEventListener('click', () => {
  if (!mobileNav.hidden) { closeMenu(); return; }
  mobileNav.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Fechar menu');
  menuButton.querySelector('use').setAttribute('href', '#i-close');
});
$$('.mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 940 && !mobileNav.hidden) closeMenu(); });

// Filtros da galeria sem carregar imagens de terceiros.
$$('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    $$('[data-filter]').forEach(b => {
      b.classList.toggle('is-active', b === button);
      b.setAttribute('aria-pressed', String(b === button));
    });
    $$('.gallery-card').forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  });
});

// Modais acessíveis: fechamento por botão, clique no backdrop ou Escape.
function configureDialog(dialog, closeButton, onClose) {
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  if (onClose) dialog.addEventListener('close', onClose);
}
const videoDialog = $('#video-dialog');
const video = $('#botox-video');
function openVideo() {
  videoDialog.showModal();
  const playPromise = video.play();
  if (playPromise?.catch) playPromise.catch(() => {}); // navegador pode exigir clique em Play.
}
$('#watch-video').addEventListener('click', openVideo);
$('#watch-video-secondary').addEventListener('click', openVideo);
configureDialog(videoDialog, $('#close-video'), () => { video.pause(); video.currentTime = 0; });
const imageDialog = $('#image-dialog');
$$('.gallery-card').forEach(card => {
  card.addEventListener('click', () => {
    const picture = $('#image-dialog-photo');
    picture.src = card.dataset.image;
    picture.alt = $('img', card)?.alt || card.dataset.imageTitle;
    $('#image-dialog-caption').textContent = card.dataset.imageTitle;
    imageDialog.showModal();
  });
});
configureDialog(imageDialog, $('#close-image'));

// A data é apenas uma preferência do paciente; o calendário real depende da clínica.
const dateField = $('#patient-date');
const today = new Date();
const localDate = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
dateField.min = localDate;

// Máscara simples de telefone BR com suporte ao teclado, colagem e números sem máscara.
const phoneField = $('#patient-phone');
phoneField.addEventListener('input', () => {
  let digits = phoneField.value.replace(/\D/g, '').slice(0, 13);
  if (digits.startsWith('55') && digits.length > 11) digits = digits.slice(2);
  digits = digits.slice(0, 11);
  if (!digits) return;
  let formatted = `(${digits.slice(0, 2)}`;
  if (digits.length >= 2) formatted += ') ';
  if (digits.length > 2) {
    const split = digits.length > 10 ? 7 : 6;
    formatted += digits.slice(2, split);
    if (digits.length > split) formatted += '-' + digits.slice(split);
  }
  phoneField.value = formatted;
});

$$('[data-service-link]').forEach(link => {
  link.addEventListener('click', () => {
    $('#patient-service').value = link.dataset.serviceLink;
  });
});

const form = $('#booking-form');
const feedback = $('#form-feedback');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const fullName = $('#patient-name').value.trim().replace(/\s+/g, ' ');
  const phone = phoneField.value.replace(/\D/g, '');
  const service = $('#patient-service').value;
  const city = $('#patient-city').value;
  const date = dateField.value;
  const period = $('#patient-period').value;
  const note = $('#patient-note').value.trim();
  if (fullName.length < 3) { $('#patient-name').setCustomValidity('Informe seu nome.'); form.reportValidity(); $('#patient-name').setCustomValidity(''); return; }
  if (![10, 11].includes(phone.length)) { phoneField.setCustomValidity('Digite um telefone com DDD válido.'); form.reportValidity(); phoneField.setCustomValidity(''); return; }
  if (date && date < localDate) { dateField.setCustomValidity('Selecione uma data futura.'); form.reportValidity(); dateField.setCustomValidity(''); return; }
  const displayDate = date ? date.split('-').reverse().join('/') : 'A combinar';
  const message = [
    'Olá! Gostaria de solicitar uma avaliação com a Dra. Hianka Freire. ✨',
    '',
    `*Nome:* ${fullName}`,
    `*WhatsApp:* ${phoneField.value.trim()}`,
    `*Tipo de atendimento:* ${service}`,
    `*Cidade de preferência:* ${city} - PE`,
    `*Data desejada:* ${displayDate}`,
    `*Período:* ${period}`,
    ...(note ? [`*Observação:* ${note}`] : []),
    '',
    'Por favor, podem confirmar a disponibilidade de atendimento?'
  ].join('\n');
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.href = url;
  feedback.hidden = false;
  feedback.textContent = 'Solicitação preparada. Conclua o envio na conversa do WhatsApp que foi aberta. O agendamento depende de confirmação da equipe.';
});
$('#year').textContent = String(new Date().getFullYear());
