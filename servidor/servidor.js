var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const {todasLasPeliculas, todosLosGeneros, infoPelicula} = require("./controladores/controlador_peliculas");
const {peliculaRecomendada} = require("./controladores/recomendacion_peliculas");

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = 8080;

app.get("/peliculas", todasLasPeliculas);
app.get("/generos", todosLosGeneros);
app.get("/peliculas/recomendacion?", peliculaRecomendada);
app.get("/peliculas/:id", infoPelicula);

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});