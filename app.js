const express = require("express"); // Importa ExpressJS. Más info de Express en =>https://expressjs.com/es/starter/hello-world.html

const app = express(); // Crea una instancia de ExpressJS

const port = 3000;

app.use(express.json()); // Permite que el servidor analice el cuerpo de las peticiones como JSON

const people = require("./json/people.json"); // Importa los datos iniciales (generados en https://www.mockaroo.com/)

app.get("/", (req, res) => {
  // El primer parámetro SIEMPRE es asociado a la request (petición) y el segundo a la response (respuesta)
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.get("/people", (req, res) => {
  res.json(people); // Enviamos todo el array
});

app.get("/people/:index", (req, res) => {
  /*La propiedad "params" del request permite acceder a los parámetros de la URL 
    (importante no confundir con la "query", que serían los parámetros que se colocan 
    luego del signo "?" en la URL)
   */
  res.json(people[req.params.index]); // Enviamos el elemento solicitado por su índice
});

app.post("/people", (req, res) => {
  /* La propiedad "body" del request permite acceder a los datos 
       que se encuentran en el cuerpo de la petición */

  people.push(req.body); // Añadimos un nuevo elemento al array

  res.json(req.body); // Le respondemos al cliente el objeto añadido
});

app.put("/people/:index", (req, res) => {
  /* COMPLETA EL CÓDIGO NECESARIO:
     Para que se pueda actualizar el objeto asociado al índice indicado en la URL 
   */
  const personIndex = parseInt(req.params.index); // Pasamos el parámetro index a un entero
  const updatedPerson = req.body; // Crea una constante con la información actualizada que se le da en el cuerpo de la solicitud 
  
  if (personIndex < 0 || personIndex >= people.length) return res.status(404).send ({ message: 'Persona no encontrada.'}); // Si no encuentra ninguna persona con ese índice, devuelve un error

  people[personIndex] = { ...people[personIndex], ...updatedPerson }; // Actualiza el la persona con la información nueva
  res.json(people[personIndex]); // Le respondemos al cliente el objeto añadido y actualizado
});

app.delete("/people/:index", (req, res) => {
  /* COMPLETA EL CÓDIGO NECESARIO:
     Para que se pueda eliminar el objeto asociado al índice indicado en la URL 
   */
    const personIndex = parseInt(req.params.index); // Convertimos en entero el índice que nos pasan en el parámetro

    if (personIndex < 0 || personIndex >= people.length) return res.status(404).send ({ message: 'Persona no encontrada.'}); // Si no encuentra a la persona devuelve un mensaje de error

    people.splice(personIndex, 1); // Si la encuentra, elimina una persona desde el lugar del index proporcionado (o sea a la persona con ese index)
    res.status(200).send({ message: 'Persona eliminada correctamente.'}); // Devuelve un mensaje para confirmar que la persona se eliminó correctamente
});

// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
