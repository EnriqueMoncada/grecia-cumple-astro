// Variable de estado global
let esRenacimiento = false;
const API_URL = "https://sheetdb.io/api/v1/r2bcpxn347u3t";

// --- FUNCIÓN CARGAR MENSAJES ---
async function cargarMensajes() {
    const contenedorMensajes = document.getElementById('contenedor-mensajes-modal');
    if (!contenedorMensajes) return;

    contenedorMensajes.innerHTML = '<p class="loading-text">Consultando el más allá...</p>';

    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
        
        console.log("Datos recibidos de SheetDB:", datos); // Esto te dirá qué nombres de columna lee el sistema

        contenedorMensajes.innerHTML = '';
        
        if (!datos || datos.length === 0) {
            contenedorMensajes.innerHTML = '<p>El libro está vacío... por ahora.</p>';
            return;
        }

        datos.reverse().forEach(m => {
            const div = document.createElement('div');
            div.className = 'mensaje-card';
            
            // Si esto falla es porque el Excel tiene nombres distintos a 'nombre' y 'mensaje'
            const nombreVal = m.nombre || "Anónimo";
            const mensajeVal = m.mensaje || "Dejó un mensaje silencioso...";

            div.innerHTML = `<strong>${nombreVal}</strong><p>"${mensajeVal}"</p>`;
            contenedorMensajes.appendChild(div);
        });
    } catch (error) {
        console.error("Error cargando mensajes:", error);
        contenedorMensajes.innerHTML = '<p>No se pudo contactar con los espíritus.</p>';
    }
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. COUNTDOWN
    const countdown = document.getElementById("countdown");
    const targetDate = new Date("March 10, 2026 00:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            clearInterval(timer);
            // Forzamos el contador a cero al terminar
            if (countdown) {
                countdown.innerHTML = "00d 00h 00m 00s";
            }
            if (!esRenacimiento) transformarPagina();
        } else if (countdown) {
            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const m = Math.floor((distance / 1000 / 60) % 60);
            const s = Math.floor((distance / 1000) % 60);
            
            // Usamos padStart para que siempre tenga dos dígitos (01 en lugar de 1)
            const dDisplay = String(d).padStart(2, '0');
            const hDisplay = String(h).padStart(2, '0');
            const mDisplay = String(m).padStart(2, '0');
            const sDisplay = String(s).padStart(2, '0');
            
            countdown.innerHTML = `${dDisplay}d ${hDisplay}h ${mDisplay}m ${sDisplay}s`;
        }
    }, 1000);

    // 2. MODAL Y FORMULARIO
    const modalLibro = document.getElementById('modal-libro');
    const btnAbrirLibro = document.getElementById('btn-abrir-libro');
    const btnCerrarLibro = document.querySelector('.cerrar-libro');
    const formDeseos = document.getElementById('form-deseos');

    if (btnAbrirLibro && modalLibro) {
        btnAbrirLibro.addEventListener('click', () => {
            modalLibro.style.display = "block";
            cargarMensajes();
        });
    }

    if (btnCerrarLibro && modalLibro) {
        btnCerrarLibro.addEventListener('click', () => {
            modalLibro.style.display = "none";
        });
    }

    // ENVÍO DE DATOS
    if (formDeseos) {
        formDeseos.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = "Grabando...";
            btn.disabled = true;

            // IMPORTANTE: Los nombres aquí deben ser IGUALES a los del Excel (A1 y B1)
            const payload = {
                data: [
                    { 
                        "nombre": document.getElementById('nombre').value, 
                        "mensaje": document.getElementById('mensaje').value 
                    }
                ]
            };

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    alert("Tu mensaje ha sido guardado.");
                    e.target.reset();
                    cargarMensajes();
                }
            } catch (error) {
                alert("Error al enviar.");
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }

    // 3. VELA
    const vela = document.getElementById('vela');
    const estadoVela = document.getElementById('estado');
    if (vela && estadoVela) {
        vela.addEventListener('click', () => {
            vela.classList.toggle('encendida');
            estadoVela.innerText = vela.classList.contains('encendida') ? "La llama sigue viva." : "La llama se ha extinguido.";
        });
    }

    // 4. ORÁCULO
    const triggerOraculo = document.getElementById('trigger-oraculo');
    const sentenciaText = document.getElementById('sentencia');
    if (triggerOraculo && sentenciaText) {
        const frases = ["Los 30 son el nuevo 'ya me duele la espalda'.", "La madurez es solo una trampa.", "Ya no se celebra, se sobrevive.", "Bienvenida la paz mental."];
        triggerOraculo.addEventListener('click', () => {
            sentenciaText.innerText = `"${frases[Math.floor(Math.random() * frases.length)]}"`;
        });
    }

    function changeText() {
  return number * number;
}

    // 5. SOBRE
    const sobre = document.getElementById("sobre");
    if (sobre) {
        sobre.addEventListener("click", () => sobre.classList.toggle("abierto"));
    }

    // 6. RINCÓN DEL OLVIDO
    const listaOlvido = document.getElementById('lista-olvido');
    if (listaOlvido) {
        listaOlvido.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                e.target.style.opacity = "0";
                setTimeout(() => e.target.remove(), 500);
            }
        });
    }

    // 7. CERRAR AL CLICAR FUERA
    window.addEventListener('click', (event) => {
        if (modalLibro && event.target == modalLibro) modalLibro.style.display = "none";
    });
});

// 8. TRANSFORMACIÓN Y CENIZAS
function transformarPagina() {
    if (esRenacimiento) return;
    esRenacimiento = true;
    
    // 1. Activar clase base
    document.body.classList.add('renacido');

    // --- CAMBIOS DE TEXTO ---

    // Hero Section
    const mainTitle = document.querySelector('.hero h1');
    if (mainTitle) mainTitle.innerText = "¡BIENVENIDOS LOS 30!";
    
    const subTitle = document.querySelector('.hero .sub');
    if (subTitle) subTitle.innerText = "La metamorfosis ha concluido con éxito.";
    
    const heroDate = document.querySelector('.hero .date');
    if (heroDate) heroDate.innerText = "Celebración — 20 de Marzo";

    // Sección de la Carta
    const cartaH2 = document.querySelector('.carta-section h2');
    if (cartaH2) cartaH2.innerText = "El Manifiesto de los 30";
    
    const cartaH3 = document.querySelector('.texto-carta h3');
    if (cartaH3) cartaH3.innerText = "Inicio de la Nueva Era";
    
    // Asegúrate de que en tu HTML estos párrafos tengan estas clases o usa nth-child
    const pCarta1 = document.querySelector('.p-carta1');
    if (pCarta1) pCarta1.innerText = "Hoy, 20 de marzo oficialmente damos la bienvenida a los 30.";

    const pCarta2 = document.querySelector('.p-carta2');
    if (pCarta2) pCarta2.innerText = "Atrás quedan los experimentos de los 20s. Hoy inauguramos una era donde la intensidad se convierte en poder, las dudas en certezas y las carcajadas en el mejor legado.";

    const firmaCarta = document.querySelector('.firma');
    if (firmaCarta) firmaCarta.innerText = "— Con amor, tu nuevo yo";


    // Acta de Defunción -> Certificado de Renacimiento
    const actaH2 = document.querySelector('.acta h2');
    if (actaH2) actaH2.innerText = "Certificado de Renacimiento";
    
    const actaCards = document.querySelectorAll('.acta .card p strong');
    actaCards.forEach(p => {
        const parent = p.parentElement;
        if (p.innerText.includes("Defunción")) parent.innerHTML = `<strong>Estado:</strong> Oficialmente Fabulosa`;
        if (p.innerText.includes("Causa")) parent.innerHTML = `<strong>Nivel de Sabiduría:</strong> +999 y con mucha más paz`;
        if (p.innerText.includes("Nombre")) parent.innerHTML = `<strong>Nombre:</strong> Los fabulosos 30`;
        if (p.innerText.includes("Fecha de Nacimiento")) parent.innerHTML = `<strong>Fecha de Renacimiento:</strong> 20 de marzo de 2026`;
    });

    // Testamento -> Manifiesto
    const testamentoH2 = document.querySelector('.testamento h2');
    if (testamentoH2) testamentoH2.innerText = "Manifiesto de Poder";

    // Rincón del Olvido -> El Jardín (Corregido para evitar el error ts2451)
    const olvidoH2 = document.querySelector('.olvido-section h2');
    const olvidoP = document.querySelector('.olvido-section p');
    const listaOlvido = document.getElementById('lista-olvido');

    if (olvidoH2) olvidoH2.innerText = "El Jardín del Renacimiento";
    if (olvidoP) olvidoP.innerText = "Haz clic para sembrar tus nuevas certezas:";

    if (listaOlvido) {
        listaOlvido.innerHTML = `
            <li>La libertad de ser yo misma</li>
            <li>Paz mental sobre todas las cosas</li>
            <li>Viajes sin pedir permiso</li>
            <li>Decir "no" sin dar explicaciones</li>
            <li>Proyectos que me apasionan</li>
        `;
        listaOlvido.classList.remove('');
        listaOlvido.classList.add('');
    }

    // Mostrar sección de renacimiento extra
    const renacimientoSection = document.getElementById('renacimiento');
    if (renacimientoSection) renacimientoSection.style.display = 'block';

    // Cambiar texto del formulario de deseos
    const deseosH2 = document.querySelector('.deseos-section h2');
    if (deseosH2) deseosH2.innerText = "Brindis Digital";
    
    const deseosH3 = document.querySelector('.deseos-section h3');
    if (deseosH3) deseosH3.innerText = "Deja un mensaje para la nueva década";

    console.log("¡La metamorfosis se ha completado!");
}s

const ashContainer = document.querySelector(".ash-container");

function createAsh() {
    const ash = document.createElement("div");
    ash.classList.add("ash");
    
    // Insertamos el emoji de la vela
    ash.innerText = "🕯️";
    
    if (typeof esRenacimiento !== 'undefined' && esRenacimiento) {
        ash.classList.add('party-mode');
    }
    
    // Posición y animación
    ash.style.left = Math.random() * 100 + "vw";
    ash.style.animationDuration = (4 + Math.random() * 6) + "s"; // Un poco más lento para que luzca
    
    // Tamaño aleatorio para variedad
    const size = (Math.random() * 10 + 15) + "px";
    ash.style.fontSize = size;
    
    ashContainer.appendChild(ash);
    
    // Limpieza
    setTimeout(() => ash.remove(), 10000);
}

setInterval(createAsh, 400); // Un pelín más lento el intervalo para no saturar la pantalla