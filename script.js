// ============================================================
// CONFIGURACIÓN DE IMÁGENES
// ============================================================
const BASE_URL = 'https://juliohdez74.github.io/asesorIA/images/laboratorio/';

const galerias = {
  laboratorio: [
    { archivo: 'img01.jpeg', titulo: 'Estudiantes en laboratorio - 1' },
    { archivo: 'img02.jpeg', titulo: 'Estudiantes en laboratorio - 2' },
    { archivo: 'img03.jpeg', titulo: 'Estudiantes en laboratorio - 3' },
    { archivo: 'img04.jpeg', titulo: 'Estudiantes en laboratorio - 4' },
    { archivo: 'img05.jpeg', titulo: 'Estudiantes en laboratorio - 5' },
  ]
};

let fotoActual = 0;
let galeriaActiva = [];

function abrirGaleria(nombre) {
  galeriaActiva = galerias[nombre];
  if (!galeriaActiva || galeriaActiva.length === 0) return;
  fotoActual = 0;
  generarMiniaturas();
  mostrarFoto(0);
  document.getElementById('lightbox-overlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function mostrarFoto(index) {
  const foto = galeriaActiva[index];
  document.getElementById('lightbox-img').src = BASE_URL + foto.archivo;
  document.getElementById('lightbox-img').alt = foto.titulo;
  document.getElementById('lightbox-caption').textContent =
    foto.titulo + ' (' + (index + 1) + ' / ' + galeriaActiva.length + ')';

  document.querySelectorAll('.thumb').forEach(function(t, i) {
    t.classList.toggle('activa', i === index);
  });
}

function cambiarFoto(direccion) {
  fotoActual = (fotoActual + direccion + galeriaActiva.length) % galeriaActiva.length;
  mostrarFoto(fotoActual);
}

function generarMiniaturas() {
  var contenedor = document.getElementById('lightbox-thumbnails');
  contenedor.innerHTML = '';
  galeriaActiva.forEach(function(foto, i) {
    var img = document.createElement('img');
    img.src = BASE_URL + foto.archivo;
    img.alt = foto.titulo;
    img.className = 'thumb' + (i === 0 ? ' activa' : '');
    img.onclick = function() { fotoActual = i; mostrarFoto(i); };
    contenedor.appendChild(img);
  });
}

function cerrarLightbox() {
  document.getElementById('lightbox-overlay').style.display = 'none';
  document.body.style.overflow = '';
}

// ============================================================
// EVENTOS — todos desde DOMContentLoaded para evitar conflictos
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

  // Botón cerrar (X)
  document.getElementById('btn-cerrar').addEventListener('click', function(e) {
    e.stopPropagation();
    cerrarLightbox();
  });

  // Botón anterior
  document.getElementById('btn-prev').addEventListener('click', function(e) {
    e.stopPropagation();
    cambiarFoto(-1);
  });

  // Botón siguiente
  document.getElementById('btn-next').addEventListener('click', function(e) {
    e.stopPropagation();
    cambiarFoto(1);
  });

  // Clic en el fondo oscuro cierra el lightbox
  document.getElementById('lightbox-overlay').addEventListener('click', function(e) {
    if (e.target === this) cerrarLightbox();
  });

  // Teclado
  document.addEventListener('keydown', function(e) {
    var overlay = document.getElementById('lightbox-overlay');
    if (overlay.style.display !== 'flex') return;
    if (e.key === 'ArrowRight') cambiarFoto(1);
    if (e.key === 'ArrowLeft')  cambiarFoto(-1);
    if (e.key === 'Escape')     cerrarLightbox();
  });

  // Menú hamburguesa
  var hamburger = document.querySelector('.hamburger');
  var navMenu   = document.querySelector('.nav-menu');
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Formulario de contacto
  var contactForm = document.querySelector('.contacto-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
      contactForm.reset();
    });
  }

});
