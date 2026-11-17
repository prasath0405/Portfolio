/**
 * B. K. Hariprasath — Full-Stack & MERN Developer
 * Separate JavaScript File: script-2.js
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================
  // 1. THEME TOGGLE (LIGHT / DARK)
  // ==========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check stored theme or default to system
  const savedTheme = localStorage.getItem('hariprasath_portfolio_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('hariprasath_portfolio_theme', newTheme);
    });
  }

  // ==========================================
  // 2. COIMBATORE / INDIA REAL-TIME CLOCK (IST)
  // ==========================================
  const indiaTimeEl = document.getElementById('indiaTime');
  function updateIndiaTime() {
    if (!indiaTimeEl) return;
    try {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      indiaTimeEl.textContent = formatter.format(new Date());
    } catch (e) {
      const now = new Date();
      indiaTimeEl.textContent = now.toTimeString().split(' ')[0];
    }
  }
  updateIndiaTime();
  setInterval(updateIndiaTime, 1000);

  // ==========================================
  // 3. INTERACTIVE CUSTOM CURSOR
  // ==========================================
  const cursorFollower = document.querySelector('.cursor-follower');
  const cursorDot = document.querySelector('.cursor-dot');

  if (cursorFollower && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let posX = mouseX;
    let posY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateCursor() {
      posX += (mouseX - posX) * 0.18;
      posY += (mouseY - posY) * 0.18;
      cursorFollower.style.transform = `translate(${posX}px, ${posY}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, .hero-sphere-cta, .project-card, .skill-card, input, textarea, .client-brand-chip, .client-card-link');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorFollower.classList.add('cursor-grow'));
      el.addEventListener('mouseleave', () => cursorFollower.classList.remove('cursor-grow'));
    });
  }

  // ==========================================
  // CLIENT DIRECTORY SEARCH & FILTER (34 SITES)
  // ==========================================
  const clientSearchInput = document.getElementById('clientSearchInput');
  const clientDirectoryCards = document.querySelectorAll('.client-card-link');
  const clientCountBadge = document.getElementById('clientCountBadge');
  const clientFilterPills = document.querySelectorAll('[data-client-filter]');

  let activeClientFilter = 'all';
  let clientSearchQuery = '';

  function filterClientDirectory() {
    if (!clientDirectoryCards.length) return;
    let visibleCount = 0;

    clientDirectoryCards.forEach(card => {
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const type = (card.getAttribute('data-type') || '').toLowerCase();
      const url = (card.getAttribute('href') || '').toLowerCase();

      const matchesFilter = activeClientFilter === 'all' || type.includes(activeClientFilter.toLowerCase());
      const matchesSearch = !clientSearchQuery || name.includes(clientSearchQuery) || type.includes(clientSearchQuery) || url.includes(clientSearchQuery);

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (clientCountBadge) {
      clientCountBadge.textContent = `${visibleCount} of ${clientDirectoryCards.length} Projects`;
    }
  }

  if (clientSearchInput) {
    clientSearchInput.addEventListener('input', (e) => {
      clientSearchQuery = e.target.value.trim().toLowerCase();
      filterClientDirectory();
    });
  }

  clientFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      clientFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeClientFilter = pill.getAttribute('data-client-filter');
      filterClientDirectory();
    });
  });

  // ==========================================
  // 4. MOBILE MENU TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ==========================================
  // 5. SCROLL NAVIGATION SPY
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ==========================================
  // 6. ANIMATED SKILL BARS
  // ==========================================
  const skillBars = document.querySelectorAll('.skill-bar-inner');
  if ('IntersectionObserver' in window && skillBars.length > 0) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-skill-level');
          bar.style.width = targetWidth;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  } else {
    skillBars.forEach(bar => {
      bar.style.width = bar.getAttribute('data-skill-level');
    });
  }

  // ==========================================
  // 7. ANIMATED STAT COUNTERS
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetEl = entry.target;
          const targetVal = parseFloat(targetEl.getAttribute('data-target'));
          const prefix = targetEl.getAttribute('data-prefix') || '';
          const suffix = targetEl.getAttribute('data-suffix') || '';
          let current = 0;
          const duration = 1400;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = targetVal / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= targetVal) {
              current = targetVal;
              clearInterval(timer);
            }
            targetEl.innerHTML = `${prefix}${Math.round(current)}<span>${suffix}</span>`;
          }, stepTime);

          observer.unobserve(targetEl);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));
  }

  // ==========================================
  // 8. PROJECT FILTERING
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'grid';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 9. CASE STUDY MODAL DETAILS (HUMANIZED & TECHNICALLY PRECISE)
  // ==========================================
  const caseStudies = {
    p1: {
      title: 'Stylx · Multi-Vendor Salon Management SaaS',
      code: '2024 · SaaS Platform',
      img: './img/business.png',
      summary: 'A salon operations platform built for shop owners and independent stylists, featuring appointment scheduling and segregated vendor portals.',
      role: 'Full-Stack Developer (SmartXoft)',
      duration: '6 Months',
      outcome: 'Multi-vendor authentication with role-based access control (RBAC)',
      content: `
        <h4>What we set out to solve</h4>
        <p>Salons with independent stylists needed their own private logins to manage client lists and appointments, while the salon owner needed an overview of all chairs, earnings, and calendars without data overlapping.</p>
        
        <h4>How I built it</h4>
        <p>I built the interface using <strong>React</strong> and <strong>Context API</strong> for managing view state. On the backend, I wrote <strong>RESTful APIs</strong> in <strong>Node.js</strong> and <strong>Express.js</strong> with <strong>Express middleware</strong> handling JWT session validation and role authorization. All relational appointment data and service logs are stored in <strong>MySQL</strong>.</p>
        
        <h4>What shipped</h4>
        <ul>
          <li><strong>Multi-vendor authentication with role-based access control (RBAC):</strong> Cleanly separated dashboards for owners, stylists, and clients.</li>
          <li><strong>Real-time scheduling calendar:</strong> Direct booking calendar that eliminates double-booking conflicts.</li>
          <li><strong>Service & staff management:</strong> Quick controls for modifying service durations, rates, and working hours.</li>
        </ul>
      `
    },
    p2: {
      title: 'QuickBasket · Zone-Based Delivery Commerce',
      code: '2023 · Delivery E-Commerce',
      img: './img/realestate.png',
      summary: 'A localized grocery and essentials platform where product availability and delivery fees adapt to the customer’s postal zone.',
      role: 'Frontend & API Integration Developer',
      duration: '5 Months',
      outcome: 'Geofenced catalog filtering & under 2-second initial page loads',
      liveUrl: 'https://quickbasket.sitedemo.pro/',
      content: `
        <h4>What we set out to solve</h4>
        <p>Because goods were fulfilled by local warehouse hubs, customers couldn't be shown items that weren't in stock within their specific neighborhood radius. Delivery charges also had to calculate automatically based on distance.</p>
        
        <h4>How I built it</h4>
        <p>I crafted responsive mobile and desktop views using <strong>React</strong> and <strong>AJAX & Fetch API</strong>. Connected these to <strong>Node.js</strong> and <strong>Express.js</strong> endpoints with spatial queries in <strong>MySQL</strong>. I also implemented frontend client-side caching for neighborhood lookup to make repeat visits instantaneous.</p>
        
        <h4>What shipped</h4>
        <ul>
          <li><strong>Geofenced product discovery:</strong> Shoppers see only what is available in their delivery zone.</li>
          <li><strong>Friction-free mobile checkout:</strong> Streamlined 2-step ordering flow optimized for one-thumb mobile browsing.</li>
          <li><strong>Live working prototype:</strong> Currently accessible at the live demonstration link.</li>
        </ul>
      `
    },
    p3: {
      title: 'Full-Stack React E-Commerce Application',
      code: '2023 · MERN Stack Platform',
      img: './img/ecommerce-website.png',
      summary: 'An end-to-end e-commerce store with debounced instant search, dynamic cart calculations, and checkout integration.',
      role: 'Full-Stack MERN Developer',
      duration: '4 Months',
      outcome: 'Instant product search, responsive cart & payment gateway integration',
      content: `
        <h4>What we set out to solve</h4>
        <p>Most commercial storefronts get bogged down when filtering catalogs or modifying cart quantities on weak 4G mobile connections. The goal was to make browsing, filtering, and checkout feel instant.</p>
        
        <h4>How I built it</h4>
        <p>Structured the full MERN application using <strong>MongoDB & Mongoose</strong> for flexible product schemas, <strong>Node.js</strong> and <strong>Express.js</strong> for <strong>RESTful APIs</strong>, and <strong>React</strong> with <strong>Redux / Context API</strong> for responsive cart state. Queries are indexed to ensure sub-100ms response times.</p>
        
        <h4>What shipped</h4>
        <ul>
          <li><strong>Debounced instant search:</strong> Live filter pills and search results update as the user types without jarring screen flashes.</li>
          <li><strong>Reliable cart calculations:</strong> Taxes, discounts, and item counts synchronize smoothly across sessions.</li>
          <li><strong>Smooth 60 FPS interactions:</strong> Polished UI transitions that feel responsive on any screen size.</li>
        </ul>
      `
    },
    p4: {
      title: 'Commercial Storefronts Shipped for 34 Businesses',
      code: '2023 — Present · Production Deployments',
      img: './img/business-consult.png',
      summary: 'Production websites and storefronts delivered for 34 businesses in retail, industrial goods, healthcare, and food.',
      role: 'Full-Stack & Web Developer',
      duration: '2023 — Present',
      outcome: '34 commercial sites launched with 85+ Google Lighthouse scores',
      content: `
        <h4>Live client storefronts</h4>
        <p>Over the past 3 years, I've built and deployed 20+ projects with the team at SmartXoft, and 34 sites in total including independent freelance work. Selected live projects include:</p>
        <ul>
          <li><a href="https://almahaliyah.com/" target="_blank" rel="noreferrer" style="color:var(--accent-sun); font-weight:600;">Al Mahaliyah ↗</a> — Commercial & industrial products</li>
          <li><a href="http://thamaya.in/" target="_blank" rel="noreferrer" style="color:var(--accent-sun); font-weight:600;">Thamaya ↗</a> — Retail & brand website</li>
          <li><a href="https://bharatmart.co.ao/frontend" target="_blank" rel="noreferrer" style="color:var(--accent-sun); font-weight:600;">Bharatmart ↗</a> — International retail portal</li>
          <li><a href="http://vimmies.in/" target="_blank" rel="noreferrer" style="color:var(--accent-sun); font-weight:600;">Vimmies ↗</a> — Modern retail e-commerce</li>
          <li><a href="https://salzandhalz.com/" target="_blank" rel="noreferrer" style="color:var(--accent-sun); font-weight:600;">Salz & Halz ↗</a> — Food & culinary brand</li>
        </ul>
        
        <h4>Engineering and hosting</h4>
        <p>Configured asset compression, tuned Core Web Vitals, and deployed sites onto <strong>AWS EC2</strong>, <strong>Linux VPS</strong>, and <strong>Cloudflare</strong> with proper <strong>SSL/TLS & DNS</strong> setup.</p>
      `
    }
  };

  const caseModalBackdrop = document.getElementById('caseModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDynamicContent = document.getElementById('modalDynamicContent');

  function openCaseStudy(projectId) {
    const project = caseStudies[projectId];
    if (!project || !caseModalBackdrop || !modalDynamicContent) return;

    let demoButton = '';
    if (project.liveUrl) {
      demoButton = `
        <a href="${project.liveUrl}" target="_blank" rel="noreferrer" class="filter-btn active" style="margin-left: 0.5rem; display: inline-flex; align-items: center; gap: 0.35rem;">
          <span>Visit Live Demo</span> ↗
        </a>
      `;
    }

    modalDynamicContent.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="mono-tag">${project.code}</span>
        <h2 style="font-family: var(--font-display); font-size: 1.85rem; font-weight: 800; margin-top: 0.5rem; line-height: 1.2;">${project.title}</h2>
        <p style="color: var(--text-muted); font-size: 1rem; margin-top: 0.5rem;">${project.summary}</p>
      </div>

      <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.75rem; aspect-ratio: 16/9; background: var(--bg-tertiary);">
        <img src="${project.img}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='./img/business.png'" />
      </div>

      <div class="project-specs-grid" style="margin-bottom: 1.5rem;">
        <div>
          <div class="spec-cell-label">Role</div>
          <div class="spec-cell-val">${project.role}</div>
        </div>
        <div>
          <div class="spec-cell-label">Timeline</div>
          <div class="spec-cell-val">${project.duration}</div>
        </div>
        <div>
          <div class="spec-cell-label">Key Result</div>
          <div class="spec-cell-val spec-outcome">${project.outcome}</div>
        </div>
      </div>

      <div class="modal-case-body" style="color: var(--text-main); line-height: 1.7; font-size: 0.95rem;">
        ${project.content}
      </div>

      <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>${demoButton}</div>
        <a href="#contact" class="project-cta-btn" onclick="document.getElementById('caseModalBackdrop').classList.remove('active')">
          Discuss This Project With Hariprasath &rarr;
        </a>
      </div>
    `;

    caseModalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudy() {
    if (!caseModalBackdrop) return;
    caseModalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-case-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-case-trigger');
      openCaseStudy(projId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeCaseStudy);
  }

  if (caseModalBackdrop) {
    caseModalBackdrop.addEventListener('click', (e) => {
      if (e.target === caseModalBackdrop) closeCaseStudy();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && caseModalBackdrop && caseModalBackdrop.classList.contains('active')) {
      closeCaseStudy();
    }
  });

  // ==========================================
  // 10. QUICK COPY EMAIL BUTTON
  // ==========================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'prasathfullstackdeveloper@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Copied!';
        copyEmailBtn.style.background = 'var(--accent-forest)';
        copyEmailBtn.style.color = '#FFFFFF';
        
        showToast('Email address copied to clipboard: ' + email);

        setTimeout(() => {
          copyEmailBtn.textContent = originalText;
          copyEmailBtn.style.background = '';
          copyEmailBtn.style.color = '';
        }, 2500);
      } catch (err) {
        showToast('Direct contact: ' + email);
      }
    });
  }

  // ==========================================
  // 11. CONTACT FORM HANDLING
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const toastMsg = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');

  function showToast(message) {
    if (!toastMsg || !toastText) return;
    toastText.textContent = message;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 4500);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('formName');
      const emailInput = document.getElementById('formEmail');
      const messageInput = document.getElementById('formMessage');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please fill in your name, email, and project message.');
        return;
      }

      const name = encodeURIComponent(nameInput.value.trim());
      const email = encodeURIComponent(emailInput.value.trim());
      const message = encodeURIComponent(messageInput.value.trim());

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = 'Sent!';
        submitBtn.style.background = 'var(--accent-forest)';
        submitBtn.style.color = '#FFFFFF';

        showToast(`Opening your email client to send message to Hariprasath...`);

        window.location.href = `mailto:prasathfullstackdeveloper@gmail.com?subject=Project Inquiry from ${name}&body=From: ${name} (${email})%0D%0A%0D%0A${message}`;

        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }, 3000);
      }, 700);
    });
  }

});
