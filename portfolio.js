/**
 * ============================================================================
 * PORTFOLIO MOTION SYSTEM — MOTIONSITES.AI REFERENCE
 * GSAP 3 + ScrollTrigger Interactive Engine
 * Author: B. K. Hariprasath — Full-Stack & MERN Developer
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------------------------------------------
    // 1. DATA: 34 VERIFIED PRODUCTION CLIENT PROJECTS
    // -------------------------------------------------------------------------
    const clientProjects = [
        ["Aristocratic Elevators", "http://aristocraticelevators.com/", "Client website"],
        ["Ajandhaa Foods", "https://www.ajandhaafoods.com/", "Client website"],
        ["Anneo Biotech", "https://anneobiotech.com/", "Client website"],
        ["Dosil", "https://dosil.in", "Client website"],
        ["Edge Studios", "https://edgestudios.in/", "Client website"],
        ["Kadal Kitchen", "https://kadalkitchen.in/", "Frontend"],
        ["Sri Chemicals", "http://srichemicals.com/", "Client website"],
        ["Ganesh Ceramic", "https://ganeshceramic.in/", "Client website"],
        ["Marine Trans", "https://www.marinetrans.net.in/", "Client website"],
        ["Harsha Eastern", "http://harshaeastern.com/", "Client website"],
        ["SA Marine", "http://sammarine.co.in/", "Client website"],
        ["Salz & Halz", "https://salzandhalz.com/", "Client website"],
        ["Hireona India", "https://hireonaindia.com/frontend", "Frontend"],
        ["Image Icon", "https://imageicon.in/", "Client website"],
        ["iTech Steri", "https://itechsteri.com/", "Client website"],
        ["StrainSyn", "https://strainsyn.com/", "Client website"],
        ["Power Express", "https://powerexpress.com.sg/", "Client website"],
        ["QuickBasket", "https://quickbasket.sitedemo.pro/", "Delivery app"],
        ["Rexcellynk", "https://www.rexcellynk.com/", "Client website"],
        ["RKVSS", "https://rkvss.in/", "Client website"],
        ["RKG Ghee", "https://www.rkgghee.com/", "Client website"],
        ["Senthil Hospital", "http://senthilhospital.live/", "Client website"],
        ["SmartXoft", "http://smartxoft.com/", "Client website"],
        ["SVAIR System", "http://svairsystem.in/", "Client website"],
        ["Vimmies", "http://vimmies.in/", "Client website"],
        ["Nadia Pharmacy", "http://nadiapharmacy.com.my/", "Client website"],
        ["MyTopTouch", "https://www.mytoptouch.com/", "Client website"],
        ["Global Forms Engineering", "http://globalformsengineering.in/", "Client website"],
        ["Al Mahaliyah", "https://almahaliyah.com/", "Client website"],
        ["M2 Thirumanamalai", "http://m2thirumanamalai.com/", "Client website"],
        ["Sublime Structures", "https://sublimestructures.com/", "Client website"],
        ["Thamaya", "http://thamaya.in/", "Client website"],
        ["Bharatmart", "https://bharatmart.co.ao/frontend", "Frontend"],
        ["Lajix", "https://lajix.com/newwin", "Client website"]
    ];

    // -------------------------------------------------------------------------
    // 2. CLIENT GRID POPULATION & SEARCH/FILTER ENGINE
    // -------------------------------------------------------------------------
    const clientGrid = document.querySelector("#client-project-grid");
    const searchInput = document.querySelector("#clientSearchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const countBadge = document.querySelector("#clientCountBadge");

    // Hover Preview Tooltip Element
    const preview = document.createElement("div");
    preview.className = "client-hover-preview";
    preview.setAttribute("aria-hidden", "true");
    preview.innerHTML = `
        <img class="client-preview-image" alt="Website preview">
        <div class="client-preview-fallback"><span class="client-preview-initial"></span></div>
    `;
    document.body.appendChild(preview);

    const previewImage = preview.querySelector(".client-preview-image");
    const previewInitial = preview.querySelector(".client-preview-initial");

    previewImage.addEventListener("load", () => preview.classList.add("has-image"));
    previewImage.addEventListener("error", () => preview.classList.remove("has-image"));

    let currentFilter = "all";
    let searchQuery = "";

    function renderClientProjects() {
        if (!clientGrid) return;
        clientGrid.innerHTML = "";

        const filtered = clientProjects.filter(([name, url, type]) => {
            const matchesCategory = currentFilter === "all" || type.toLowerCase() === currentFilter.toLowerCase();
            const matchesSearch = !searchQuery || 
                name.toLowerCase().includes(searchQuery) || 
                url.toLowerCase().includes(searchQuery) || 
                type.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });

        if (countBadge) {
            countBadge.textContent = `${filtered.length} of ${clientProjects.length} Projects`;
        }

        if (filtered.length === 0) {
            clientGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted); font-size: 14px;">
                    No projects found matching "${searchQuery}".
                </div>
            `;
            return;
        }

        filtered.forEach(([name, url, type], index) => {
            const project = document.createElement("a");
            project.className = "client-project";
            project.href = url;
            project.target = "_blank";
            project.rel = "noreferrer";
            project.setAttribute("aria-label", `Visit ${name} (${type}), opens in a new tab`);
            project.innerHTML = `
                <div class="client-project-left">
                    <span class="client-index">${String(index + 1).padStart(2, "0")}</span>
                    <span class="client-name">${name}</span>
                </div>
                <div class="client-project-right">
                    <span class="client-type">${type}</span>
                    <span class="client-arrow" aria-hidden="true">↗</span>
                </div>
            `;

            // Hover preview handler
            const showPreview = (x, y) => {
                if (window.matchMedia("(hover: none), (max-width: 900px)").matches) return;

                previewInitial.textContent = name.charAt(0);
                preview.classList.add("is-visible");

                const halfW = 140;
                const halfH = 90;
                const targetX = x + 30;
                const targetY = y - 40;

                const maxX = window.innerWidth - 290;
                const maxY = window.innerHeight - 200;

                const left = Math.max(20, Math.min(targetX, maxX));
                const top = Math.max(20, Math.min(targetY, maxY));

                preview.style.left = `${left}px`;
                preview.style.top = `${top}px`;

                if (previewImage.dataset.previewFor !== url) {
                    previewImage.dataset.previewFor = url;
                    preview.classList.remove("has-image");
                    previewImage.src = `https://image.thum.io/get/width/700/crop/400/noanimate/${url}`;
                }
            };

            project.addEventListener("pointerenter", (e) => showPreview(e.clientX, e.clientY));
            project.addEventListener("pointermove", (e) => showPreview(e.clientX, e.clientY));
            project.addEventListener("pointerleave", () => preview.classList.remove("is-visible"));

            clientGrid.appendChild(project);
        });

        // Trigger entrance animation for new items if GSAP is available
        if (window.gsap) {
            gsap.from(".client-project", {
                opacity: 0,
                y: 15,
                duration: 0.35,
                stagger: 0.03,
                ease: "power2.out"
            });
        }
    }

    renderClientProjects();

    // Search input listener
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            renderClientProjects();
        });
    }

    // Category filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentFilter = btn.dataset.filter;
            renderClientProjects();
        });
    });

    // -------------------------------------------------------------------------
    // 3. CUSTOM INTERACTIVE CURSOR (MOTIONSITES SIGNATURE)
    // -------------------------------------------------------------------------
    const cursorDot = document.querySelector("#cursorDot");
    const cursorRing = document.querySelector("#cursorRing");

    if (cursorDot && cursorRing && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        const setCursorDotX = gsap.quickTo(cursorDot, "x", { duration: 0.05, ease: "power3" });
        const setCursorDotY = gsap.quickTo(cursorDot, "y", { duration: 0.05, ease: "power3" });

        const setCursorRingX = gsap.quickTo(cursorRing, "x", { duration: 0.18, ease: "power3" });
        const setCursorRingY = gsap.quickTo(cursorRing, "y", { duration: 0.18, ease: "power3" });

        window.addEventListener("pointermove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            setCursorDotX(mouseX);
            setCursorDotY(mouseY);
            setCursorRingX(mouseX);
            setCursorRingY(mouseY);
        });

        // Hover scale on interactive elements
        const hoverTargets = "a, button, .btn, .magnetic-item, .career-stat-card, .featured-project-card, .skills-box, .highlight-card, input, textarea";
        document.addEventListener("mouseover", (e) => {
            if (e.target.closest(hoverTargets)) {
                document.body.classList.add("cursor-hover");
            }
        });

        document.addEventListener("mouseout", (e) => {
            if (e.target.closest(hoverTargets)) {
                document.body.classList.remove("cursor-hover");
            }
        });
    }

    // -------------------------------------------------------------------------
    // 4. TOP SCROLL PROGRESS BAR
    // -------------------------------------------------------------------------
    const progressBar = document.querySelector("#scrollProgressBar");
    if (progressBar) {
        window.addEventListener("scroll", () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollTotal > 0) {
                const scrollProgress = (window.scrollY / scrollTotal) * 100;
                progressBar.style.width = `${scrollProgress}%`;
            }
        }, { passive: true });
    }

    // -------------------------------------------------------------------------
    // 5. MAGNETIC BUTTONS & ITEMS (MOTIONSITES EFFECT)
    // -------------------------------------------------------------------------
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const magneticElements = document.querySelectorAll(".magnetic-btn, .magnetic-item");

        magneticElements.forEach(el => {
            el.addEventListener("mousemove", (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);

                gsap.to(el, {
                    x: x * 0.35,
                    y: y * 0.35,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            el.addEventListener("mouseleave", () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    // -------------------------------------------------------------------------
    // 6. INTERACTIVE 3D TILT ON PORTRAIT
    // -------------------------------------------------------------------------
    const portraitCard = document.querySelector("#portraitCard");
    if (portraitCard && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const portraitImg = portraitCard.querySelector(".image");

        portraitCard.addEventListener("mousemove", (e) => {
            const rect = portraitCard.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(portraitImg, {
                rotateY: x * 14,
                rotateX: -y * 14,
                transformPerspective: 1000,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        portraitCard.addEventListener("mouseleave", () => {
            gsap.to(portraitImg, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.4)"
            });
        });
    }

    // -------------------------------------------------------------------------
    // 7. CARD MOUSE SPOTLIGHT EFFECT
    // -------------------------------------------------------------------------
    const spotlightCards = document.querySelectorAll(".career-stat-card, .featured-project-card, .about-info-card");
    spotlightCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // -------------------------------------------------------------------------
    // 8. GSAP & SCROLLTRIGGER CORE SUITE
    // -------------------------------------------------------------------------
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        const motionMatch = gsap.matchMedia();

        motionMatch.add("(prefers-reduced-motion: no-preference)", () => {
            // A. Hero Entrance Timeline
            const heroTL = gsap.timeline({ defaults: { ease: "power3.out" } });

            heroTL
                .from("#header", { y: -30, opacity: 0, duration: 0.8, delay: 0.1 })
                .from(".status-pill", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
                .from(".hero-title", { y: 40, opacity: 0, duration: 0.85 }, "-=0.35")
                .from(".featured-text-card", { y: 20, opacity: 0, duration: 0.55 }, "-=0.4")
                .from(".featured-text-info > *", { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 }, "-=0.35")
                .from(".featured-text-btn .btn", { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.3")
                .from(".featured-image", { scale: 0.92, opacity: 0, duration: 0.95 }, "-=0.7")
                .from(".floating-badge", { scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.12, ease: "back.out(1.4)" }, "-=0.4")
                .from(".scroll-icon-box", { y: 15, opacity: 0, duration: 0.5 }, "-=0.3");

            // B. Continuous Floating Badges Motion
            const floatingBadges = document.querySelectorAll(".floating-badge");
            floatingBadges.forEach((badge, i) => {
                const speed = parseFloat(badge.dataset.floatSpeed) || (1.4 + i * 0.2);
                gsap.to(badge, {
                    y: "-=12",
                    duration: speed,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.3
                });
            });

            // C. SCROLL-ANIMATED STATS COUNTERS (KEY PROMPT REQUIREMENT)
            const statCards = document.querySelectorAll(".career-stat-card");

            statCards.forEach((card) => {
                const numberEl = card.querySelector(".stat-number");
                const progressFill = card.querySelector(".stat-progress-fill");
                const targetVal = parseFloat(numberEl.dataset.value);
                const prefix = numberEl.dataset.prefix || "";
                const suffix = numberEl.dataset.suffix || "";

                const counterObj = { val: 0 };

                ScrollTrigger.create({
                    trigger: card,
                    start: "top 88%",
                    once: true,
                    onEnter: () => {
                        // Card entrance
                        gsap.fromTo(card, 
                            { y: 35, opacity: 0 }, 
                            { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" }
                        );

                        // Number count-up
                        gsap.to(counterObj, {
                            val: targetVal,
                            duration: 1.8,
                            ease: "power2.out",
                            onUpdate: () => {
                                let formatted;
                                if (targetVal % 1 !== 0) {
                                    formatted = counterObj.val.toFixed(1);
                                } else if (targetVal < 10) {
                                    formatted = `${prefix}${Math.round(counterObj.val)}`;
                                } else {
                                    formatted = Math.round(counterObj.val).toString();
                                }
                                numberEl.innerHTML = `${formatted}<span>${suffix}</span>`;
                            }
                        });

                        // Progress fill animation
                        if (progressFill) {
                            const targetWidth = progressFill.style.getPropertyValue("--target-width") || "100%";
                            gsap.to(progressFill, {
                                width: targetWidth,
                                duration: 1.6,
                                ease: "power2.out"
                            });
                        }
                    }
                });
            });

            // D. Experience Timeline Line Progress Scrub
            const timelineLineProgress = document.querySelector("#timelineProgress");
            if (timelineLineProgress) {
                ScrollTrigger.create({
                    trigger: "#experience",
                    start: "top 70%",
                    end: "bottom 80%",
                    scrub: 0.5,
                    onUpdate: (self) => {
                        timelineLineProgress.style.height = `${self.progress * 100}%`;
                    }
                });
            }

            // E. General Section & Card Reveals
            const sectionHeaders = document.querySelectorAll(".top-header, .credentials-heading, .client-work-heading");
            sectionHeaders.forEach(header => {
                gsap.from(header, {
                    scrollTrigger: { trigger: header, start: "top 88%", once: true },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });
            });

            const revealElements = [
                ".about-info-card",
                ".skills-box",
                ".journey-main-card",
                ".highlight-card",
                ".credential",
                ".featured-project-card",
                ".form-container",
                ".contact-info-card"
            ];

            revealElements.forEach(selector => {
                const elements = gsap.utils.toArray(selector);
                elements.forEach((el, index) => {
                    gsap.from(el, {
                        scrollTrigger: { trigger: el, start: "top 90%", once: true },
                        y: 35,
                        opacity: 0,
                        duration: 0.75,
                        delay: (index % 2) * 0.12,
                        ease: "power3.out"
                    });
                });
            });

            // Refresh ScrollTrigger after fonts & assets load
            window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => ScrollTrigger.refresh());
            }
        });
    }

    // -------------------------------------------------------------------------
    // 9. MOBILE NAVIGATION & DRAWER TOGGLE
    // -------------------------------------------------------------------------
    const menuToggle = document.querySelector("#menuToggle");
    const navMenu = document.querySelector("#myNavMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", String(!isExpanded));
            navMenu.classList.toggle("responsive", !isExpanded);
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.className = !isExpanded ? "uil uil-multiply" : "uil uil-bars";
            }
        });

        // Close on nav link click
        navMenu.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.setAttribute("aria-expanded", "false");
                navMenu.classList.remove("responsive");
                const icon = menuToggle.querySelector("i");
                if (icon) icon.className = "uil uil-bars";
            });
        });
    }

    // -------------------------------------------------------------------------
    // 10. ACTIVE NAVIGATION LINK ON SCROLL (INTERSECTION OBSERVER)
    // -------------------------------------------------------------------------
    const navLinks = document.querySelectorAll(".nav-link");
    const trackedSections = document.querySelectorAll("section[id]");

    if ("IntersectionObserver" in window && trackedSections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navLinks.forEach(link => {
                        const isMatch = link.getAttribute("href") === `#${id}`;
                        link.classList.toggle("active-link", isMatch);
                    });
                }
            });
        }, { rootMargin: "-25% 0px -60% 0px" });

        trackedSections.forEach(sec => sectionObserver.observe(sec));
    }

    // -------------------------------------------------------------------------
    // 11. ONE-CLICK COPY TO CLIPBOARD & TOAST
    // -------------------------------------------------------------------------
    const copyEmailBtn = document.querySelector("#copyEmailBtn");
    const copyPhoneBtn = document.querySelector("#copyPhoneBtn");
    const toast = document.querySelector("#copyToast");

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2600);
    }

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", () => {
            navigator.clipboard.writeText("prasathfullstackdeveloper@gmail.com")
                .then(() => showToast("Email copied to clipboard!"))
                .catch(() => showToast("prasathfullstackdeveloper@gmail.com"));
        });
    }

    if (copyPhoneBtn) {
        copyPhoneBtn.addEventListener("click", () => {
            navigator.clipboard.writeText("+918056564031")
                .then(() => showToast("Phone number copied!"))
                .catch(() => showToast("+91 80565 64031"));
        });
    }

    // -------------------------------------------------------------------------
    // 12. INTERACTIVE CONTACT FORM SUBMISSION
    // -------------------------------------------------------------------------
    const sendButton = document.querySelector("#btn");
    const contactStatus = document.querySelector("#contactStatus, #contact-status");

    if (sendButton) {
        sendButton.addEventListener("click", (e) => {
            e.preventDefault();
            const nameInput = document.querySelector("#names_id");
            const emailInput = document.querySelector("#emails_id");
            const messageInput = document.querySelector("#message");

            const name = nameInput ? nameInput.value.trim() : "";
            const email = emailInput ? emailInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";

            if (!name || !email || !message) {
                if (contactStatus) {
                    contactStatus.innerHTML = `<span style="color: var(--accent-rose);"><i class="uil uil-exclamation-triangle"></i> Please fill in your name, email, and message.</span>`;
                }
                return;
            }

            if (emailInput && !emailInput.checkValidity()) {
                if (contactStatus) {
                    contactStatus.innerHTML = `<span style="color: var(--accent-rose);"><i class="uil uil-exclamation-triangle"></i> Please enter a valid email address.</span>`;
                }
                return;
            }

            const subject = encodeURIComponent(`Project / Hiring Inquiry from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n-- Sent via Hariprasath Portfolio`);

            if (contactStatus) {
                contactStatus.innerHTML = `<span style="color: var(--accent-emerald);"><i class="uil uil-check-circle"></i> Opening your email client to send message...</span>`;
            }

            window.location.href = `mailto:prasathfullstackdeveloper@gmail.com?subject=${subject}&body=${body}`;
        });
    }
});
