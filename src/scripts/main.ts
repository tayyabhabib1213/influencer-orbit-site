import { SITE } from '../data/site';
// Influencer Orbit: small progressive enhancements. The site works without this file.

// Sticky header shadow + mobile sticky CTA
const header = document.querySelector<HTMLElement>('[data-header]');
const sticky = document.querySelector<HTMLElement>('[data-sticky-cta]');
const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 8);
  if (sticky) {
    const nearBottom = window.innerHeight + y > document.body.scrollHeight - 700;
    sticky.classList.toggle('is-visible', y > 640 && !nearBottom);
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile menu
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileNav = document.getElementById('mobile-nav');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  mobileNav?.classList.toggle('is-open', !open);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav?.classList.remove('is-open');
    toggle.focus();
  }
});

// Reveal on scroll (CSS skips the animation when reduced motion is requested)
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -60px 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-in'));
}

// Keep the Esther Formula month count current between builds
const now = new Date();
const months = (now.getFullYear() - 2024) * 12 + now.getMonth() + 1;
document.querySelectorAll('[data-months]').forEach((el) => { el.textContent = String(months); });

// CTA click tracking (fires only if GA4 / Meta / LinkedIn are configured)
declare global { interface Window { gtag?: (...a: unknown[]) => void; fbq?: (...a: unknown[]) => void } }
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest<HTMLElement>('[data-cta]');
  if (!a) return;
  const where = a.dataset.cta;
  window.gtag?.('event', 'cta_click', { cta_location: where, link_url: (a as HTMLAnchorElement).href });
  if (a.getAttribute('href')?.startsWith('/book')) window.fbq?.('trackCustom', 'BookCallClick', { where });
});

// Forms: post to the lead handler without leaving the page, then show the thank-you panel.
// If the handler can't be reached, hand the details to the visitor's email app so no lead is lost.
const loadedAt = Date.now();
document.querySelectorAll<HTMLInputElement>('form[data-form] input[name="ts"]').forEach((i) => { i.value = String(loadedAt); });
const mailFallback = (form: HTMLFormElement, success: HTMLElement | null) => {
  const mail = SITE.email;
  const lines: string[] = [];
  new FormData(form).forEach((v, k) => {
    const m = k.match(/^fields\[(.+)\]$/);
    if (m && String(v).trim()) lines.push(`${m[1].replace(/_/g, ' ')}: ${v}`);
  });
  const subject = form.dataset.form === 'audit' ? 'Competitor Creator Audit request' : form.dataset.form === 'playbook' ? 'Playbook request' : form.dataset.form === 'newsletter' ? 'Newsletter signup' : 'Website enquiry';
  if (success) success.innerHTML = `<h3>Almost done.</h3><p>Your email app should open with your details filled in. Press send and we’ll reply within one business day. If nothing opened, email <a href="mailto:${mail}">${mail}</a>.</p>`;
  window.location.href = `mailto:${mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
};
document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const success = document.getElementById(form.dataset.success || '');
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const label = button?.innerHTML || '';
    const done = () => { form.hidden = true; success?.classList.add('is-visible'); success?.focus(); };
    if (button) { button.disabled = true; button.textContent = 'Sending…'; }
    const action = form.getAttribute('action') || '';
    let ok = false;
    let message = '';
    if (action && !action.startsWith('[')) {
      try {
        const res = await fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        const data = await res.json().catch(() => ({}));
        ok = res.ok && data.ok !== false;
        if (res.status === 422) message = data.message || '';
      } catch { ok = false; }
    }
    if (message) { // validation problem the visitor can fix
      if (button) { button.disabled = false; button.innerHTML = label; }
      alertBox(form, message);
      return;
    }
    if (ok) {
      window.gtag?.('event', 'generate_lead', { form: form.dataset.form });
      window.fbq?.('track', 'Lead', { form: form.dataset.form });
      done();
    } else {
      done();
      mailFallback(form, success);
    }
  });
});
function alertBox(form: HTMLFormElement, text: string) {
  let box = form.querySelector<HTMLElement>('.form-error');
  if (!box) { box = document.createElement('p'); box.className = 'form-error'; box.setAttribute('role', 'alert'); form.prepend(box); }
  box.textContent = text;
}

// Calendly: load the widget only on the booking page, only when it is near the viewport.
const cal = document.querySelector<HTMLElement>('.calendly-inline-widget');
if (cal) {
  const load = () => {
    const s = document.createElement('script');
    s.src = 'https://assets.calendly.com/assets/external/widget.js';
    s.async = true;
    document.head.appendChild(s);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { load(); io.disconnect(); } }, { rootMargin: '400px' });
    io.observe(cal);
  } else load();
}

export {};
