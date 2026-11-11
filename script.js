'use strict';

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
if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    if (!mobileNav.hidden) { closeMenu(); return; }
    mobileNav.hidden = false;
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Fechar menu');
    menuButton.querySelector('use').setAttribute('href', '#i-close');
  });
  $$('.mobile-nav a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && !mobileNav.hidden) closeMenu();
  });
}

$$('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    $$('[data-filter]').forEach(b => {
      const active = b === button;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    $$('.gallery-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

function configureDialog(dialog, closeButton, onClose) {
  if (!dialog || !closeButton) return;
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  if (onClose) dialog.addEventListener('close', onClose);
}

const videoDialog = $('#video-dialog');
const video = $('#botox-video');
const openVideo = () => {
  if (!videoDialog) return;
  videoDialog.showModal();
  const playPromise = video.play();
  if (playPromise?.catch) playPromise.catch(() => {});
};
$('#watch-video')?.addEventListener('click', openVideo);
$('#watch-video-secondary')?.addEventListener('click', openVideo);
configureDialog(videoDialog, $('#close-video'), () => {
  video.pause();
  video.currentTime = 0;
});

const imageDialog = $('#image-dialog');
$$('.gallery-card').forEach(card => {
  card.addEventListener('click', () => {
    $('#image-dialog-photo').src = card.dataset.image;
    $('#image-dialog-photo').alt = $('img', card)?.alt || card.dataset.imageTitle;
    $('#image-dialog-caption').textContent = card.dataset.imageTitle;
    imageDialog.showModal();
  });
});
configureDialog(imageDialog, $('#close-image'));

const dateField = $('#patient-date');
const today = new Date();
const localDate = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')].join('-');
if (dateField) dateField.min = localDate;

const phoneField = $('#patient-phone');
if (phoneField) {
  phoneField.addEventListener('input', () => {
    let digits = phoneField.value.replace(/\D/g, '').slice(0, 13);
    if (digits.startsWith('55') && digits.length > 11) digits = digits.slice(2);
    digits = digits.slice(0, 11);
    if (!digits) {
      phoneField.value = '';
      return;
    }
    let formatted = `(${digits.slice(0, 2)}`;
    if (digits.length >= 2) formatted += ') ';
    if (digits.length > 2) {
      const split = digits.length > 10 ? 7 : 6;
      formatted += digits.slice(2, split);
      if (digits.length > split) formatted += '-' + digits.slice(split);
    }
    phoneField.value = formatted;
  });
}

$$('[data-service-link]').forEach(link => {
  link.addEventListener('click', () => {
    const service = $('#patient-service');
    if (service) service.value = link.dataset.serviceLink;
  });
});

const form = $('#booking-form');
const feedback = $('#form-feedback');
form?.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const fullName = $('#patient-name').value.trim().replace(/\s+/g, ' ');
  const phoneDigits = $('#patient-phone').value.replace(/\D/g, '');
  const phoneDisplay = $('#patient-phone').value.trim();
  const service = $('#patient-service').value;
  const city = $('#patient-city').value;
  const date = $('#patient-date').value;
  const period = $('#patient-period').value;
  const note = $('#patient-note').value.trim();

  if (fullName.length < 3) {
    $('#patient-name').setCustomValidity('Informe seu nome completo.');
    form.reportValidity();
    $('#patient-name').setCustomValidity('');
    return;
  }
  if (![10, 11].includes(phoneDigits.length)) {
    $('#patient-phone').setCustomValidity('Digite um WhatsApp com DDD válido.');
    form.reportValidity();
    $('#patient-phone').setCustomValidity('');
    return;
  }
  if (date && date < localDate) {
    $('#patient-date').setCustomValidity('Selecione uma data futura.');
    form.reportValidity();
    $('#patient-date').setCustomValidity('');
    return;
  }

  const displayDate = date ? date.split('-').reverse().join('/') : 'A combinar';
  const message = [
    'Olá! Gostaria de solicitar um atendimento com a Dra. Hianka Freire. ✨',
    '',
    `*Nome:* ${fullName}`,
    `*WhatsApp:* ${phoneDisplay}`,
    `*Tipo de atendimento:* ${service}`,
    `*Cidade de preferência:* ${city} - PE`,
    `*Data desejada:* ${displayDate}`,
    `*Período de preferência:* ${period}`,
    ...(note ? [`*Observação:* ${note}`] : []),
    '',
    'Podem confirmar a disponibilidade, por favor?'
  ].join('\n');

  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  const opened = window.open(url, '_blank', 'noopener,noreferrer');
  if (!opened) window.location.href = url;

  feedback.hidden = false;
  feedback.textContent = 'Solicitação pronta. Finalize o envio na conversa do WhatsApp aberta em seguida.';
});

$('#year').textContent = String(new Date().getFullYear());
