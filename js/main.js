// Main JavaScript for Luxury Store

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initHeroSlider();
  initFilterButtons();
  initQuantitySelectors();
  initSmoothScroll();
  initLazyLoading();
});

function initMobileNav() {
  const openBtn = document.getElementById('mobile-open');
  const closeBtn = document.getElementById('mobile-close');
  const nav = document.getElementById('mobile-nav');
  if (!openBtn || !closeBtn || !nav) return;

  openBtn.addEventListener('click', () => nav.classList.add('open'));
  closeBtn.addEventListener('click', () => nav.classList.remove('open'));

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== openBtn) {
      nav.classList.remove('open');
    }
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let interval;

  function goTo(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index]?.classList.add('active');
    current = index;
  }

  function next() { goTo((current + 1) % slides.length); }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); resetInterval(); });
  });

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(next, 5000);
  }

  interval = setInterval(next, 5000);
  goTo(0);
}

function initFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards = document.querySelectorAll('.product-card');
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initQuantitySelectors() {
  document.querySelectorAll('.qty-selector').forEach(selector => {
    const minus = selector.querySelector('button:first-child');
    const plus = selector.querySelector('button:last-child');
    const input = selector.querySelector('input');

    if (minus && input) {
      minus.addEventListener('click', () => {
        const val = parseInt(input.value) || 1;
        if (val > 1) input.value = val - 1;
        input.dispatchEvent(new Event('change'));
      });
    }
    if (plus && input) {
      plus.addEventListener('click', () => {
        const val = parseInt(input.value) || 1;
        input.value = val + 1;
        input.dispatchEvent(new Event('change'));
      });
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  }
}

function formatPrice(amount) {
  return 'Rs. ' + Number(amount).toLocaleString('en-PK');
}

function formatPriceShort(amount) {
  if (amount >= 10000000) return 'Rs. ' + (amount / 10000000).toFixed(1) + ' Cr';
  if (amount >= 100000) return 'Rs. ' + (amount / 100000).toFixed(1) + ' Lac';
  return 'Rs. ' + Number(amount).toLocaleString('en-PK');
}

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id')) || 1;
}

async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    return await res.json();
  } catch {
    return [];
  }
}

async function loadProduct(id) {
  try {
    const res = await fetch(`/api/products/${id}`);
    return await res.json();
  } catch {
    return null;
  }
}

async function loadReviews(productId) {
  try {
    const res = await fetch(`/api/reviews/${productId}`);
    return await res.json();
  } catch {
    return [];
  }
}

function initSalePopup() {
  fetch('/api/admin/sale-popup')
    .then(r => r.json())
    .then(data => {
      if (!data.enabled || !data.text) return;
      setTimeout(() => {
        if (document.getElementById('sale-popup')) return;

        const popup = document.createElement('div');
        popup.id = 'sale-popup';
        popup.className = 'sale-popup';
        popup.innerHTML = `
          <div class="sale-popup-badge blink">NEW</div>
          <div class="sale-popup-content">
            <div class="sale-popup-text">${data.text}</div>
          </div>
          <button class="sale-popup-close">&times;</button>
        `;

        popup.querySelector('.sale-popup-close').addEventListener('click', () => {
          popup.remove();
        });

        document.body.appendChild(popup);
      }, 5000);
    })
    .catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
  initSalePopup();
});
