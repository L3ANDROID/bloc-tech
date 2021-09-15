//funcion que ordena cada comentario en un card
const commentCard = (comment) => {
  let cardContainer = document.getElementById('card-container')
  let card = document.createElement('div');
  card.className = 'card shadow cursor-pointer';

  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  let title = document.createElement('h5');
  title.innerText = comment.author;
  title.className = 'card-title';

  let color = document.createElement('div');
  color.innerText = comment.comment;
  color.className = 'card-color';


  cardBody.appendChild(title);
  cardBody.appendChild(color);
  card.appendChild(cardBody);
  cardContainer.appendChild(card);
}

//io enciende la conexion para que mi cliente empiece a emitir y recibir eventos y se guarda en una variable
const server = io();
//el servidor de cliente emite "hello:peter" para que lo resiva el interno
// server.emit("hello:peter", "Spiderman no way home")

//al iniciar la pagina que verifique si existen comentarios guardados y los muestre en pantalla
server.emit("init:page","Este evento se inicia al cargar la pagina y envia el evento que enviará los comentarios")
server.on("init:comments", (comments) => {
    console.log(comments)
    comments.forEach( comment => {
        commentCard(comment)
      });
    //   document.getElementById("slideContainer").innerHTML = str;
})

// Capturar los texto de mis inputs
//* Primero capture mi formulario que tiene la clase form-comment
const form = document.querySelector(".form-comment");

//? Cuando detectectes el evento submit de este form haz lo siguiente
form.addEventListener("submit", function (e) {
  //? Evitar que recargue la pagina
  e.preventDefault();

  const comment = e.target[0].value;
  const author = e.target[1].value;
  const body = { comment, author };

  //* Envia el evento al servidor para que este guarde mensaje
  server.emit("new:comment", body);

  //* Esta a la espera de una respuesta (el res)
  server.on("save:comment", (message) => {
      console.log(message.message)
    commentCard(message.message)
  });

  e.target[0].value = "";
  e.target[1].value = "";

  // ?Quiero guarda estos datos en un array en mi servidor
});