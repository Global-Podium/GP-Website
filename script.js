// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// Contact 
const whatsappBtn = document.getElementById('whatsappBtn');
const mailBtn = document.getElementById('mailBtn');

function buildContactMessage() {
  const fname = document.getElementById('fname')?.value.trim() || '';
  const lname = document.getElementById('lname')?.value.trim() || '';
  const email = document.getElementById('email')?.value.trim() || '';
  const city = document.getElementById('city')?.value.trim() || '';
  const reason = document.getElementById('reason')?.value || '';
  const message = document.getElementById('message')?.value.trim() || '';

  let text = `Hi Global Podium, I'm ${fname} ${lname}`;
  if (city) text += ` from ${city}`;
  text += `.\nI'm reaching out about: ${reason}.`;
  if (email) text += `\nMy email: ${email}`;
  if (message) text += `\n\n${message}`;
  return text;
}

if (whatsappBtn) {
  whatsappBtn.addEventListener('click', () => {
    const text = encodeURIComponent(buildContactMessage());
    window.open(`https://wa.me/917014917844?text=${text}`, '_blank');
  });
}

if (mailBtn) {
  mailBtn.addEventListener('click', () => {
    const reason = document.getElementById('reason')?.value || 'Getting in touch';
    const body = encodeURIComponent(buildContactMessage());
    window.location.href = `mailto:globalpodiumllp@gmail.com?subject=${encodeURIComponent(reason)}&body=${body}`;
  });
}


// Past events carousel (events.html only — safely does nothing on other pages)
const eventCarousel = document.getElementById('eventCarousel');
if (eventCarousel) {
  const ecSlides = eventCarousel.querySelectorAll('.ec-slide');
  const ecDotsWrap = document.getElementById('ecDots');
  const ecPrev = eventCarousel.querySelector('.ec-prev');
  const ecNext = eventCarousel.querySelector('.ec-next');
  let ecCurrent = 0;

  ecSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'ec-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to event ' + (i + 1));
    dot.addEventListener('click', () => ecGoTo(i));
    ecDotsWrap.appendChild(dot);
  });
  const ecDots = ecDotsWrap.querySelectorAll('.ec-dot');

  function ecGoTo(index) {
    ecSlides[ecCurrent].classList.remove('active');
    ecDots[ecCurrent].classList.remove('active');
    ecCurrent = (index + ecSlides.length) % ecSlides.length;
    ecSlides[ecCurrent].classList.add('active');
    ecDots[ecCurrent].classList.add('active');
  }

  ecPrev.addEventListener('click', () => ecGoTo(ecCurrent - 1));
  ecNext.addEventListener('click', () => ecGoTo(ecCurrent + 1));
}