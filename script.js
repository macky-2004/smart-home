/**
 * NammaVeedu Smart - Global Application Scripts
 * Premium Motion System & Interactive Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('NammaVeedu Smart premium landing page initialized.');

    // 1. Initialize core UI components & Motion System
    initLucideIcons();
    initMobileNavigation();
    initStatsCounter();
    initDashboard();
    initTestimonialsCarousel();
    initFaqAccordion();
    initScrollToTop();
    initPageLoadAnimation();
    initScrollReveal();
    initScrollSpy();
});

/**
 * Initialize Lucide Icons safely
 */
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.warn('Lucide library not loaded. Checking again in 500ms.');
        setTimeout(initLucideIcons, 500);
    }
}

/**
 * Mobile Navigation Drawer & Hamburger Behavior
 */
function initMobileNavigation() {
    const header = document.getElementById('main-header');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('#navMenu a');

    if (!hamburgerBtn || !navMenu) return;

    // Sticky Scroll Behavior
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('is-sticky');
        } else {
            header.classList.remove('is-sticky');
        }
    });

    // Mobile Menu Toggle
    hamburgerBtn.addEventListener('click', () => {
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('is-active');
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });

    // Close Menu when clicking a nav link (with smooth scroll delay)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('is-active');
                document.body.style.overflow = 'auto';
            }

            // Smooth Scroll navigation
            const targetId = link.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                const offsetPosition = targetEl.offsetTop - 80;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle mobile CTA button click
    const mobileCta = document.querySelector('.mobile-cta');
    if (mobileCta) {
        mobileCta.addEventListener('click', () => {
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('is-active');
                document.body.style.overflow = 'auto';
            }
            const targetEl = document.getElementById('final-cta');
            if (targetEl) {
                const offsetPosition = targetEl.offsetTop - 80;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

/**
 * Statistics Intersection Observer & Numeric Animation
 */
function initStatsCounter() {
    const statsSection = document.getElementById('statistics');
    const counters = document.querySelectorAll('.counter');
    
    if (!statsSection || counters.length === 0) return;

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const hasPercent = counter.innerText.includes('%');
                    const hasPlus = counter.innerText.includes('+');
                    let current = 0;
                    
                    const step = target / 50; // duration of animation divided by intervals
                    const updateCount = () => {
                        current += step;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + (hasPercent ? '%' : hasPlus ? '+' : '');
                            setTimeout(updateCount, 25);
                        } else {
                            counter.innerText = target + (hasPercent ? '%' : hasPlus ? '+' : '');
                        }
                    };
                    updateCount();
                });
                counterObserver.unobserve(statsSection);
            }
        });
    }, observerOptions);

    counterObserver.observe(statsSection);
}

/**
 * Interactive Dashboard Functionality & Presets
 */
function initDashboard() {
    const dashboardGrid = document.querySelector('.dashboard-grid');
    const widgets = document.querySelectorAll('.dashboard-grid .interactive-widget');
    const quickActionBtns = document.querySelectorAll('.quick-actions .btn-neumorphic');
    
    // UI Value Elements
    const valWelcome = document.querySelector('#db-welcome h3');
    const valStatusText = document.querySelector('#db-welcome .status-text');
    
    const valClimate = document.getElementById('val-climate');
    const subClimate = document.getElementById('sub-climate');
    const footClimate = document.getElementById('foot-climate');
    const climateWidget = document.getElementById('db-climate');
    
    const valLighting = document.getElementById('val-lighting');
    const subLighting = document.getElementById('sub-lighting');
    const footLighting = document.getElementById('foot-lighting');
    const lightingWidget = document.getElementById('db-lighting');
    
    const valLock = document.getElementById('val-lock');
    const subLock = document.getElementById('sub-lock');
    const footLock = document.getElementById('foot-lock');
    const lockWidget = document.getElementById('db-lock');
    
    const valWater = document.getElementById('val-water');
    const subWater = document.getElementById('sub-water');
    const footWater = document.getElementById('foot-water');
    const waterWidget = document.getElementById('db-water');
    
    const valSolar = document.getElementById('val-solar');
    const subSolar = document.getElementById('sub-solar');
    const footSolar = document.getElementById('foot-solar');
    const solarWidget = document.getElementById('db-solar');
    
    const valCamera = document.getElementById('val-camera');
    const subCamera = document.getElementById('sub-camera');
    const footCamera = document.getElementById('foot-camera');
    const cameraWidget = document.getElementById('db-camera');
    
    const valGarden = document.getElementById('val-garden');
    const subGarden = document.getElementById('sub-garden');
    const footGarden = document.getElementById('foot-garden');
    const gardenWidget = document.getElementById('db-garden');
    
    const valEnergy = document.getElementById('val-energy');
    const subEnergy = document.getElementById('sub-energy');
    const footEnergy = document.getElementById('foot-energy');
    const energyWidget = document.getElementById('db-energy');

    if (!dashboardGrid) return;

    // Helper: Update icon dynamically
    const updateIcon = (element, iconName) => {
        const iconContainer = element.querySelector('i');
        if (iconContainer) {
            iconContainer.setAttribute('data-lucide', iconName);
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    };

    // 1. Entrance Staggered Fade-in Animation
    const entranceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const allWidgets = dashboardGrid.querySelectorAll('.dash-widget');
                allWidgets.forEach((widget, index) => {
                    setTimeout(() => {
                        widget.style.opacity = '1';
                        widget.style.transform = 'translateY(0)';
                    }, index * 60);
                });
                entranceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    entranceObserver.observe(dashboardGrid);

    // 2. Individual Widget Toggle Operations
    // Climate Toggle
    if (climateWidget && valClimate && subClimate && footClimate) {
        const temps = [
            { temp: '26°C', status: 'Comfortable', foot: 'Perfect for Everyday Living', active: false },
            { temp: '24°C', status: 'Cooling Active', foot: 'AC Running Efficiently', active: true },
            { temp: '22°C', status: 'Cozy', foot: 'AC set to Cozy Temp', active: true },
            { temp: 'Eco (28°C)', status: 'Eco Mode', foot: 'System in Low Consumption', active: false }
        ];
        let tempIndex = 0;
        climateWidget.addEventListener('click', () => {
            tempIndex = (tempIndex + 1) % temps.length;
            valClimate.innerText = temps[tempIndex].temp;
            subClimate.innerText = temps[tempIndex].status;
            footClimate.innerText = temps[tempIndex].foot;
            
            if (temps[tempIndex].active) {
                climateWidget.classList.add('is-active-widget');
            } else {
                climateWidget.classList.remove('is-active-widget');
            }
        });
    }

    // Lighting Toggle
    if (lightingWidget && valLighting && subLighting && footLighting) {
        const lightingStates = [
            { val: '4 Zones Active', sub: 'Living Room: On | Kitchen: Off', foot: 'Bedroom: On | Garden: Scheduled', active: true },
            { val: 'All Zones Active', sub: 'Living Room, Kitchen, Bedroom: On', foot: 'Garden: watering schedule active', active: true },
            { val: 'All Zones Off', sub: 'No Active Zones', foot: 'All connected areas deactivated', active: false }
        ];
        let lightIndex = 0;
        lightingWidget.addEventListener('click', () => {
            lightIndex = (lightIndex + 1) % lightingStates.length;
            valLighting.innerText = lightingStates[lightIndex].val;
            subLighting.innerText = lightingStates[lightIndex].sub;
            footLighting.innerText = lightingStates[lightIndex].foot;
            
            if (lightingStates[lightIndex].active) {
                lightingWidget.classList.add('is-active-widget');
            } else {
                lightingWidget.classList.remove('is-active-widget');
            }
        });
    }

    // Door Lock Toggle
    if (lockWidget && valLock && subLock && footLock) {
        lockWidget.addEventListener('click', () => {
            const isLocked = valLock.innerText.includes('Locked');
            if (isLocked) {
                // Unlock
                valLock.innerText = 'Unlocked (Alert)';
                subLock.innerText = 'Unlocked Just Now';
                footLock.innerText = 'Attention Required';
                lockWidget.classList.remove('status-safe');
                lockWidget.classList.add('status-warning');
                lockWidget.classList.add('is-active-widget');
                updateIcon(lockWidget, 'lock-open');
                valStatusText.innerText = 'Front door unlocked. Safety notification dispatched.';
            } else {
                // Lock
                valLock.innerText = 'Securely Locked';
                subLock.innerText = 'Locked 1 Minute Ago';
                footLock.innerText = 'Remote Access Enabled';
                lockWidget.classList.add('status-safe');
                lockWidget.classList.remove('status-warning');
                lockWidget.classList.remove('is-active-widget');
                updateIcon(lockWidget, 'lock');
                valStatusText.innerText = 'Front door successfully locked. All entries secured.';
            }
        });
    }

    // Water Pump Toggle
    if (waterWidget && valWater && subWater && footWater) {
        waterWidget.addEventListener('click', () => {
            const isRunning = subWater.innerText.includes('Running');
            if (isRunning) {
                // Turn off
                subWater.innerText = 'Pump: Auto (Idle)';
                footWater.innerText = 'No Overflow Detected';
                waterWidget.classList.remove('is-active-widget');
            } else {
                // Turn on
                subWater.innerText = 'Pump: Running Efficiently';
                footWater.innerText = 'Filling Water Tank';
                waterWidget.classList.add('is-active-widget');
            }
        });
    }

    // Solar Power Toggle
    if (solarWidget && valSolar && subSolar && footSolar) {
        solarWidget.addEventListener('click', () => {
            const isStats = valSolar.innerText === '18.4 kWh';
            if (isStats) {
                valSolar.innerText = 'Peak 5.4 kW';
                subSolar.innerText = 'Battery: 92% (Charging)';
                footSolar.innerText = 'Direct Grid Contribution';
                solarWidget.classList.add('is-active-widget');
            } else {
                valSolar.innerText = '18.4 kWh';
                subSolar.innerText = 'Battery: 92% Charged';
                footSolar.innerText = 'Excellent Energy Production';
                solarWidget.classList.remove('is-active-widget');
            }
        });
    }

    // Camera Feed Toggle
    if (cameraWidget && valCamera && subCamera && footCamera) {
        cameraWidget.addEventListener('click', () => {
            const isNormal = valCamera.innerText === '4 Cameras Active';
            if (isNormal) {
                valCamera.innerText = 'Feeds Buffered';
                subCamera.innerText = 'Storage: 94% Free';
                footCamera.innerText = 'Last Event: Doorbell (12m ago)';
                cameraWidget.classList.add('is-active-widget');
            } else {
                valCamera.innerText = '4 Cameras Active';
                subCamera.innerText = 'Motion: No Recent Activity';
                footCamera.innerText = 'Monitoring in Progress';
                cameraWidget.classList.remove('is-active-widget');
            }
        });
    }

    // Garden Irrigation Toggle
    if (gardenWidget && valGarden && subGarden && footGarden) {
        gardenWidget.addEventListener('click', () => {
            const isIrrigating = subGarden.innerText.includes('Watering');
            if (!isIrrigating) {
                valGarden.innerText = 'Watering';
                subGarden.innerText = 'Irrigation: Watering Now';
                footGarden.innerText = 'System Cycle Running';
                gardenWidget.classList.add('is-active-widget');
            } else {
                valGarden.innerText = 'Healthy';
                subGarden.innerText = 'Irrigation: Scheduled for 6:00 AM';
                footGarden.innerText = 'Plants Are Well Hydrated';
                gardenWidget.classList.remove('is-active-widget');
            }
        });
    }

    // Energy Usage Toggle
    if (energyWidget && valEnergy && subEnergy && footEnergy) {
        energyWidget.addEventListener('click', () => {
            const isNormal = valEnergy.innerText === '18.7 kWh';
            if (isNormal) {
                valEnergy.innerText = 'Cost: ₹142';
                subEnergy.innerText = 'Peak Grid Load: 1.4 kW';
                footEnergy.innerText = 'Optimized Tariffs Active';
                energyWidget.classList.add('is-active-widget');
            } else {
                valEnergy.innerText = '18.7 kWh';
                subEnergy.innerText = 'Savings: 17% Lower';
                footEnergy.innerText = 'Great Energy Efficiency';
                energyWidget.classList.remove('is-active-widget');
            }
        });
    }

    // 3. Quick Action Presets
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            
            // Toggle active visual classes
            quickActionBtns.forEach(b => {
                b.classList.remove('is-active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('is-active');
            btn.setAttribute('aria-pressed', 'true');

            // Apply preset updates with cascading widget animations
            if (mode === 'sleep') {
                valWelcome.innerText = 'Good Night';
                valStatusText.innerText = 'Goodnight, Rajesh. Night scene activated. All doors secured.';
                
                setTimeout(() => {
                    if (valClimate) valClimate.innerText = '24°C';
                    if (subClimate) subClimate.innerText = 'Optimized for Sleep';
                    if (footClimate) footClimate.innerText = 'Night Savings Mode';
                    if (climateWidget) climateWidget.classList.add('is-active-widget');
                }, 50);

                setTimeout(() => {
                    if (valLighting) valLighting.innerText = '1 Zone Active';
                    if (subLighting) subLighting.innerText = 'Bedroom: On | Others: Off';
                    if (footLighting) footLighting.innerText = 'Automatic Off Timer Active';
                    if (lightingWidget) lightingWidget.classList.add('is-active-widget');
                }, 100);

                setTimeout(() => {
                    if (valLock) valLock.innerText = 'Securely Locked';
                    if (subLock) subLock.innerText = 'Locked 1 Minute Ago';
                    if (footLock) footLock.innerText = 'All Entries Armed';
                    if (lockWidget) {
                        lockWidget.classList.add('status-safe');
                        lockWidget.classList.remove('status-warning');
                        lockWidget.classList.remove('is-active-widget');
                        updateIcon(lockWidget, 'lock');
                    }
                }, 150);

                setTimeout(() => {
                    if (subWater) subWater.innerText = 'Pump: Auto (Idle)';
                    if (footWater) footWater.innerText = 'No Overflow Detected';
                    if (waterWidget) waterWidget.classList.remove('is-active-widget');
                }, 200);

                setTimeout(() => {
                    if (valCamera) valCamera.innerText = '4 Cameras Active';
                    if (subCamera) subCamera.innerText = 'Motion: Active Guard Armed';
                    if (footCamera) footCamera.innerText = 'Armed & Monitoring';
                    if (cameraWidget) cameraWidget.classList.add('is-active-widget');
                }, 250);

                setTimeout(() => {
                    if (valGarden) valGarden.innerText = 'Healthy';
                    if (subGarden) subGarden.innerText = 'Irrigation: Scheduled for 6:00 AM';
                    if (footGarden) footGarden.innerText = 'Plants Are Well Hydrated';
                    if (gardenWidget) gardenWidget.classList.remove('is-active-widget');
                }, 300);

            } else if (mode === 'away') {
                valWelcome.innerText = 'Away Mode Active';
                valStatusText.innerText = 'System fully armed. Active monitoring enabled across 4 zones.';

                setTimeout(() => {
                    if (valClimate) valClimate.innerText = 'Eco (28°C)';
                    if (subClimate) subClimate.innerText = 'Eco Mode Active';
                    if (footClimate) footClimate.innerText = 'System Idle';
                    if (climateWidget) climateWidget.classList.remove('is-active-widget');
                }, 50);

                setTimeout(() => {
                    if (valLighting) valLighting.innerText = 'All Zones Off';
                    if (subLighting) subLighting.innerText = 'No Active Zones';
                    if (footLighting) footLighting.innerText = 'Vacation Schedule Standby';
                    if (lightingWidget) lightingWidget.classList.remove('is-active-widget');
                }, 100);

                setTimeout(() => {
                    if (valLock) valLock.innerText = 'Securely Locked';
                    if (subLock) subLock.innerText = 'Locked Just Now';
                    if (footLock) footLock.innerText = 'Armed Guard Active';
                    if (lockWidget) {
                        lockWidget.classList.add('status-safe');
                        lockWidget.classList.remove('status-warning');
                        lockWidget.classList.remove('is-active-widget');
                        updateIcon(lockWidget, 'lock');
                    }
                }, 150);

                setTimeout(() => {
                    if (subWater) subWater.innerText = 'Pump: Auto (Idle)';
                    if (footWater) footWater.innerText = 'No Overflow Detected';
                    if (waterWidget) waterWidget.classList.remove('is-active-widget');
                }, 200);

                setTimeout(() => {
                    if (valCamera) valCamera.innerText = '4 Cameras Active';
                    if (subCamera) subCamera.innerText = 'Motion: AI Guard Armed';
                    if (footCamera) footCamera.innerText = 'Armed & Monitoring';
                    if (cameraWidget) cameraWidget.classList.add('is-active-widget');
                }, 250);

                setTimeout(() => {
                    if (valGarden) valGarden.innerText = 'Healthy';
                    if (subGarden) subGarden.innerText = 'Irrigation: Scheduled for 6:00 AM';
                    if (footGarden) footGarden.innerText = 'Plants Are Well Hydrated';
                    if (gardenWidget) gardenWidget.classList.remove('is-active-widget');
                }, 300);

            } else if (mode === 'vacation') {
                valWelcome.innerText = 'Vacation Mode Active';
                valStatusText.innerText = 'Home is secure. Solar exporting at peak efficiency. Enjoy your trip.';

                setTimeout(() => {
                    if (valClimate) valClimate.innerText = 'AC Deactivated';
                    if (subClimate) subClimate.innerText = 'System Off';
                    if (footClimate) footClimate.innerText = 'Eco Guard Active';
                    if (climateWidget) climateWidget.classList.remove('is-active-widget');
                }, 50);

                setTimeout(() => {
                    if (valLighting) valLighting.innerText = 'Simulated Presence';
                    if (subLighting) subLighting.innerText = 'Schedules: Random Active';
                    if (footLighting) footLighting.innerText = 'Vacation Mode Engaged';
                    if (lightingWidget) lightingWidget.classList.add('is-active-widget');
                }, 100);

                setTimeout(() => {
                    if (valLock) valLock.innerText = 'Securely Locked';
                    if (subLock) subLock.innerText = 'Locked 3 Days Ago';
                    if (footLock) footLock.innerText = 'Armed Guard Active';
                    if (lockWidget) {
                        lockWidget.classList.add('status-safe');
                        lockWidget.classList.remove('status-warning');
                        lockWidget.classList.remove('is-active-widget');
                        updateIcon(lockWidget, 'lock');
                    }
                }, 150);

                setTimeout(() => {
                    if (subWater) subWater.innerText = 'Pump: Vacation Guard';
                    if (footWater) footWater.innerText = 'Leak Sensors Active';
                    if (waterWidget) waterWidget.classList.remove('is-active-widget');
                }, 200);

                setTimeout(() => {
                    if (valSolar) valSolar.innerText = '18.4 kWh';
                    if (subSolar) subSolar.innerText = 'Battery: 100% Charged';
                    if (footSolar) footSolar.innerText = '100% Exporting to Grid';
                    if (solarWidget) solarWidget.classList.add('is-active-widget');
                }, 250);

                setTimeout(() => {
                    if (valCamera) valCamera.innerText = '4 Cameras Active';
                    if (subCamera) subCamera.innerText = 'Motion: AI Guard Armed';
                    if (footCamera) footCamera.innerText = 'Armed & Monitoring';
                    if (cameraWidget) cameraWidget.classList.add('is-active-widget');
                }, 300);

                setTimeout(() => {
                    if (valGarden) valGarden.innerText = 'Healthy';
                    if (subGarden) subGarden.innerText = 'Irrigation: Smart Eco Cycle';
                    if (footGarden) footGarden.innerText = 'Water Saving Schedule Active';
                    if (gardenWidget) gardenWidget.classList.remove('is-active-widget');
                }, 350);

            } else if (mode === 'lightsoff') {
                valWelcome.innerText = 'Lighting Panel';
                valStatusText.innerText = 'All connected lighting zones deactivated successfully.';

                setTimeout(() => {
                    if (valLighting) valLighting.innerText = 'All Zones Off';
                    if (subLighting) subLighting.innerText = 'No Active Zones';
                    if (footLighting) footLighting.innerText = 'All Zones Deactivated';
                    if (lightingWidget) lightingWidget.classList.remove('is-active-widget');
                }, 50);

            } else if (mode === 'emergencylock') {
                valWelcome.innerText = 'Emergency Lock Engaged';
                valStatusText.innerText = 'All external door locks forced closed. Emergency protocol active.';

                setTimeout(() => {
                    if (valLock) valLock.innerText = 'Securely Locked';
                    if (subLock) subLock.innerText = 'Forced Lock Engaged';
                    if (footLock) footLock.innerText = 'All Access Points Sealed';
                    if (lockWidget) {
                        lockWidget.classList.add('status-safe');
                        lockWidget.classList.remove('status-warning');
                        lockWidget.classList.add('is-active-widget');
                        updateIcon(lockWidget, 'lock');
                    }
                }, 50);
            }
        });
    });
}

/**
 * Responsive Testimonials Carousel
 */
function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialTrack');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (!track || !nextBtn || !prevBtn) return;

    let index = 0;
    let autoSlideInterval;

    const getSlideWidth = () => {
        const firstCard = track.children[0];
        if (!firstCard) return 0;
        return firstCard.offsetWidth;
    };

    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const slide = () => {
        const width = getSlideWidth();
        const gap = 32; // gap size defined in CSS
        track.style.transform = `translateX(-${index * (width + gap)}px)`;
    };

    const getMaxIndex = () => {
        return isDesktop() ? track.children.length - 3 : track.children.length - 1;
    };

    const nextSlide = () => {
        const max = getMaxIndex();
        if (index < max) {
            index++;
        } else {
            index = 0; // Wrap around
        }
        slide();
    };

    const prevSlide = () => {
        const max = getMaxIndex();
        if (index > 0) {
            index--;
        } else {
            index = max; // Wrap around
        }
        slide();
    };

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 5500);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    // Auto-slide starts on load
    startAutoSlide();

    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', startAutoSlide);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            index = 0; // reset slide index to prevent layout drift
            slide();
        }, 150);
    });
}

/**
 * FAQ Accordion with Dynamic scrollHeight Animation
 */
function initFaqAccordion() {
    const faqAccordion = document.getElementById('faqAccordion');
    if (!faqAccordion) return;

    faqAccordion.addEventListener('click', (e) => {
        const btn = e.target.closest('.faq-question');
        if (!btn) return;

        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        const targetId = btn.getAttribute('aria-controls');
        const answerPanel = document.getElementById(targetId);

        // Close all other items
        const allQuestions = faqAccordion.querySelectorAll('.faq-question');
        allQuestions.forEach(q => {
            q.setAttribute('aria-expanded', 'false');
            const panel = document.getElementById(q.getAttribute('aria-controls'));
            if (panel) {
                panel.setAttribute('aria-hidden', 'true');
                panel.style.maxHeight = '0px';
                panel.style.paddingBottom = '0px';
            }
        });

        // Toggle clicked item
        if (!isOpen && answerPanel) {
            btn.setAttribute('aria-expanded', 'true');
            answerPanel.setAttribute('aria-hidden', 'false');
            
            // Set dynamic height using scrollHeight
            answerPanel.style.maxHeight = (answerPanel.scrollHeight + 24) + 'px';
            answerPanel.style.paddingBottom = '24px';
        }
    });
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.classList.add('is-visible');
        } else {
            scrollBtn.classList.remove('is-visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * PASS-3 STEP 3: Hero Page Load Animation (Staggered Entrance)
 */
function initPageLoadAnimation() {
    const heroElements = [
        document.querySelector('.hero-eyebrow'),
        document.querySelector('.hero-content h1'),
        document.querySelector('.hero-content p'),
        document.querySelector('.hero-actions'),
        document.querySelector('.hero-trust'),
        document.querySelector('.hero-visual')
    ];

    heroElements.forEach((el, idx) => {
        if (!el) return;
        el.classList.add('hero-entrance-element');
        setTimeout(() => {
            el.classList.add('hero-entrance-active');
        }, 150 + idx * 120);
    });
}

/**
 * PASS-3 STEP 4: Universal Scroll Reveal System
 */
function initScrollReveal() {
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const revealSelectors = [
        '.statistics-section h2, .statistics-section p',
        '.features-section h2, .features-section p',
        '.dashboard-section h2, .dashboard-section p',
        '.features-detail-section .eyebrow, .features-detail-section h2, .features-detail-section .section-desc',
        '.tn-section .eyebrow, .tn-section h2, .tn-section .section-desc',
        '.timeline-section .eyebrow, .timeline-section h2, .timeline-section .section-desc',
        '.testimonials-section .eyebrow, .testimonials-section h2, .testimonials-section .section-desc',
        '.faq-section .eyebrow, .faq-section h2, .faq-section .section-desc',
        '.stat-card',
        '.feature-card',
        '.feature-item',
        '.lifestyle-wrapper',
        '.highlight-card',
        '.benefit-card',
        '.timeline-visual-card',
        '.timeline-step',
        '.testimonial-card',
        '.faq-item',
        '.cta-card'
    ];

    const revealElements = document.querySelectorAll(revealSelectors.join(', '));

    revealElements.forEach(el => {
        if (!el.classList.contains('reveal-element') && !el.classList.contains('hero-entrance-element')) {
            el.classList.add('reveal-element');
        }
    });

    // Group cards within grids for staggered entrance
    const grids = document.querySelectorAll('.stats-grid, .features-grid, .tn-benefits-grid, .timeline-grid-list, .carousel-track');
    grids.forEach(grid => {
        const children = grid.children;
        Array.from(children).forEach((child, index) => {
            const delayClass = `stagger-${(index % 6) + 1}`;
            child.classList.add(delayClass);
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * PASS-3 STEP 9: Navigation Scroll Spy & Active State Highlight
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('#navMenu a');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('is-active');
            }
        });
    });
}