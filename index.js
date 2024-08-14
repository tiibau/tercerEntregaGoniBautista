let saludoUsuario = prompt("¿Cómo prefieres que te llamemos?");
if (saludoUsuario) {
  saludoUsuario = saludoUsuario;
} else {
  saludoUsuario = "NN";
}
console.log(`Bienvenido ${saludoUsuario} a la mejor plataforma de beats!`);

let generosDisponibles = [
  "rap",
  "R&B",
  "rock",
  "pop",
  "reggae",
  "indie",
  "EDM",
];
console.log("Géneros disponibles: " + generosDisponibles.join(", "));

class Beat {
  constructor(nombre, precio, genero) {
    this.nombre = nombre;
    this.precio = precio;
    this.genero = genero;
  }
}

class Carrito {
  constructor() {
    this.items = [];
  }

  agregarBeat(beat) {
    this.items.push(beat);
  }

  eliminarBeat(nombre) {
    this.items = this.items.filter((beat) => beat.nombre !== nombre);
  }

  calcularTotal(impuesto = 0.21) {
    let subtotal = this.items.reduce((suma, beat) => suma + beat.precio, 0);
    return subtotal + subtotal * impuesto;
  }

  verCarrito() {
    if (this.items.length === 0) {
      console.log("El carrito está vacío.");
    } else {
      console.log("Carrito de compras:");
      this.items.forEach((beat, index) => {
        console.log(`${index + 1}. ${beat.nombre} - $${beat.precio}`);
      });
    }
  }
}

let beats = [
  new Beat("'Dream' - Boom bap classic type beat", 30, "rap"),
  new Beat("'Powder' - Chill 90s rap beat", 35, "rap"),
  new Beat("'Genesis' - Hard rap beat 2024", 40, "rap"),
  new Beat("'Too good for you' - R&B beat", 45, "R&B"),
  new Beat("'Money' - Instrumental R&B", 50, "R&B"),
  new Beat("'L.O.V.E.' - R&B new type beat", 55, "R&B"),
  new Beat("'Tiempos de cambiar' - Instrumental rock", 60, "rock"),
  new Beat("'Esmeralda' - 'Guasones' rock type beat", 65, "rock"),
  new Beat("'Soul' - Modern rock type beat", 70, "rock"),
];

function filtrarBeatsPorGenero(genero) {
  return beats.filter(
    (beat) => beat.genero.toLowerCase() === genero.toLowerCase()
  );
}

let carrito = new Carrito();

let preguntaGenero = prompt(
  `Dime ${saludoUsuario}, ¿qué género musical deseas explorar?`
);
let opciones = filtrarBeatsPorGenero(preguntaGenero);

if (opciones.length > 0) {
  console.log(
    `Aquí están tus opciones de instrumentales para el género ${preguntaGenero}:`
  );

  opciones.forEach((beat, index) => {
    console.log(`${index + 1}. ${beat.nombre} - $${beat.precio}`);
  });

  let continuar = true;

  while (continuar) {
    let seleccionBeat = parseInt(
      prompt(
        `Selecciona el beat que deseas comprar (elige un número del 1 al ${opciones.length}):`
      ),
      10
    );

    if (seleccionBeat > 0 && seleccionBeat <= opciones.length) {
      carrito.agregarBeat(opciones[seleccionBeat - 1]);
      console.log(`${opciones[seleccionBeat - 1].nombre} agregado al carrito.`);
    } else {
      console.log("Selección de beat no válida.");
    }

    continuar = confirm("¿Quieres agregar otro beat?");
  }

  carrito.verCarrito();

  if (carrito.items.length > 0) {
    let eliminar = confirm("¿Deseas eliminar algún beat del carrito?");
    while (eliminar) {
      let nombreEliminar = prompt(
        "Escribe el nombre exacto del beat que deseas eliminar:"
      );
      carrito.eliminarBeat(nombreEliminar);
      carrito.verCarrito();
      eliminar = confirm("¿Deseas eliminar otro beat?");
    }

    let cantidadCuotas = parseInt(
      prompt("¿En cuántas cuotas deseas pagar? (máximo 6)"),
      10
    );
    cantidadCuotas =
      cantidadCuotas > 0 && cantidadCuotas <= 6 ? cantidadCuotas : 1;

    let total = carrito.calcularTotal();
    let cuota = (total / cantidadCuotas).toFixed(2);

    console.log(`Monto total a pagar (con impuestos): $${total.toFixed(2)}`);
    console.log(
      `Monto por cuota (si se paga en ${cantidadCuotas} cuotas): $${cuota}`
    );
  }
} else {
  console.log(
    `Lo siento, no tenemos opciones para el género ${preguntaGenero}.`
  );
}
