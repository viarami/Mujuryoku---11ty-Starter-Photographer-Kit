/**
 * Testimonial Carousel
 * Features:
 * - Auto-rotation with configurable interval
 * - Manual navigation (previous/next buttons)
 * - Dot indicators for current slide
 * - Pause on hover functionality
 * - Keyboard navigation support
 */

(function() {
    'use strict';

    class TestimonialCarousel {
        constructor(element) {
            this.carousel = element;
            this.track = this.carousel.querySelector('.carousel-track');
            this.slides = this.carousel.querySelectorAll('.carousel-slide');
            this.prevButton = this.carousel.querySelector('.carousel-button-prev');
            this.nextButton = this.carousel.querySelector('.carousel-button-next');
            this.dots = this.carousel.querySelectorAll('.carousel-dot');
            
            // Configuration
            this.autoplay = this.carousel.dataset.autoplay === 'true';
            this.interval = parseInt(this.carousel.dataset.interval, 10) || 5000;
            this.currentIndex = 0;
            this.totalSlides = this.slides.length;
            this.isPlaying = true;
            this.autoplayTimer = null;
            
            // State
            this.isTransitioning = false;
            
            this.init();
        }
        
        init() {
            if (!this.slides.length) return;
            
            // Set initial state
            this.updateSlides();
            this.updateDots();
            
            // Event listeners
            this.prevButton.addEventListener('click', () => this.prev());
            this.nextButton.addEventListener('click', () => this.next());
            
            // Dot navigation
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });
            
            // Pause on hover
            this.carousel.addEventListener('mouseenter', () => this.pause());
            this.carousel.addEventListener('mouseleave', () => this.play());
            
            // Keyboard navigation
            this.carousel.addEventListener('keydown', (e) => this.handleKeyboard(e));
            
            // Touch/swipe support
            this.setupTouchSupport();
            
            // Start autoplay
            if (this.autoplay) {
                this.startAutoplay();
            }
            
            // Mark carousel as initialized
            this.carousel.classList.add('carousel-initialized');
        }
        
        goToSlide(index) {
            if (this.isTransitioning || index === this.currentIndex) return;
            
            // Handle wrap-around
            if (index < 0) {
                index = this.totalSlides - 1;
            } else if (index >= this.totalSlides) {
                index = 0;
            }
            
            this.isTransitioning = true;
            this.currentIndex = index;
            
            this.updateSlides();
            this.updateDots();
            
            // Reset transition lock after animation
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
            
            // Reset autoplay timer
            if (this.autoplay && this.isPlaying) {
                this.resetAutoplay();
            }
        }
        
        next() {
            this.goToSlide(this.currentIndex + 1);
        }
        
        prev() {
            this.goToSlide(this.currentIndex - 1);
        }
        
        updateSlides() {
            // Move track to show current slide
            const translateX = -(this.currentIndex * 100);
            this.track.style.transform = `translateX(${translateX}%)`;
            
            // Update active class
            this.slides.forEach((slide, index) => {
                slide.classList.toggle('is-active', index === this.currentIndex);
            });
        }
        
        updateDots() {
            this.dots.forEach((dot, index) => {
                dot.classList.toggle('is-active', index === this.currentIndex);
                dot.setAttribute('aria-selected', index === this.currentIndex ? 'true' : 'false');
            });
        }
        
        play() {
            if (!this.autoplay) return;
            this.isPlaying = true;
            this.startAutoplay();
            this.carousel.setAttribute('data-autoplay', 'true');
        }
        
        pause() {
            this.isPlaying = false;
            this.stopAutoplay();
            this.carousel.setAttribute('data-autoplay', 'false');
        }
        
        startAutoplay() {
            this.stopAutoplay();
            this.autoplayTimer = setInterval(() => {
                this.next();
            }, this.interval);
        }
        
        stopAutoplay() {
            if (this.autoplayTimer) {
                clearInterval(this.autoplayTimer);
                this.autoplayTimer = null;
            }
        }
        
        resetAutoplay() {
            this.stopAutoplay();
            this.startAutoplay();
        }
        
        handleKeyboard(e) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.next();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(this.totalSlides - 1);
                    break;
            }
        }
        
        setupTouchSupport() {
            let touchStartX = 0;
            let touchEndX = 0;
            const minSwipeDistance = 50;
            
            this.carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            this.carousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const swipeDistance = touchEndX - touchStartX;
                
                if (Math.abs(swipeDistance) > minSwipeDistance) {
                    if (swipeDistance < 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                }
            }, { passive: true });
        }
    }
    
    // Initialize all testimonial carousels on the page
    document.addEventListener('DOMContentLoaded', () => {
        const carousels = document.querySelectorAll('.testimonial-carousel');
        carousels.forEach(carousel => {
            new TestimonialCarousel(carousel);
        });
    });
})();
