document.addEventListener('DOMContentLoaded', () => {

    const stickyHeader = document.getElementById('stickyHeader');
   
    const scrollThreshold = 300;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

       
        if (currentScrollY > scrollThreshold) {
            if (currentScrollY > lastScrollY) {
                stickyHeader.classList.add('visible');
            } else {
                stickyHeader.classList.remove('visible');
            }
        } else {
            stickyHeader.classList.remove('visible');
        }

        lastScrollY = currentScrollY;
    });

   
    const images = [
        "https://images.unsplash.com/photo-1541888087618-97a61d6ce3c8?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&q=80&w=800"
    ];

    let currentIndex = 0;
    const mainImage = document.getElementById('mainImage');
    const thumbnailList = document.getElementById('thumbnailList');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    images.forEach((src, index) => {
        const thumbBtn = document.createElement('button');
        thumbBtn.classList.add('thumb');
        if (index === 0) thumbBtn.classList.add('active');

        const img = document.createElement('img');
        img.src = src;
        img.alt = `Thumbnail ${index + 1}`;

        thumbBtn.appendChild(img);

        thumbBtn.addEventListener('click', () => {
            updateMainImage(index);
        });

        thumbnailList.appendChild(thumbBtn);
    });

    function updateMainImage(index) {
        currentIndex = index;
        mainImage.src = images[currentIndex];

        document.querySelectorAll('.thumb').forEach((thumb, idx) => {
            if (idx === currentIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });

        zoomResult.style.backgroundImage = `url("${images[currentIndex]}")`;
    }

    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = images.length - 1;
        updateMainImage(newIndex);
    });

    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= images.length) newIndex = 0;
        updateMainImage(newIndex);
    });

    const mainImageContainer = document.getElementById('mainImageContainer');
    const mainImageWrapper = document.querySelector('.main-image-wrapper');
    const zoomResult = document.getElementById('zoomResult');
    const zoomLens = document.getElementById('zoomLens');

    zoomResult.style.backgroundImage = `url("${images[currentIndex]}")`;
    const scale = 2;

    mainImageContainer.addEventListener('mouseenter', () => {
        if (window.innerWidth > 992) {
            mainImageWrapper.classList.add('zoom-active');
            zoomLens.style.visibility = 'visible';
            zoomLens.style.opacity = '1';
            zoomResult.style.backgroundSize = `${mainImage.width * scale}px ${mainImage.height * scale}px`;
        }
    });

    mainImageContainer.addEventListener('mouseleave', () => {
        mainImageWrapper.classList.remove('zoom-active');
        zoomLens.style.visibility = 'hidden';
        zoomLens.style.opacity = '0';
    });

    mainImageContainer.addEventListener('mousemove', (e) => {
        if (!mainImageWrapper.classList.contains('zoom-active')) return;

        const bounds = mainImage.getBoundingClientRect();

      
        let x = e.clientX - bounds.left;
        let y = e.clientY - bounds.top;

        const lensWidth = zoomLens.offsetWidth;
        const lensHeight = zoomLens.offsetHeight;

       
        if (x < lensWidth / 2) x = lensWidth / 2;
        if (x > bounds.width - lensWidth / 2) x = bounds.width - lensWidth / 2;
        if (y < lensHeight / 2) y = lensHeight / 2;
        if (y > bounds.height - lensHeight / 2) y = bounds.height - lensHeight / 2;

        zoomLens.style.left = `${x - lensWidth / 2}px`;
        zoomLens.style.top = `${y - lensHeight / 2}px`;

       
        const bgX = (x - lensWidth / 2) * scale;
        const bgY = (y - lensHeight / 2) * scale;

        zoomResult.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    });

    /* --- Modal Logic --- */
    const modal = document.getElementById('downloadModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const downloadForm = document.getElementById('downloadForm');

    // Open Modal
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    });

    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // Handle Form Submit (dummy action)
    downloadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Brochure download initiated!');
        closeModal();
        downloadForm.reset();
    });

    /* --- Request Callback Modal Logic --- */
    const requestModal = document.getElementById('requestModal');
    const openRequestModalBtn = document.getElementById('openRequestModalBtn');
    const closeRequestModalBtn = document.getElementById('closeRequestModalBtn');
    const requestForm = document.getElementById('requestForm');

    if (openRequestModalBtn) {
        openRequestModalBtn.addEventListener('click', () => {
            requestModal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    }

    if (closeRequestModalBtn) {
        closeRequestModalBtn.addEventListener('click', () => {
            closeRequestModal();
        });
    }

    if (requestModal) {
        requestModal.addEventListener('click', (e) => {
            if (e.target === requestModal) {
                closeRequestModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && requestModal && requestModal.classList.contains('active')) {
            closeRequestModal();
        }
    });

    function closeRequestModal() {
        if (requestModal) {
            requestModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    if (requestForm) {
        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Request submitted! We will call you back shortly.');
            closeRequestModal();
            requestForm.reset();
        });
    }

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* --- Catalogue Form Logic --- */
    const catalogueForm = document.getElementById('catalogueForm');
    if (catalogueForm) {
        catalogueForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Catalogue request received! We will email it to you shortly.');
            catalogueForm.reset();
        });
    }

    /* --- Applications Carousel Logic --- */
    const appTrack = document.getElementById('applicationsTrack');
    const appPrevBtn = document.getElementById('appPrevBtn');
    const appNextBtn = document.getElementById('appNextBtn');

    let currentAppIndex = 0;
    const totalAppCards = appTrack ? appTrack.children.length : 0;

    function updateAppCarousel() {
        if (!appTrack) return;

        let cardsVisible = 3;
        if (window.innerWidth <= 768) cardsVisible = 1;
        else if (window.innerWidth <= 992) cardsVisible = 2;

        const maxIndex = totalAppCards - cardsVisible;
        if (currentAppIndex > maxIndex) currentAppIndex = maxIndex;
        if (currentAppIndex < 0) currentAppIndex = 0;

        const firstCard = appTrack.querySelector('.app-card');
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const style = window.getComputedStyle(appTrack);
            const gap = parseFloat(style.gap) || 24;
            const moveAmt = (cardWidth + gap) * currentAppIndex;
            appTrack.style.transform = `translateX(-${moveAmt}px)`;
        }
    }

    if (appPrevBtn && appNextBtn && appTrack) {
        appPrevBtn.addEventListener('click', () => {
            currentAppIndex = Math.max(0, currentAppIndex - 1);
            updateAppCarousel();
        });

        appNextBtn.addEventListener('click', () => {
            let cardsVisible = 3;
            if (window.innerWidth <= 768) cardsVisible = 1;
            else if (window.innerWidth <= 992) cardsVisible = 2;

            const maxIndex = totalAppCards - cardsVisible;
            if (currentAppIndex < maxIndex) {
                currentAppIndex++;
            }
            updateAppCarousel();
        });

        window.addEventListener('resize', updateAppCarousel);
    }

    /* --- Manufacturing Process Tabs Logic --- */
    const timelineSteps = document.querySelectorAll('.timeline-step');
    const processContents = document.querySelectorAll('.process-step-content');

    const contentArea = document.getElementById('processContentArea');
    if (contentArea && timelineSteps.length > 2) {
        for (let i = 3; i <= 8; i++) {
            const stepName = timelineSteps[i - 1].textContent;
            const newContent = document.createElement('div');
            newContent.className = 'process-step-content';
            newContent.id = `process-step-${i}`;
            newContent.innerHTML = `
                <div class="process-text">
                    <h3>${stepName} Phase</h3>
                    <p>This phase represents the meticulous ${stepName.toLowerCase()} process ensuring the highest standards of our HDPE pipes.</p>
                    <ul class="process-features">
                        <li>
                            <svg class="check-icon-blue" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                            Industry standard compliance
                        </li>
                    </ul>
                </div>
                <div class="process-image">
                    <img src="https://placehold.co/600x400/38439B/FFF?text=${stepName.replace(' ', '+')}" alt="${stepName}">
                </div>
            `;
            contentArea.appendChild(newContent);
        }
    }

    // Refresh query selector after adding dynamic nodes
    const allProcessContents = document.querySelectorAll('.process-step-content');

    timelineSteps.forEach(stepBtn => {
        stepBtn.addEventListener('click', () => {
            const stepId = stepBtn.getAttribute('data-step');

            // Remove active class from all buttons
            timelineSteps.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            stepBtn.classList.add('active');

            // Hide all content areas
            allProcessContents.forEach(content => content.classList.remove('active'));

            // Show target content area
            const targetContent = document.getElementById(`process-step-${stepId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});
