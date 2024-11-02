// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1,
    smartphone: {
        smooth: true
    },
    tablet: {
        smooth: true
    }
});

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Update ScrollTrigger when locomotive scroll updates
scroll.on('scroll', ScrollTrigger.update);

// Sync ScrollTrigger with Locomotive Scroll
ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
        return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
});

// Animations for the header section
gsap.from('.wow', {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.wow',
        scroller: '[data-scroll-container]',
        start: 'top 80%',
    }
});

// Animate sections with alternating layouts
document.querySelectorAll('.row.g-5.align-items-center').forEach((section, index) => {
    // Animate image
    gsap.from(section.querySelector('.position-relative'), {
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            scroller: '[data-scroll-container]',
            start: 'top 80%',
        }
    });

    // Animate text
    gsap.from(section.querySelector('.col-lg-6:not(:has(.position-relative))'), {
        opacity: 0,
        x: index % 2 === 0 ? 100 : -100,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            scroller: '[data-scroll-container]',
            start: 'top 80%',
        }
    });

    // Animate list items
    gsap.from(section.querySelectorAll('.list-unstyled li'), {
        opacity: 0,
        y: 50,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: section,
            scroller: '[data-scroll-container]',
            start: 'top 80%',
        }
    });
});

// Add gradient animation to headings
document.querySelectorAll('[style*="color: #fb873f"]').forEach(heading => {
    heading.style.background = 'linear-gradient(45deg, #fb873f, #ff4e50)';
    heading.style.webkitBackgroundClip = 'text';
    heading.style.webkitTextFillColor = 'transparent';
    heading.style.backgroundSize = '200% 200%';
    
    gsap.to(heading, {
        backgroundPosition: '200% 200%',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
});

// Add hover animations to service items
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            y: 0,
            scale: 1,
            duration: 0.3,
            boxShadow: '0 0 0 rgba(0,0,0,0)'
        });
    });
}); 