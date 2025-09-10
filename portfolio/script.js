// JavaScript for smooth scrolling and animations

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hero section background animation
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 250;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = '#A0522D';
}

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Boundary check
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
};

Particle.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateParticles();

// Reveal on scroll effect
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 // Trigger when 20% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Target the sections to reveal
const sectionsToReveal = document.querySelectorAll('.reveal');
sectionsToReveal.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Special fade-in for hero text and button
const heroElements = document.querySelectorAll('.fade-in');
let delay = 100;
heroElements.forEach(el => {
    el.style.transitionDelay = `${delay}ms`;
    el.classList.add('is-visible');
    delay += 200;
});
