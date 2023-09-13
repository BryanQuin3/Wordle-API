const END_POINT =
  "https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase";

async function obtenerPalabra() {
  const response = await fetch(END_POINT);
  const data = await response.json();
  return data[0];
}
let palabra = "";

async function main() {
  palabra = await obtenerPalabra();
  let intentos = 6;
  const button = document.getElementById("guess-button");
  const INPUT = document.getElementById("guess-input");
  const contenedor = document.getElementById("guesses");
  const GRID = document.getElementById("grid");

  function leerIntento() {
    return INPUT.value.toUpperCase();
  }

  async function reiniciarJuego() {
    palabra = await obtenerPalabra();
    intentos = 6;
  }

  async function terminar(mensaje) {
    INPUT.disabled = true;
    button.disabled = true;
    contenedor.innerHTML = mensaje;
    await reiniciarJuego();
    setTimeout(function () {
      INPUT.disabled = false;
      button.disabled = false;
      INPUT.value = "";
      INPUT.focus();
      contenedor.innerHTML = "";
      GRID.innerHTML = "";
    }, 1500);
  }

  function intentar() {
    const INTENTO = leerIntento();

    if (INTENTO === "") {
      terminar("<h1>Debes ingresar una palabra</h1>");
      return;
    }

    if (INTENTO.length !== 5) {
      terminar("<h1>Debes ingresar una palabra de 5 letras</h1>");
      return;
    }

    if (INTENTO === palabra) {
      terminar("<h1>YOU WIN</h1>");
      return;
    }

    const ROW = document.createElement("div");
    ROW.className = "row";

    for (let i = 0; i < palabra.length; i++) {
      const SPAN = document.createElement("span");
      SPAN.className = "letter";

      if (INTENTO[i] === palabra[i]) {
        // Verde
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "#79b851";
      } else if (palabra.includes(INTENTO[i])) {
        // Amarillo
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "#f3c237";
      } else {
        // Gris
        SPAN.innerHTML = INTENTO[i];
        SPAN.style.backgroundColor = "#a4aec4";
      }

      ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);
  }

  button.addEventListener("click", function () {
    if (intentos > 0) {
      intentar();
      intentos--;

      if (intentos === 0) {
        terminar("<h1>GAME OVER</h1>");
      }
    }
  });
}

main();
