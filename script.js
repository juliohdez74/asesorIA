// ============================================================
// CONFIGURACIÓN DE IMÁGENES - MODIFICA AQUÍ SI CAMBIAS FOTOS
// ============================================================
const BASE_URL = 'https://juliohdez74.github.io/asesorIA/images/laboratorio/';

const galerías = {
  laboratorio: [
    { archivo: 'img01.jpg', titulo: 'Estudiantes en laboratorio - 1' },
    { archivo: 'img02.jpg', titulo: 'Estudiantes en laboratorio - 2' },
    { archivo: 'img03.jpg', titulo: 'Estudiantes en laboratorio - 3' },
    { archivo: 'img04.jpg', titulo: 'Estudiantes en laboratorio - 4' },
    { archivo: 'img05.jpg', titulo: 'Estudiantes en laboratorio - 5' },
  ]
};

let fotoActual = 0;
let galeriaActiva = [];

// Abre el lightbox con las fotos de la galería elegida
function abrirGaleria(nombre) {
  galeriaActiva = galerías[nombre];
  fotoActual = 0;
  mostrarFoto(0);
  generarMiniaturas();
  document.getElementById('lightbox-overlay').classList.add('activo');
  document.body.style.overflow = 'hidden';
}

// Muestra la foto en el índice dado
function mostrarFoto(index) {
  const foto = galeriaActiva[index];
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  img.src = BASE_URL + foto.archivo;
  img.alt = foto.titulo;
  caption.textContent = foto.titulo + ' (' + (index + 1) + ' / ' + galeriaActiva.length + ')';

  // Resaltar miniatura activa
  document.querySelectorAll('.thumb').forEach((t, i) => {
    t.classList.toggle('activa', i === index);
  });
}

// Navega entre fotos (+1 siguiente, -1 anterior)
function cambiarFoto(direccion) {
  fotoActual = (fotoActual + direccion + galeriaActiva.length) % galeriaActiva.length;
  mostrarFoto(fotoActual);
}

// Genera las miniaturas en la parte inferior del lightbox
function generarMiniaturas() {
  const contenedor = document.getElementById('lightbox-thumbnails');
  contenedor.innerHTML = '';
  galeriaActiva.forEach((foto, i) => {
    const img = document.createElement('img');
    img.src = BASE_URL + foto.archivo;
    img.alt = foto.titulo;
    img.className = 'thumb' + (i === 0 ? ' activa' : '');
    img.onclick = () => { fotoActual = i; mostrarFoto(i); };
    contenedor.appendChild(img);
  });
}

// Cierra el lightbox (click en overlay o botón X)
function cerrarLightbox(event) {
  if (!event || event.target === document.getElementById('lightbox-overlay') || event.currentTarget.classList.contains('lightbox-close')) {
    document.getElementById('lightbox-overlay').classList.remove('activo');
    document.body.style.overflow = '';
  }
}

// Navegación con teclado (flechas y Escape)
document.addEventListener('keydown', (e) => {
  const overlay = document.getElementById('lightbox-overlay');
  if (!overlay.classList.contains('activo')) return;
  if (e.key === 'ArrowRight') cambiarFoto(1);
  if (e.key === 'ArrowLeft') cambiarFoto(-1);
  if (e.key === 'Escape') cerrarLightbox();
});

// ============================================================
// MENÚ HAMBURGUESA
// ============================================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// ============================================================
// FORMULARIO DE CONTACTO
// ============================================================
const contactForm = document.querySelector('.contacto-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    contactForm.reset();
  });
}
