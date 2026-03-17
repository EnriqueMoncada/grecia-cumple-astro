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
        
        contenedorMensajes.innerHTML = '';
        
        if (!datos || datos.length === 0) {
            contenedorMensajes.innerHTML = '<p>El libro está vacío... por ahora.</p>';
            return;
        }

        datos.reverse().forEach(m => {
            const div = document.createElement('div');
            div.className = 'mensaje-card';
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
    
    // 1. COUNTDOWN (Corregido a 20 de Marzo)
    const countdown = document.getElementById("countdown");
    const targetDate = new Date("March 10, 2026 00:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            clearInterval(timer);
            if (countdown) countdown.innerHTML = "00d 00h 00m 00s";
            if (!esRenacimiento) transformarPagina();
        } else if (countdown) {
            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const m = Math.floor((distance / 1000 / 60) % 60);
            const s = Math.floor((distance / 1000) % 60);
            
            countdown.innerHTML = `${String(d).padStart(2, '0')}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
        }
    }, 1000);

    // 2. LÓGICA DE GALERÍA (LIGHTBOX)
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalText = document.getElementById('modal-text');
    const cardsGaleria = document.querySelectorAll('.exceso-card');

    cardsGaleria.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const txt = card.querySelector('p');
            if (modal && modalImg) {
                modalImg.src = img.src;
                if (modalText) modalText.innerText = txt.innerText;
                modal.style.display = "flex";
            }
        });
    });

    // Cerrar modal imagen
    if (modal) {
        modal.addEventListener('click', () => modal.style.display = "none");
    }

    // 3. LIBRO DE RECUERDOS Y FORMULARIO
    const modalLibro = document.getElementById('modal-libro');
    const btnAbrirLibro = document.getElementById('btn-abrir-libro');
    const btnCerrarLibro = document.querySelector('.cerrar-libro');
    const formDeseos = document.getElementById('form-deseos');

    if (btnAbrirLibro) btnAbrirLibro.addEventListener('click', () => {
        modalLibro.style.display = "block";
        cargarMensajes();
    });

    if (btnCerrarLibro) btnCerrarLibro.addEventListener('click', () => modalLibro.style.display = "none");

    if (formDeseos) {
        formDeseos.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Grabando...";
            btn.disabled = true;

            const payload = {
                data: [{ 
                    "nombre": document.getElementById('nombre').value, 
                    "mensaje": document.getElementById('mensaje').value 
                }]
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
            } catch (error) { alert("Error al enviar."); }
            finally { btn.innerText = originalText; btn.disabled = false; }
        });
    }

    // 4. VELA Y SOBRE
    const vela = document.getElementById('vela');
    const estadoVela = document.getElementById('estado');
    if (vela) vela.addEventListener('click', () => {
        vela.classList.toggle('encendida');
        estadoVela.innerText = vela.classList.contains('encendida') ? "La llama sigue viva." : "La llama se ha extinguido.";
    });

    const sobre = document.getElementById("sobre");
    if (sobre) sobre.addEventListener("click", () => sobre.classList.toggle("abierto"));

    // 5. RINCÓN DEL OLVIDO (Acción inicial)
    const listaOlvido = document.getElementById('lista-olvido');
    if (listaOlvido) {
        listaOlvido.addEventListener('click', (e) => {
            if (e.target.tagName === 'LI') {
                e.target.style.opacity = "0";
                setTimeout(() => e.target.remove(), 500);
            }
        });
    }

    // 6. ORÁCULO
    const triggerOraculo = document.getElementById('trigger-oraculo');
    const sentenciaText = document.getElementById('sentencia');
    if (triggerOraculo && sentenciaText) {
        const frases = ["Los 30 son el nuevo 'ya me duele la espalda'.", "La madurez es solo una trampa.", "Ya no se celebra, se sobrevive.", "Bienvenida la paz mental."];
        triggerOraculo.addEventListener('click', () => {
            sentenciaText.innerText = `"${frases[Math.floor(Math.random() * frases.length)]}"`;
        });
    }

    window.addEventListener('click', (e) => { if (e.target == modalLibro) modalLibro.style.display = "none"; });
});

// 8. TRANSFORMACIÓN
function transformarPagina() {
    if (esRenacimiento) return;
    esRenacimiento = true;
    document.body.classList.add('renacido');

    // Hero
    document.querySelector('.hero h1').innerText = "¡BIENVENIDOS LOS 30!";
    document.querySelector('.hero .sub').innerText = "La metamorfosis ha concluido con éxito.";
    document.querySelector('.hero .date').innerText = "Celebración — 20 de Marzo";

    // Carta
    document.querySelector('.carta-section h2').innerText = "El Manifiesto de los 30";
    const p1 = document.querySelector('.p-carta1');
    const p2 = document.querySelector('.p-carta2');
    if(p1) p1.innerText = "Hoy, 20 de marzo oficialmente damos la bienvenida a los 30.";
    if(p2) p2.innerText = "Atrás quedan los experimentos de los 20s. Hoy inauguramos una era donde la intensidad se convierte en poder.";

    // Acta
    document.querySelector('.acta h2').innerText = "Certificado de Renacimiento";
    document.querySelectorAll('.acta .card p strong').forEach(p => {
        const parent = p.parentElement;
        if (p.innerText.includes("Defunción")) parent.innerHTML = `<strong>Estado:</strong> Oficialmente Fabulosa`;
        if (p.innerText.includes("Causa")) parent.innerHTML = `<strong>Nivel de Sabiduría:</strong> +999 y con mucha más paz`;
        if (p.innerText.includes("Nombre")) parent.innerHTML = `<strong>Nombre:</strong> Los fabulosos 30`;
    });

    // El Jardín
    const oH2 = document.querySelector('.olvido-section h2');
    const oP = document.querySelector('.olvido-section p');
    const oLista = document.getElementById('lista-olvido');
    if(oH2) oH2.innerText = "El Jardín del Renacimiento";
    if(oP) oP.innerText = "Haz clic para sembrar tus nuevas certezas:";
    if(oLista) {
        oLista.innerHTML = `<li>Libertad total</li><li>Paz mental</li><li>Viajes</li><li>Decir NO sin culpa</li>`;
        oLista.className = "lista-metas";
    }

    document.getElementById('renacimiento').style.display = 'block';
    console.log("¡Renacimiento completado!");
}

// 9. CENIZAS / CONFETI
const ashContainer = document.querySelector(".ash-container");
function createAsh() {
    if (!ashContainer) return;
    const ash = document.createElement("div");
    ash.className = "ash";
    ash.innerText = esRenacimiento ? "✨" : "🕯️";
    ash.style.left = Math.random() * 100 + "vw";
    ash.style.animationDuration = (4 + Math.random() * 6) + "s";
    ash.style.fontSize = (Math.random() * 10 + 15) + "px";
    ashContainer.appendChild(ash);
    setTimeout(() => ash.remove(), 10000);
}
setInterval(createAsh, 400);