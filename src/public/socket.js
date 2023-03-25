const socket = io();
let email, title, price, thumbnail;
const tProd = document.getElementById("tProd");
const formChat = document.getElementById("formChat");
const formProd = document.getElementById("formProd");
const saludo = document.getElementById("saludo");
function cargarProductos(arr) {
  tProd.innerHTML = arr.length ? escribirTabla(arr) : `<h3>No hay productos</h3>`;
}
function escribirTabla(arr) {
  let contendor = ``;
  arr.forEach((producto) => {
    contendor += `<tr>
                        <th scope="row">${producto.title}</th>
                        <td>$${producto.price}</td>
                        <td>${producto.thumbnail}</td>
                        <td>${producto.id}</td>
                       </tr>`
  })
  return contendor
}
formProd.addEventListener("submit", (e) => {
  e.preventDefault();
  title = e.target.title.value;
  price = e.target.price.value;
  thumbnail = e.target.thumbnail.value;
  const nuevoProd = {
    title,
    price,
    thumbnail
  }
  socket.emit("newProd", nuevoProd)
})
const usuario = {};
formChat.addEventListener("submit", (e) => {
  e.preventDefault();
  usuario.author = {
    id: e.target.email.value,
    nombre: e.target.nombre.value,
    apellido: e.target.apellido.value,
    edad: e.target.edad.value,
    alias: e.target.alias.value,
    avatar: e.target.avatar.value
  }
  socket.emit("user", usuario);
  e.target.email.value = "";
  formChat.classList.add('disb')
})
//traen los productos
socket.on("productos", (productos) => {
  cargarProductos(productos);
})
socket.on("actuProd", productos => {
  cargarProductos(productos);
})