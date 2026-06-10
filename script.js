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

// Abre el lightbox
function abrirGaleria(nombre) {
  galeriaActiva = galerias[nombre];
  if (!galeriaActiva || galeriaActiva.length === 0) {
    alert('No se encontraron imágenes para esta galería.');
    return;
  }
  fotoActual = 0;
  generarMiniaturas();
  mostrarFoto(0);
  document.getElementById('lightbox-overlay').style.display = 'flex';
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

  document.querySelectorAll('.thumb').forEach(function(t, i) {
    t.classList.toggle('activa', i === index);
  });
}

// Navega entre fotos
function cambiarFoto(direccion) {
  fotoActual = (fotoActual + direccion + galeriaActiva.length) % galeriaActiva.length;
  mostrarFoto(fotoActual);
}

// Genera miniaturas
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

// Cierra el lightbox
function cerrarLightbox() {
  document.getElementById('lightbox-overlay').style.display = 'none';
  document.body.style.overflow = '';
}

// Clic en el overlay oscuro (fuera de la imagen) también cierra
document.addEventListener('DOMContentLoaded', function() {
  var overlay = document.getElementById('lightbox-overlay');
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      cerrarLightbox();
    }
  });
});

// Teclado
document.addEventListener('keydown', function(e) {
  var overlay = document.getElementById('lightbox-overlay');
  if (!overlay || overlay.style.display !== 'flex') return;
  if (e.key === 'ArrowRight') cambiarFoto(1);
  if (e.key === 'ArrowLeft') cambiarFoto(-1);
  if (e.key === 'Escape') cerrarLightbox();
});

// ============================================================
// MENÚ HAMBURGUESA
// ============================================================
var hamburger = document.querySelector('.hamburger');
var navMenu = document.querySelector('.nav-menu');

if (hamburger) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// ============================================================
// FORMULARIO DE CONTACTO
// ============================================================
var contactForm = document.querySelector('.contacto-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    contactForm.reset();
  });
}
