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
    const targetDate = new Date("March 20, 2026 00:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            clearInterval(timer);
            if (!esRenacimiento) transformarPagina();
        } else if (countdown) {
            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const m = Math.floor((distance / 1000 / 60) % 60);
            const s = Math.floor((distance / 1000) % 60);
            countdown.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
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
    document.body.classList.add('renacido');
}

const ashContainer = document.querySelector(".ash-container");
function createAsh() {
    if (!ashContainer) return;
    const ash = document.createElement("div");
    ash.classList.add("ash");
    ash.style.left = Math.random() * 100 + "vw";
    ashContainer.appendChild(ash);
    setTimeout(() => ash.remove(), 8000);
}
setInterval(createAsh, 300);