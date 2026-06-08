// ========== HAMBURGER MENU ========== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========== SMOOTH SCROLL ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== INTERSECTION OBSERVER PARA ANIMACIONES ========== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todas las tarjetas de actividades
document.querySelectorAll('.activity-card').forEach(card => {
    observer.observe(card);
});

// Observar todos los items de beneficios
document.querySelectorAll('.beneficio-item').forEach(item => {
    observer.observe(item);
});

// ========== FORMULARIO DE CONTACTO ========== 
const contactForm = document.querySelector('.contacto-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const mensaje = contactForm.querySelector('textarea').value;
        
        // Validaciones básicas
        if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        // Aquí puedes agregar la lógica para enviar el formulario
        // Por ejemplo, usando fetch para enviar a un servidor
        console.log({
            nombre,
            email,
            mensaje
        });
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
        
        // Limpiar formulario
        contactForm.reset();
    });
}

// ========== EFECTO PARALLAX EN HERO ========== 
const heroSection = document.querySelector('.hero');

if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });
}

// ========== ANIMACIÓN DE NÚMEROS PARA BENEFICIOS ========== 
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Observar números de beneficios cuando entran en vista
const beneficioNumbers = document.querySelectorAll('.beneficio-number');
let hasAnimated = false;

const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            beneficioNumbers.forEach((el, index) => {
                const number = parseInt(el.textContent);
                animateCounter(el, number, 1500);
            });
            hasAnimated = true;
            numberObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (beneficioNumbers.length > 0) {
    numberObserver.observe(beneficioNumbers[0].closest('.beneficio-item'));
}

// ========== EFECTO HOVER EN TARJETAS ========== 
const activityCards = document.querySelectorAll('.activity-card');

activityCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// ========== SCROLL REVEAL ========== 
const revealElements = document.querySelectorAll('.section-title, .section-subtitle');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
    revealObserver.observe(element);
});

// ========== LAZY LOADING PARA IMÁGENES ========== 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========== ANIMACIÓN DE SCROLL EN NAVBAR ========== 
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.3)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.2)';
    }
    
    lastScrollTop = scrollTop;
});

// ========== RIPPLE EFFECT EN BOTONES ========== 
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ========== INICIALIZAR TOOLTIPS ========== 
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseover', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.top = (rect.top - 10) + 'px';
        tooltip.style.left = rect.left + 'px';
    });
});

// ========== GALERÍA DE LABORATORIO ========== 
// Array de imágenes de laboratorio
const laboratorioImages = [
    'images/laboratorio/IMG_0544.jpeg'
];

let currentImageIndex = 0;

const galleryLabBtn = document.getElementById('galleryLabBtn');
const galleryLabModal = document.getElementById('galleryLabModal');
const galleryImage = document.getElementById('galleryImage');
const imageCounter = document.getElementById('imageCounter');
const imageTotalCounter = document.getElementById('imageTotalCounter');
const galleryClose = document.querySelector('.gallery-close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (galleryLabBtn && galleryLabModal) {
    // Actualizar contador total de imágenes
    imageTotalCounter.textContent = laboratorioImages.length;
    
    // Abrir modal
    galleryLabBtn.addEventListener('click', () => {
        currentImageIndex = 0;
        showImage();
        galleryLabModal.style.display = 'flex';
    });
    
    // Cerrar modal
    galleryClose.addEventListener('click', () => {
        galleryLabModal.style.display = 'none';
    });
    
    // Cerrar al hacer clic fuera de la imagen
    galleryLabModal.addEventListener('click', (e) => {
        if (e.target === galleryLabModal) {
            galleryLabModal.style.display = 'none';
        }
    });
    
    // Botón anterior
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + laboratorioImages.length) % laboratorioImages.length;
        showImage();
    });
    
    // Botón siguiente
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % laboratorioImages.length;
        showImage();
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (galleryLabModal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
            if (e.key === 'Escape') galleryLabModal.style.display = 'none';
        }
    });
    
    // Función para mostrar imagen
    function showImage() {
        galleryImage.src = laboratorioImages[currentImageIndex];
        imageCounter.textContent = currentImageIndex + 1;
    }
}

// ========== LOG DE INICIALIZACIÓN ========== 
console.log('✨ Página web de Capacitación TICs cargada exitosamente');
console.log('🎨 Diseño mejorado con animaciones interactivas activadas');
