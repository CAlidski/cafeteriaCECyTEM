// ================= REGISTRO =================
const registroForm = document.getElementById("registroForm");

if (registroForm) {
    registroForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const password = document.getElementById("password").value.trim();

        fetch("registro.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `usuario=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`
        })
        .then(r => r.text())
        .then(r => {
            alert(r);
            if (r.includes("correctamente")) {
                registroForm.reset();
            }
        });
    });
}

// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const usuario = document.getElementById("loginUsuario").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        fetch("login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `usuario=${encodeURIComponent(usuario)}&password=${encodeURIComponent(password)}`
        })
        .then(r => r.text())
        .then(r => {

            r = r.trim();

            if (r === "Inicio de sesión correcto") {

                alert("Bienvenido " + usuario);

                document.getElementById("registro-section").style.display = "none";
                document.getElementById("contenido").style.display = "block";

            } else {

                alert(r);

            }

        });
    });
}

// ================= CARRITO =================

let carrito = [];
let total = 0;

const lista = document.querySelector("#carrito ul");

function actualizarCarrito(){

    lista.innerHTML="";
    total=0;

    carrito.forEach((item,index)=>{

        total += item.precio * item.cantidad;

        const li=document.createElement("li");

        li.innerHTML=`
        ${item.producto} x${item.cantidad}
        - $${item.precio*item.cantidad}
        <button onclick="eliminarProducto(${index})">❌</button>
        `;

        lista.appendChild(li);

    });

    document.getElementById("total").textContent=total;
    document.getElementById("total-icono").textContent=total;

}

function eliminarProducto(index){

    let item=carrito[index];

    fetch("stock.php",{

        method:"POST",

        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },

        body:`producto=${encodeURIComponent(item.producto)}&cantidad=${item.cantidad}&accion=devolver`

    });

    let fila=item.fila;

    let stock=parseInt(fila.dataset.stock);

    fila.dataset.stock=stock+item.cantidad;

    fila.children[4].textContent=stock+item.cantidad;

    carrito.splice(index,1);

    actualizarCarrito();

}

document.querySelectorAll(".agregar").forEach(btn=>{

    btn.addEventListener("click",function(){

        let fila=this.closest("tr");

        let producto=fila.children[0].textContent;

        let precio=parseFloat(fila.children[3].textContent);

        let stock=parseInt(fila.dataset.stock);

        if(stock<=0){

            alert("Producto agotado");

            return;

        }

        let existe=carrito.find(p=>p.producto===producto);

        if(existe){

            existe.cantidad++;

        }else{

            carrito.push({

                producto,

                precio,

                cantidad:1,

                fila

            });

        }

        fila.dataset.stock=stock-1;

        fila.children[4].textContent=stock-1;

        fetch("stock.php",{

            method:"POST",

            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },

            body:`producto=${encodeURIComponent(producto)}&cantidad=1&accion=restar`

        });

        actualizarCarrito();

    });

});

document.getElementById("eliminarTodo").addEventListener("click",()=>{

    carrito.forEach(item=>{

        fetch("stock.php",{

            method:"POST",

            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },

            body:`producto=${encodeURIComponent(item.producto)}&cantidad=${item.cantidad}&accion=devolver`

        });

    });

    carrito=[];

    actualizarCarrito();

});

document.getElementById("pagar").addEventListener("click",()=>{

    if(carrito.length===0){

        alert("Tu carrito está vacío");

        return;

    }

    carrito.forEach(item=>{

        fetch("pedido.php",{

            method:"POST",

            headers:{
                "Content-Type":"application/x-www-form-urlencoded"
            },

            body:`producto=${encodeURIComponent(item.producto)}&precio=${item.precio}&cantidad=${item.cantidad}`

        });

    });

    alert("Compra realizada correctamente");

    carrito=[];

    actualizarCarrito();

});

// ================= ENCUESTA =================

const encuesta=document.getElementById("encuestaForm");

if(encuesta){

encuesta.addEventListener("submit",function(e){

e.preventDefault();

fetch("encuesta.php",{

method:"POST",

headers:{
"Content-Type":"application/x-www-form-urlencoded"
},

body:new URLSearchParams({

opinion:opinion.value,

correo:correo.value,

experiencia:experiencia.value,

sugerencia:sugerencia.value

})

})

.then(r=>r.text())

.then(r=>{

alert(r);

encuesta.reset();

});

});

}
