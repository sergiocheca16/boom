const userInput = document.getElementById("userInput");
const botonIniciar = document.getElementById("iniciarJuego");
const cuentaAtras = document.getElementById("countdown");
const resultado = document.getElementById("result");
const reinicio = document.getElementById("restart");

let numeroAleatorio;
let tiempoRestante;
let intervalo;

//Funcion para generar nº aleatorio entre 1 y 3
function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 3) + 1;
}

//Funcion para la cuenta atras
function iniciarCuentaAtras() {
    return new Promise((resolve) => {
        tiempoRestante = 5;
        cuentaAtras.textContent = `Cuenta atrás: ${tiempoRestante}`;

        intervalo = setInterval(() => {
            tiempoRestante--;
            cuentaAtras.textContent = `Cuenta atrás: ${tiempoRestante}`;

            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                resolve();
            }
        }, 1000);
    });
}

//Iniciar el juego
async function iniciarJuego() {
    const numeroJugador = parseInt(userInput.value);

    if (!numeroJugador || numeroJugador < 1 || numeroJugador > 3) {
        resultado.textContent = "Por favor, introduce un número válido entre 1 y 3.";
        return;
    }

    // Deshabilitar los controles mientras el juego está en curso
    botonIniciar.disabled = true;
    userInput.disabled = true;
    resultado.textContent = "Esperando el resultado...";

    numeroAleatorio = generarNumeroAleatorio();
    await iniciarCuentaAtras();

    // Mostrar resultados después de la cuenta atrás
    if (numeroJugador === numeroAleatorio) {
        resultado.textContent = `¡Has salvado el mundo! Elegiste ${numeroJugador}, el número correcto era ${numeroAleatorio}.`;
    } else {
        resultado.textContent = `La bomba ha estallado. Elegiste ${numeroJugador}, el número correcto era ${numeroAleatorio}.`;
    }

    reinicio.style.display = 'inline-block'; // Mostrar botón de reinicio
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Restablecer valores
    clearInterval(intervalo);
    tiempoRestante = 5;
    cuentaAtras.textContent = "Cuenta atrás: 5";
    resultado.textContent = "";
    userInput.value = "";
    botonIniciar.disabled = false;
    userInput.disabled = false;
    reinicio.style.display = 'none';
}

// Asociar eventos a los botones
botonIniciar.addEventListener('click', iniciarJuego);
reinicio.addEventListener('click', reiniciarJuego);
