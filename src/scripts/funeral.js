// Variable de estado global
let esRenacimiento = false;

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

    // 2. MODAL DE RECUERDOS (EL LIBRO)
    const modalLibro = document.getElementById('modal-libro');
    const btnAbrir = document.getElementById('btn-abrir-libro');
    const btnCerrar = document.querySelector('.cerrar-libro');
    const contenedorMensajes = document.getElementById('contenedor-mensajes-modal');
    const formDeseos = document.getElementById('form-deseos');

    let mensajesBD = [
        { nombre: "El Destino", mensaje: "Los 30 te esperan con los brazos abiertos y una rodilla adolorida." },
        { nombre: "Anónimo", mensaje: "Descansen en paz las malas decisiones de los viernes." }
    ];

    function renderizarMensajes() {
        if (!contenedorMensajes) return;
        contenedorMensajes.innerHTML = '';
        mensajesBD.forEach(m => {
            const div = document.createElement('div');
            div.className = 'mensaje-card';
            div.innerHTML = `<strong>${m.nombre}</strong><p>"${m.mensaje}"</p>`;
            contenedorMensajes.appendChild(div);
        });
    }

    // FIX: Validación para evitar el error "Cannot read properties of null (reading 'style')"
    if (btnAbrir && modalLibro) {
        btnAbrir.addEventListener('click', () => {
            renderizarMensajes();
            modalLibro.style.display = "block";
        });
    }

    if (btnCerrar && modalLibro) {
        btnCerrar.addEventListener('click', () => {
            modalLibro.style.display = "none";
        });
    }

    // 3. FORMULARIO DE DESEOS
    if (formDeseos) {
        formDeseos.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombreInput = document.getElementById('nombre');
            const mensajeInput = document.getElementById('mensaje');
            
            if (nombreInput && mensajeInput) {
                mensajesBD.unshift({ nombre: nombreInput.value, mensaje: mensajeInput.value });
                alert("Tu deseo ha sido guardado en el libro de los muertos.");
                e.target.reset();
            }
        });
    }

    // 4. VELA
    const vela = document.getElementById('vela');
    const estadoVela = document.getElementById('estado');
    if (vela && estadoVela) {
        vela.addEventListener('click', () => {
            vela.classList.toggle('encendida');
            estadoVela.innerText = vela.classList.contains('encendida') ? "La llama sigue viva." : "La llama se ha extinguido.";
        });
    }

    // 5. ORÁCULO
    const triggerOraculo = document.getElementById('trigger-oraculo');
    const sentenciaText = document.getElementById('sentencia');
    if (triggerOraculo && sentenciaText) {
        const frases = ["Los 30 son el nuevo 'ya me duele la espalda'.", "La madurez es solo una trampa.", "Ya no se celebra, se sobrevive.", "Bienvenida la paz mental.", "Menos fiesta, más siesta."];
        triggerOraculo.addEventListener('click', () => {
            sentenciaText.innerText = `"${frases[Math.floor(Math.random() * frases.length)]}"`;
        });
    }

    // 6. SOBRE
    const sobre = document.getElementById("sobre");
    if (sobre) {
        sobre.addEventListener("click", () => sobre.classList.toggle("abierto"));
    }

    // 7. CERRAR MODALES AL CLICAR FUERA
    window.addEventListener('click', (event) => {
        if (modalLibro && event.target == modalLibro) {
            modalLibro.style.display = "none";
        }
        const modalGaleria = document.getElementById('modal');
        if (modalGaleria && event.target == modalGaleria) {
            modalGaleria.style.display = "none";
        }
    });
});

// Función de transformación (Asegúrate de tener las clases CSS correspondientes)
function transformarPagina() {
    if (esRenacimiento) return;
    esRenacimiento = true;
    
    document.body.classList.add('renacido', 'animar-renacimiento');
    
    const heroH1 = document.querySelector('.hero h1');
    const heroSub = document.querySelector('.hero .sub');
    const renacimientoSec = document.getElementById('renacimiento');
    
    if (heroH1) heroH1.innerText = "✨ ¡Bienvenidos a los 30! ✨";
    if (heroSub) heroSub.innerText = "La metamorfosis ha sido un éxito.";
    if (renacimientoSec) {
        renacimientoSec.style.display = "block";
        setTimeout(() => { renacimientoSec.style.opacity = "1"; }, 50);
    }
}

// 8. CENIZAS
const ashContainer = document.querySelector(".ash-container");
function createAsh() {
    if (!ashContainer) return;
    const ash = document.createElement("div");
    ash.classList.add("ash");
    if (esRenacimiento) ash.classList.add('party-mode');
    
    ash.style.left = Math.random() * 100 + "vw";
    ash.style.animationDuration = (3 + Math.random() * 5) + "s";
    ash.style.width = ash.style.height = (Math.random() * 5 + 2) + "px";
    
    ashContainer.appendChild(ash);
    setTimeout(() => ash.remove(), 8000);
}
setInterval(createAsh, 300);