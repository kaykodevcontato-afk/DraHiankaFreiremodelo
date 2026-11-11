/*
 * DRA. HIANKA FREIRE — INTERATIVIDADE
 * Para trocar o número que recebe o formulário, altere WA_NUMBER abaixo.
 * Os links de WhatsApp exibidos na página ficam no index.html.
 * Não remova os IDs do HTML: são usados por este script.
 */

'use strict';

const WA_NUMBER = '5587991691014';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

// 01 — Menu responsivo
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

// 02 — Filtros da galeria
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

// 03 — Janelas de vídeo e imagem
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

// 04 — Agendamento: data mínima e máscara do telefone
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

// 04B — Calendário visual na identidade azul-petróleo e dourado
// Para alterar cores, veja "CALENDÁRIO PERSONALIZADO" no final do style.css.
const datePicker = $('#custom-date-picker');
const dateTrigger = $('#date-trigger');
const dateCalendar = $('#date-calendar');
const dateMonth = $('#calendar-month');
const dateDays = $('#calendar-days');
const dateLabel = $('#date-trigger-label');
const calendarPrev = $('#calendar-prev');
const calendarNext = $('#calendar-next');
const calendarClear = $('#calendar-clear');
const calendarToday = $('#calendar-today');
let visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const ptMonth = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });
const dateIso = d => [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');

function renderCalendar() {
  if (!dateCalendar) return;
  dateMonth.textContent = ptMonth.format(visibleMonth);
  dateDays.replaceChildren();
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstWeekday; i++) {
    const empty = document.createElement('span');
    empty.className = 'calendar-empty';
    dateDays.appendChild(empty);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const value = dateIso(new Date(year, month, day));
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'calendar-day';
    button.textContent = String(day);
    button.setAttribute('aria-label', `${day} de ${ptMonth.format(visibleMonth)}`);
    button.disabled = value < localDate;
    if (value === localDate) button.classList.add('is-today');
    if (value === dateField.value) {
      button.classList.add('is-selected');
      button.setAttribute('aria-pressed', 'true');
    }
    button.addEventListener('click', () => {
      dateField.value = value;
      dateLabel.textContent = value.split('-').reverse().join('/');
      closeCalendar();
      dateTrigger.focus();
    });
    dateDays.appendChild(button);
  }
  calendarPrev.disabled = new Date(year, month, 1) <= new Date(today.getFullYear(), today.getMonth(), 1);
}
function closeCalendar() {
  dateCalendar.hidden = true;
  dateTrigger.setAttribute('aria-expanded', 'false');
}
if (datePicker && dateField) {
  dateTrigger.addEventListener('click', () => {
    const shouldOpen = dateCalendar.hidden;
    dateCalendar.hidden = !shouldOpen;
    dateTrigger.setAttribute('aria-expanded', String(shouldOpen));
    if (shouldOpen) renderCalendar();
  });
  calendarPrev.addEventListener('click', () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
    renderCalendar();
  });
  calendarNext.addEventListener('click', () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
    renderCalendar();
  });
  calendarToday.addEventListener('click', () => {
    dateField.value = localDate;
    dateLabel.textContent = localDate.split('-').reverse().join('/');
    closeCalendar();
  });
  calendarClear.addEventListener('click', () => {
    dateField.value = '';
    dateLabel.textContent = 'Escolher uma data';
    closeCalendar();
  });
  document.addEventListener('click', event => {
    if (!datePicker.contains(event.target)) closeCalendar();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !dateCalendar.hidden) {
      closeCalendar();
      dateTrigger.focus();
    }
  });
}

// 05 — Selecionar serviço e rolar até formulário
$$('[data-service-link]').forEach(link => {
  link.addEventListener('click', () => {
    const service = $('#patient-service');
    if (service) service.value = link.dataset.serviceLink;
  });
});

// 06 — Montagem da mensagem e envio via WhatsApp
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

  // Abre uma aba nova a partir do clique real do usuário.
  // NUNCA usar window.location, location.assign ou form.submit aqui,
  // pois essas alternativas substituem o site da profissional.
  let newTab = null;
  try {
    newTab = window.open('about:blank', '_blank');
    if (newTab) {
      newTab.opener = null; // Isola a nova aba da página original.
      newTab.location.replace(url);
    }
  } catch (error) {
    // Bloqueio de pop-up: o usuário pode usar o link alternativo abaixo.
  }

  // Link manual confiável: um clique explícito abre nova aba sem sair do site.
  if (feedback) {
    feedback.hidden = false;
    feedback.textContent = newTab
      ? 'WhatsApp aberto em uma nova aba. Confirme o envio da mensagem por lá. '
      : 'O navegador impediu a abertura automática. ';
    const fallbackLink = document.createElement('a');
    fallbackLink.href = url;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    fallbackLink.textContent = newTab ? 'Abrir o WhatsApp novamente' : 'Abrir WhatsApp em nova aba';
    fallbackLink.className = 'whatsapp-fallback-link';
    feedback.appendChild(fallbackLink);
    feedback.appendChild(document.createTextNode(' — este site permanece aberto.'));
  }
});

// 07 — Ano automático no rodapé
$('#year').textContent = String(new Date().getFullYear());


// 08 — Esconde botão flutuante ao chegar ao rodapé
const floatingWhatsApp = document.querySelector('.floating-whatsapp');
const footer = document.querySelector('.footer');
if (floatingWhatsApp && footer && "IntersectionObserver" in window) {
  const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      floatingWhatsApp.classList.toggle('is-hidden', entry.isIntersecting);
    });
  }, { threshold: 0.08 });
  footerObserver.observe(footer);
}
