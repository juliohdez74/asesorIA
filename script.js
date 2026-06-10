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
    { archivo: 'img06.jpeg', titulo: 'Estudiantes en laboratorio - 6' },
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
    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'width:60px;height:60px;display:inline-flex;align-items:center;justify-content:center;border-radius:6px;overflow:hidden;cursor:pointer;';

    var img = document.createElement('img');
    img.src = BASE_URL + foto.archivo;
    img.alt = foto.titulo;
    img.className = 'thumb' + (i === 0 ? ' activa' : '');
    img.onclick = function() { fotoActual = i; mostrarFoto(i); };
    img.onerror = function() {
      this.style.display = 'none';
      wrapper.style.background = '#333';
      wrapper.style.border = '2px dashed #f5576c';
      wrapper.title = 'Archivo no encontrado: ' + foto.archivo;
      var lbl = document.createElement('span');
      lbl.textContent = (i + 1);
      lbl.style.cssText = 'color:#f5576c;font-size:11px;font-weight:bold;';
      wrapper.appendChild(lbl);
      console.error('Imagen no encontrada:', BASE_URL + foto.archivo);
    };

    wrapper.appendChild(img);
    contenedor.appendChild(wrapper);
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

  // ============================================================
  // MÚSICA DE FONDO
  // ============================================================
  var music   = document.getElementById('bg-music');
  var btnMus  = document.getElementById('btn-musica');
  var playing = false;

  btnMus.addEventListener('click', function() {
    if (playing) {
      music.pause();
      btnMus.innerHTML = '<i class="fas fa-music"></i>';
      btnMus.classList.remove('sonando');
    } else {
      music.play().catch(function() {});
      btnMus.innerHTML = '<i class="fas fa-pause"></i>';
      btnMus.classList.add('sonando');
    }
    playing = !playing;
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
