// --- Registro ---
document.getElementById("registroForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;

    fetch("registro.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `usuario=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        document.getElementById("registroForm").reset();
    });
});

// --- Login ---
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let usuario = document.getElementById("loginUsuario").value;
    let password = document.getElementById("loginPassword").value;

    fetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `usuario=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`
    })
    .then(res => res.text())
    .then(data => {
        if (data.includes("correcto")) {
            alert("Bienvenido " + usuario);
            document.getElementById("registro-section").style.display = "none";
            document.getElementById("contenido").style.display = "block";
        } else {
            alert(data);
        }
    });
});

// --- Carrito ---
let carrito = [];
let carritoLista = document.querySelector("#carrito ul");
let total = 0;

function actualizarTotal() {
    document.getElementById("total").textContent = total;
    document.getElementById("total-icono").textContent = total;
}

function actualizarCarrito() {
    carritoLista.innerHTML = "";
    total = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        let li = document.createElement("li");
        li.textContent = `${item.producto} x${item.cantidad} - $${item.precio * item.cantidad}`;

        let eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "❌";
        eliminarBtn.addEventListener("click", () => {
            // Restablecer stock en frontend
            let fila = item.fila;
            let stock = parseInt(fila.getAttribute("data-stock"));
            fila.setAttribute("data-stock", stock + 1);
            fila.children[4].textContent = stock + 1;

            // Restablecer stock en BD
            fetch("stock.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `producto=${encodeURIComponent(item.producto)}&cantidad=1&accion=devolver`
            });

            // Reducir cantidad o eliminar
            item.cantidad--;
            if (item.cantidad <= 0) {
                carrito.splice(index, 1);
            }
            actualizarCarrito();
        });

        li.appendChild(eliminarBtn);
        carritoLista.appendChild(li);
    });

    actualizarTotal();
}

// Botón Agregar
document.querySelectorAll(".agregar").forEach(btn => {
    btn.addEventListener("click", (e) => {
        let fila = e.target.closest("tr");
        let producto = fila.children[0].textContent;
        let precio = parseFloat(fila.children[3].textContent);
        let stock = parseInt(fila.getAttribute("data-stock"));

        if (stock > 0) {
            let existente = carrito.find(item => item.producto === producto);
            if (existente) {
                existente.cantidad++;
            } else {
                carrito.push({ producto, precio, fila, cantidad: 1 });
            }

            fila.setAttribute("data-stock", stock - 1);
            fila.children[4].textContent = stock - 1;

            // Actualizar stock en BD
            fetch("stock.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `producto=${encodeURIComponent(producto)}&cantidad=1&accion=restar`
            });

            actualizarCarrito();
        } else {
            alert("Producto agotado ❌");
        }
    });
});

// Eliminar Todo
document.getElementById("eliminarTodo").addEventListener("click", () => {
    carrito.forEach(item => {
        let fila = item.fila;
        let stock = parseInt(fila.getAttribute("data-stock"));
        fila.setAttribute("data-stock", stock + item.cantidad);
        fila.children[4].textContent = stock + item.cantidad;

        // Devolver stock en BD
        fetch("stock.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `producto=${encodeURIComponent(item.producto)}&cantidad=${item.cantidad}&accion=devolver`
        });
    });

    carrito = [];
    actualizarCarrito();
});

// Pagar
document.getElementById("pagar").addEventListener("click", () => {
    if (total > 0) {
        carrito.forEach(item => {
            fetch("pedido.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `producto=${encodeURIComponent(item.producto)}&precio=${encodeURIComponent(item.precio)}&cantidad=${item.cantidad}`
            });
        });

        alert(`Gracias por tu compra 🛒 Total pagado: $${total}`);
        carrito = [];
        actualizarCarrito();
    } else {
        alert("Tu carrito está vacío ❌");
    }
});

// --- Encuesta ---
document.getElementById("encuestaForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let opinion = document.getElementById("opinion").value;
    let correo = document.getElementById("correo").value;
    let experiencia = document.getElementById("experiencia").value;
    let sugerencia = document.getElementById("sugerencia").value;

    fetch("encuesta.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `opinion=${encodeURIComponent(opinion)}&correo=${encodeURIComponent(correo)}&experiencia=${encodeURIComponent(experiencia)}&sugerencia=${encodeURIComponent(sugerencia)}`
    })
    .then(res => res.text())
    .then(data => {
        alert(data);
        document.getElementById("encuestaForm").reset();
    });
});
