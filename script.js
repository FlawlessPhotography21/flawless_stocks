document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       0. Dynamic Gallery Loading
       ========================================== */
    const galleryData = [
        { category: "reception", image: "images/reception/30 x 20 E-2 copy 2-web.jpg", title: "Event Coverage", featured: true },
        { category: "reception", image: "images/reception/IMG_3792.JPG.jpeg", title: "Event Coverage" },
        { category: "reception", image: "images/reception/IMG_3793.JPG.jpeg", title: "Event Coverage" },
        { category: "reception", image: "images/reception/IMG_3794.JPG.jpeg", title: "Event Coverage" },
        { category: "reception", image: "images/reception/IMG_4975.JPG.jpeg", title: "Event Coverage" },
        { category: "reception", image: "images/reception/IMG_4977.JPG.jpeg", title: "Event Coverage" },
        { category: "reception", image: "images/reception/IMG_4986.JPG.jpeg", title: "Event Coverage" },
        { category: "reception", image: "images/reception/DSC07273 copy-2.jpg.jpeg", title: "Event Coverage" },
        { category: "reception", image: "images/reception/27.jpg.jpeg", title: "Event Coverage" },
        { category: "reception", image: "images/reception/33.jpg.jpeg", title: "Event Coverage" },
        { category: "wedding", image: "images/wedding/006.jpg.jpeg", title: "Wedding", featured: true },
        { category: "wedding", image: "images/wedding/IMG_4980.JPG.jpeg", title: "Event Coverage" },
        { category: "wedding", image: "images/wedding/IMG_4981.JPG.jpeg", title: "Event Coverage" },
        { category: "wedding", image: "images/wedding/IMG_4989.JPG.jpeg", title: "Event Coverage" },
        { category: "wedding", image: "images/wedding/IMG_4990.JPG.jpeg", title: "Event Coverage" },
        { category: "wedding", image: "images/wedding/IMG_4984.JPG.jpeg", title: "Event Coverage" },
        { category: "wedding", image: "images/wedding/IMG_4983.JPG.jpeg", title: "Event Coverage" },
        { category: "wedding", image: "images/wedding/001.jpg.jpeg", title: "Event Coverage" },
        { category: "wedding", image: "images/wedding/13.jpg.jpeg", title: "Event Coverage" },
        { category: "wedding", image: "images/wedding/img_4991.jpg.jpeg", title: "Event Coverage" },
        { category: "engagement", image: "images/engagement/IMG_9339.JPG.jpeg", title: "Engagement", featured: true },
        { category: "engagement", image: "images/engagement/01.jpg.jpeg", title: "Event Coverage" },
        { category: "engagement", image: "images/engagement/08.jpg.jpeg", title: "Event Coverage" },
        { category: "engagement", image: "images/engagement/09 sparkle.jpg.jpeg", title: "Event Coverage" },
        { category: "engagement", image: "images/engagement/IMG_9338.JPG.jpeg", title: "Event Coverage" },
        { category: "engagement", image: "images/engagement/31 glossy pearl.jpg.jpeg", title: "Event Coverage" },
        { category: "engagement", image: "images/engagement/IMG_8889.JPG.jpeg", title: "Event Coverage" },
        { category: "engagement", image: "images/engagement/IMG_8888.JPG.jpeg", title: "Event Coverage" },
        { category: "engagement", image: "images/engagement/IMG_5033.JPG.jpeg", title: "Event Coverage" },
        { category: "engagement", image: "images/engagement/IMG_5034.JPG.jpeg", title: "Event Coverage" }
    ];

    function loadGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        if (!galleryGrid) return;
        
        galleryGrid.innerHTML = '';
        
        galleryData.forEach(item => { 
            const dataCategory = item.category;
            const extraClass = item.featured ? ' featured' : '';
            const featuredBadge = item.featured ? '\n                            <div class="featured-badge"><i class="fa-solid fa-star"></i> Featured</div>' : '';
            const categoryLabel = item.category === 'reception' ? 'Reception' : item.category === 'wedding' ? 'Wedding' : 'Engagement';
            
            const html = `
                <div class="gallery-item ${item.category}${extraClass}" data-category="${dataCategory}">
                    <div class="gallery-img-wrapper">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <div class="gallery-overlay">${featuredBadge}
                            <h3>${item.title}</h3>
                            <span class="category-tag">${categoryLabel}</span>
                            <button class="view-btn" aria-label="View Image"><i class="fa-solid fa-expand"></i></button>
                        </div>
                    </div>
                </div>
            `;
            
            galleryGrid.insertAdjacentHTML('beforeend', html);
        });
    }

    loadGallery();

    /* ==========================================
       1. Theme Toggle (Dark/Light Mode)
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    /* ==========================================
       2. Sticky Header & Active Link Highlighting
       ========================================== */
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navLinksList = document.querySelectorAll('.nav-links a');
    const filters = document.querySelector('.gallery-filters');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
            
        }
        if (filters) {
    if (window.scrollY > 400) {
        filters.classList.add('sticky-active');
    } else {
        filters.classList.remove('sticky-active');
    }
}
        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       3. Mobile Menu Toggle
       ========================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn.querySelector('i');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        });
    });

    /* ==========================================
       4. Scroll Reveal Animations
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==========================================
       5. Portfolio Gallery Filtering & Load More
       ========================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('load-more-gallery');

    const allCategoriesSequence = ['reception', 'wedding', 'engagement'];
    let currentVisibleCategoryIndex = 0;

    function applyFilter(filterValue, isInitial = false) {
        galleryItems.forEach(item => {
            let shouldShow = false;
            
            if (filterValue === 'all') {
                const itemCategory = item.getAttribute('data-category');
                const catIndex = allCategoriesSequence.indexOf(itemCategory);
                if (catIndex !== -1 && catIndex <= currentVisibleCategoryIndex) {
                    shouldShow = true;
                }
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    shouldShow = true;
                }
            }

            if (shouldShow) {
                item.classList.remove('hide');
                item.style.display = 'block'; // Or inline-block if needed. For Masonry block is fine.
                if (isInitial) {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                }
            } else {
                if (isInitial) {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    item.style.display = 'none';
                    item.classList.add('hide');
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        if (item.style.opacity === '0') {
                            item.style.display = 'none';
                            item.classList.add('hide');
                        }
                    }, 400); // Wait for transition
                }
            }
        });

        if (loadMoreBtn) {
            if (filterValue === 'all') {
                if (currentVisibleCategoryIndex < allCategoriesSequence.length - 1) {
                    loadMoreBtn.style.display = 'inline-block';
                } else {
                    loadMoreBtn.style.display = 'none';
                }
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                currentVisibleCategoryIndex = 0;
            }

            applyFilter(filterValue);
        });
    });

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentVisibleCategoryIndex < allCategoriesSequence.length - 1) {
                currentVisibleCategoryIndex++;
                applyFilter('all');
            }
        });
    }

    // Initial filter application
    applyFilter('all', true);

    /* ==========================================
       6. Lightbox Functionality
       ========================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const viewBtns = document.querySelectorAll('.view-btn');
    const nextBtn = document.querySelector('.lightbox-next');
    const prevBtn = document.querySelector('.lightbox-prev');

    let currentIndex = 0;
    // Get visible gallery items for next/prev navigation
    let currentGalleryItems = [];

    function updateGalleryItems() {
        // Collect currently visible items based on filter
        currentGalleryItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    }

    viewBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateGalleryItems();

            // Find index of clicked item in the filtered array
            const parentItem = btn.closest('.gallery-item');
            currentIndex = currentGalleryItems.indexOf(parentItem);

            openLightbox(parentItem);
        });
    });

    function openLightbox(item) {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').innerText;

        lightboxImg.src = img.src;
        lightboxCaption.innerText = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    function navigateLightbox(direction) {
        updateGalleryItems();
        if (currentGalleryItems.length === 0) return;

        currentIndex += direction;

        if (currentIndex >= currentGalleryItems.length) {
            currentIndex = 0; // Loop back to start
        } else if (currentIndex < 0) {
            currentIndex = currentGalleryItems.length - 1; // Loop to end
        }

        const nextItem = currentGalleryItems[currentIndex];
        openLightbox(nextItem);
    }

    // Event Listeners for Lightbox Controls
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', () => navigateLightbox(1));
    prevBtn.addEventListener('click', () => navigateLightbox(-1));

    // Close on outside click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') navigateLightbox(1);
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
    });

    /* ==========================================
       7. Contact Form Handling (Firebase + WhatsApp)
       ========================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            btn.innerText = 'Processing...';
            btn.disabled = true;

            try {
                // 1. Save to Firebase Firestore (if available)
                if (window.firebaseDB && window.firebaseCollection && window.firebaseAddDoc) {
                    await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDB, "inquiries"), {
                        name: name,
                        email: email,
                        service: service,
                        message: message,
                        timestamp: new Date()
                    });
                    console.log("Inquiry saved to Firebase Firestore.");
                } else {
                    console.warn("Firebase not fully loaded yet, proceeding to WhatsApp anyway.");
                }

                // 2. Redirect to WhatsApp
                // Construct the text payload for WhatsApp
                const whatsappNumber = "919080482374";
                const waMessage = `Hi Flawless Photography! ✨\n\nI am interested in your services.\n\n*Name:* ${name}\n*Email:* ${email}\n*Service Interested in:* ${service}\n\n*Message:*\n${message}`;
                
                // Encode the message to be URL-safe
                const encodedMessage = encodeURIComponent(waMessage);
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

                // Open WhatsApp in a new tab
                window.open(whatsappUrl, '_blank');

                // 3. Update the button temporarily before resetting
                btn.innerText = 'Redirecting to WhatsApp...';
                btn.classList.add('success');
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.classList.remove('success');
                    btn.disabled = false;
                }, 3000);

            } catch (error) {
                console.error("Error processing form:", error);
                btn.innerText = 'Error! Try Again';
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 3000);
            }
        });
    }

    /* ==========================================
       8. Back to Top Button
       ========================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================
       9. Premium Infinite Pricing Carousel
       ========================================== */
    const pricingSlider = document.getElementById('pricingScroll');

    if (pricingSlider) {
        // --- Setup Infinite Loop Clones ---
        const container = document.getElementById("pricingScroll");
        const cards = document.querySelectorAll(".pricing-card");

        const sliderContentWidth = Array.from(cards).reduce((acc, card) => acc + card.offsetWidth + 30, 0); // card width + gap

        // Clone cards twice so there is always a seamless overlap
        cards.forEach(card=>{
            let clone = card.cloneNode(true);
            container.appendChild(clone);
        });
        cards.forEach(card=>{
            let clone = card.cloneNode(true);
            container.appendChild(clone);
        });

        // Initialize state variables
        let isDown = false;
        let startX;
        let scrollLeft;
        let autoSlide;
        let interactionTimeout;

        // --- Core Scrolling Functions ---
        window.scrollPricing = function (direction) {
            const container = document.getElementById("pricingScroll");
            if (!container) return;
            const cardWidth = container.querySelector(".pricing-card").offsetWidth + 30; // 30 is the gap
            
            // Seamless Teleport BEFORE smooth scrolling so we don't interrupt it
            container.style.scrollBehavior = 'auto';
            if (direction === 1 && container.scrollLeft >= sliderContentWidth) {
                container.scrollLeft -= sliderContentWidth;
            } else if (direction === -1 && container.scrollLeft <= 0) {
                container.scrollLeft += sliderContentWidth;
            }
            
            // Force reflow
            void container.offsetWidth; 

            container.style.scrollBehavior = "smooth";
            container.scrollBy({
                left: direction * cardWidth,
                behavior: "smooth"
            });
            
            // User interacted manually via buttons: pause and wait 30s
            pauseForInteraction();
        };

        const startAutoSlide = () => {
            clearInterval(autoSlide);
            autoSlide = setInterval(() => scrollPricing(1), 3000);
        };

        const pauseForInteraction = () => {
            clearInterval(autoSlide);
            clearTimeout(interactionTimeout);
            interactionTimeout = setTimeout(() => {
                startAutoSlide();
            }, 30000); // 30 seconds
        };

        // Start it initially
        startAutoSlide();

        const containerNode = document.getElementById("pricingScroll");
        if (containerNode) {
            containerNode.addEventListener("mouseenter", () => {
                clearInterval(autoSlide);
                clearTimeout(interactionTimeout);
            });

            containerNode.addEventListener("mouseleave", () => {
                pauseForInteraction(); // Start the 30-second delay when mouse leaves
            });
        }

        // --- Infinite Loop Logic (For un-triggered scrolls like touchpads) ---
        let scrollTimeout;
        pricingSlider.addEventListener('scroll', () => {
            requestAnimationFrame(updateActiveCard);
            
            // Only trigger passive seamless jumping when scrolling settles (i.e. mouse touchpad or swiping rests)
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                pricingSlider.style.scrollBehavior = 'auto';
                if (pricingSlider.scrollLeft >= sliderContentWidth * 2) {
                    pricingSlider.scrollLeft -= sliderContentWidth;
                } else if (pricingSlider.scrollLeft <= 0) {
                    pricingSlider.scrollLeft += sliderContentWidth;
                }
                pricingSlider.style.scrollBehavior = 'smooth';
            }, 150);
        });

        // --- Active Center Card Logic ---
        const updateActiveCard = () => {
            const allCards = pricingSlider.querySelectorAll('.pricing-card');
            let center = pricingSlider.scrollLeft + pricingSlider.offsetWidth / 2;

            allCards.forEach(card => {
                let cardCenter = card.offsetLeft + card.offsetWidth / 2;

                if (Math.abs(center - cardCenter) < card.offsetWidth / 2) {
                    card.classList.add("active");
                } else {
                    card.classList.remove("active");
                }
            });
        };

        // --- Drag To Scroll Events ---
        pricingSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            pricingSlider.style.cursor = 'grabbing';
            pricingSlider.style.scrollSnapType = 'none'; // Disable snap during drag
            startX = e.pageX - pricingSlider.offsetLeft;
            scrollLeft = pricingSlider.scrollLeft;
            clearInterval(autoSlide);
            clearTimeout(interactionTimeout);
        });

        pricingSlider.addEventListener('mouseup', () => {
            isDown = false;
            pricingSlider.style.cursor = 'grab';
            pricingSlider.style.scrollSnapType = 'x mandatory';
            pauseForInteraction(); // Start the 30s timer
        });

        pricingSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - pricingSlider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll-fast multiplier
            
            pricingSlider.style.scrollBehavior = 'auto'; // Disable smooth behavior for direct drag mapping
            pricingSlider.scrollLeft = scrollLeft - walk;
            pricingSlider.style.scrollBehavior = 'smooth'; 
        });

        // --- Initialization ---
        // Let fonts and layouts settle before initializing active card
        setTimeout(() => {
            updateActiveCard();
        }, 100);

        window.addEventListener('resize', () => {
            requestAnimationFrame(updateActiveCard);
        });
    }

    /* ==========================================
       11. Service Card 3D Tilt Effect
       ========================================== */
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Feature detect touch devices to disable tilt
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

    if (!isTouchDevice) {
        serviceCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // x position within the element
                const y = e.clientY - rect.top; // y position within the element
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate rotation (max tilt: 10 degrees)
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                // Apply the transform (including the scale and translate from hover)
                card.style.transform = `perspective(800px) translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                // Reset to default hover transform via empty style string so CSS takes over
                card.style.transform = ''; 
            });
        });
    }

});
