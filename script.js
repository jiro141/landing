'use strict';

// Reemplaza este valor con el correo real antes de publicar la landing.
const CONTACT_EMAIL = 'contacto@ejemplo.com';

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('nav-links');
if (menuButton && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  };
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(element => observer.observe(element));
} else {
  reveals.forEach(element => element.classList.add('visible'));
}

const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');
if (form && feedback) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) {
      feedback.textContent = 'Revisa los campos obligatorios antes de continuar.';
      return;
    }
    if (CONTACT_EMAIL === 'contacto@ejemplo.com') {
      feedback.textContent = 'Antes de usar el formulario, configura CONTACT_EMAIL en script.js con el correo real de DeTip.';
      return;
    }
    const data = new FormData(form);
    const value = key => String(data.get(key) || '').trim();
    const subject = `Consulta DeTip: ${value('interes')}`;
    const body = [
      `Nombre: ${value('nombre')}`,
      `Correo: ${value('correo')}`,
      `Empresa: ${value('empresa') || 'No indicada'}`,
      `Interés: ${value('interes')}`,
      '',
      'Mensaje:',
      value('mensaje')
    ].join('\n');
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    feedback.textContent = 'Se abrirá tu aplicación de correo. Revisa y envía el mensaje desde allí.';
    window.location.href = url;
  });
}
