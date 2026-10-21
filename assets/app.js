/**
 * ==============================================================================
 * INKTRΛIL — Website Core Client Interactions
 * ==============================================================================
 * Handles:
 * 1. Mobile menu toggle & accessible ARIA attributes
 * 2. Visual Discovery Gallery / Carousel with touch, keyboard, & dot controls
 * 3. FAQ interactive accordion
 * 4. Content hydration from window.INKTRAIL_CONTENT (if updated)
 * 5. Smooth scroll & accessible focus management
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initGallerySlider();
  initFaqAccordion();
  hydrateContent();
});

/**
 * 1. Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    const label = isOpen ? 'Close navigation menu' : 'Open navigation menu';
    toggle.setAttribute('aria-label', label);
  });

  // Close menu on link click (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close menu on click outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });

  // Reset on window resize across breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * 2. Visual Discovery Carousel / Slider
 */
function initGallerySlider() {
  const slider = document.querySelector('.gallery-slider');
  if (!slider) return;

  const track = slider.querySelector('.gallery-track');
  const slides = slider.querySelectorAll('.gallery-slide');
  const prevBtn = slider.querySelector('.gallery-prev');
  const nextBtn = slider.querySelector('.gallery-next');
  const dotsContainer = slider.querySelector('.gallery-dots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Create dot indicators if container exists
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `gallery-dot ${idx === 0 ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;

    // Update active class
    slides.forEach((slide, idx) => {
      slide.classList.toggle('is-active', idx === currentIndex);
      slide.setAttribute('aria-hidden', idx === currentIndex ? 'false' : 'true');
    });

    // Update dots
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.gallery-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('is-active', idx === currentIndex);
      });
    }
  }

  function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlider();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  // Keyboard navigation
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      goToSlide(currentIndex + 1);
    }
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToSlide(currentIndex - 1); // Swiped right
      } else {
        goToSlide(currentIndex + 1); // Swiped left
      }
    }
  }

  // Auto-play (optional, paused on user hover/focus)
  let autoplayTimer = null;
  function startAutoplay() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', startAutoplay);

  startAutoplay();
}

/**
 * 3. FAQ Accordion
 */
function initFaqAccordion() {
  const cards = document.querySelectorAll('.faq-card');
  cards.forEach(card => {
    const question = card.querySelector('.faq-question');
    const answer = card.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.setAttribute('tabindex', '0');
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');

    const toggle = () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      question.setAttribute('aria-expanded', !isExpanded);
      card.classList.toggle('is-open', !isExpanded);
    };

    question.addEventListener('click', toggle);
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}

/**
 * 4. Content Hydration from window.INKTRAIL_CONTENT
 * Allows non-technical clients to edit assets/content.js and have changes reflected
 */
function hydrateContent() {
  if (!window.INKTRAIL_CONTENT) return;
  const c = window.INKTRAIL_CONTENT;

  // Sync social URLs
  if (c.social) {
    document.querySelectorAll('[data-content="social-instagram"]').forEach(el => el.href = c.social.instagram);
    document.querySelectorAll('[data-content="social-tiktok"]').forEach(el => el.href = c.social.tiktok);
    document.querySelectorAll('[data-content="social-whatsapp"]').forEach(el => el.href = c.social.whatsapp);
  }

  // Sync primary CTAs
  if (c.primaryButtons) {
    document.querySelectorAll('[data-content="cta-find-artist"]').forEach(el => {
      if (c.primaryButtons.findArtist.url) el.href = c.primaryButtons.findArtist.url;
      if (c.primaryButtons.findArtist.label) el.textContent = c.primaryButtons.findArtist.label;
    });
    document.querySelectorAll('[data-content="cta-create-profile"]').forEach(el => {
      if (c.primaryButtons.createProfile.url) el.href = c.primaryButtons.createProfile.url;
      if (c.primaryButtons.createProfile.label) el.textContent = c.primaryButtons.createProfile.label;
    });
    document.querySelectorAll('[data-content="cta-download-app"]').forEach(el => {
      if (c.primaryButtons.downloadApp.url) el.href = c.primaryButtons.downloadApp.url;
      if (c.primaryButtons.downloadApp.label) el.textContent = c.primaryButtons.downloadApp.label;
    });
  }
}
