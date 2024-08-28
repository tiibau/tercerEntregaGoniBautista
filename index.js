document.addEventListener("DOMContentLoaded", () => {
  class Beat {
    constructor(nombre, precio, genero) {
      this.nombre = nombre;
      this.precio = precio;
      this.genero = genero;
    }
  }

  class Carrito {
    constructor() {
      this.items = JSON.parse(localStorage.getItem("carrito")) || [];
    }

    agregarBeat(beat) {
      this.items.push(beat);
      this.save();
    }

    eliminarBeat(nombre) {
      this.items = this.items.filter((beat) => beat.nombre !== nombre);
      this.save();
    }

    calcularTotal(impuesto = 0.21) {
      const subtotal = this.items.reduce((suma, beat) => suma + beat.precio, 0);
      return subtotal + subtotal * impuesto;
    }

    verCarrito() {
      return this.items;
    }

    save() {
      localStorage.setItem("carrito", JSON.stringify(this.items));
    }
  }

  const beats = [
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

  const genresSection = document.getElementById("genres");
  const beatsSection = document.getElementById("beats");
  const cartSection = document.getElementById("cart");
  const checkoutSection = document.getElementById("checkout");
  const genreList = document.getElementById("genreList");
  const beatList = document.getElementById("beatList");
  const cartList = document.getElementById("cartList");
  const totalAmount = document.getElementById("totalAmount");
  const installmentAmount = document.getElementById("installmentAmount");
  const userNameInput = document.getElementById("userName");
  const startBtn = document.getElementById("startBtn");
  const finishPurchaseBtn = document.getElementById("finishPurchaseBtn");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const backToGenresBtn = document.getElementById("backToGenresBtn");

  const carrito = new Carrito();

  function showGenres() {
    document.getElementById("welcome").style.display = "none";
    genresSection.style.display = "block";

    const genres = ["rap", "R&B", "rock", "pop", "reggae", "indie", "EDM"];
    genreList.innerHTML = "";

    genres.forEach((genre) => {
      const li = document.createElement("li");
      li.textContent = genre;
      li.addEventListener("click", () => {
        showBeats(genre);
      });
      genreList.appendChild(li);
    });
  }

  function showBeats(genero) {
    genreList.innerHTML = "";
    genresSection.style.display = "none";
    beatsSection.style.display = "block";

    const filteredBeats = beats.filter(
      (beat) => beat.genero.toLowerCase() === genero.toLowerCase()
    );
    beatList.innerHTML = "";

    filteredBeats.forEach((beat) => {
      const li = document.createElement("li");
      li.textContent = `${beat.nombre} - $${beat.precio}`;
      const addButton = document.createElement("button");
      addButton.className = "add-to-cart";
      addButton.textContent = "Agregar al Carrito";
      addButton.addEventListener("click", () => {
        carrito.agregarBeat(beat);
        alert(`${beat.nombre} agregado al carrito.`);
      });
      li.appendChild(addButton);
      beatList.appendChild(li);
    });

    finishPurchaseBtn.addEventListener("click", showCart);
  }

  function showCart() {
    beatList.innerHTML = "";
    beatsSection.style.display = "none";
    cartSection.style.display = "block";

    const cartItems = carrito.verCarrito();
    cartList.innerHTML = "";

    cartItems.forEach((beat) => {
      const li = document.createElement("li");
      li.textContent = `${beat.nombre} - $${beat.precio}`;
      const removeButton = document.createElement("button");
      removeButton.className = "remove-from-cart";
      removeButton.textContent = "Eliminar";
      removeButton.addEventListener("click", () => {
        carrito.eliminarBeat(beat.nombre);
        showCart();
      });
      li.appendChild(removeButton);
      cartList.appendChild(li);
    });

    checkoutBtn.addEventListener("click", showCheckout);
    clearCartBtn.addEventListener("click", () => {
      localStorage.removeItem("carrito");
      showCart();
    });
  }

  function showCheckout() {
    cartSection.style.display = "none";
    checkoutSection.style.display = "block";

    const total = carrito.calcularTotal();
    const cuotas = parseInt(
      prompt("¿En cuántas cuotas deseas pagar? (máximo 6)"),
      10
    );
    const cantidadCuotas = cuotas > 0 && cuotas <= 6 ? cuotas : 1;
    const cuota = (total / cantidadCuotas).toFixed(2);

    totalAmount.textContent = `Monto total a pagar (con impuestos): $${total.toFixed(
      2
    )}`;
    installmentAmount.textContent = `Monto por cuota (si se paga en ${cantidadCuotas} cuotas): $${cuota}`;

    backToGenresBtn.addEventListener("click", showGenres);
  }

  startBtn.addEventListener("click", () => {
    const userName = userNameInput.value.trim();
    if (userName) {
      document.getElementById("welcome").style.display = "none";
      showGenres();
      alert(`¡Bienvenido, ${userName}!`);
    } else {
      alert("Por favor, ingresa tu nombre para continuar.");
    }
  });
});
