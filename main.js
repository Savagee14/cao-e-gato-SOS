/* ==========================================================================
   Main JavaScript Application
   S.O.S CÃO — Dr. Walter Tavares da Silva
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'ri-close-line';
        } else {
          icon.className = 'ri-menu-line';
        }
      }
    });

    // Close nav when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'ri-menu-line';
      });
    });
  }

  // Header Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 10px 30px rgba(0, 79, 57, 0.12)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));

        // If clicked item wasn't active, open it
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Animated Counters for Stats
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      let count = 0;
      const speed = target / 40;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.innerText = '+' + Math.ceil(count).toLocaleString('pt-BR');
          setTimeout(updateCount, 30);
        } else {
          stat.innerText = target === 10000 ? '+10 mil' : '+' + target.toLocaleString('pt-BR');
        }
      };
      updateCount();
    });
  };

  // Trigger counters on scroll into view
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animateCounters();
          animated = true;
        }
      });
    }, { threshold: 0.5 });

    observer.observe(heroSection);
  }
});

// Lightbox Modal Functions
function openModal(imgSrc, captionText) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');

  if (modal && modalImg && modalCaption) {
    modalImg.src = imgSrc;
    modalCaption.innerText = captionText;
    modal.classList.add('active');
  }
}

function closeModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal when clicking background overlay
document.addEventListener('click', (e) => {
  const modal = document.getElementById('imageModal');
  if (e.target === modal) {
    closeModal();
  }
});

// YouTube Interactive Player Handler
function playVideo(container, videoId) {
  if (container.classList.contains('playing')) return;

  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
  iframe.setAttribute('title', 'YouTube video player');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
  iframe.setAttribute('allowfullscreen', 'true');
  iframe.className = 'video-iframe';

  container.innerHTML = '';
  container.appendChild(iframe);
  container.classList.add('playing');
}

