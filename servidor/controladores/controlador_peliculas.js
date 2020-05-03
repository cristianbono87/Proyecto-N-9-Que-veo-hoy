//!aqui creamos la referencia a la base de datos
const conexion = require('../lib/conexionbd');

//!programacion de los pedidos a la base de datos 

function todasLasPeliculas(req, res) {

    var titulo = req.query.titulo;
    var genero = req.query.genero;
    var anio = req.query.anio;
    var columna_orden = req.query.columna_orden;
    var tipo_orden = req.query.tipo_orden;
    var pagina = req.query.pagina;
    var cantidad = req.query.cantidad;

    var primeraFila = ((pagina * cantidad)-cantidad); //!con esta ecuacion obtenemos la fila de la que debe comenzar cada pagina

    var sql = ' select * from pelicula';
    var numeroConsultas=false;

    if(titulo||genero||anio){
        sql = sql + ' where';
        if(titulo){
            sql = sql + ' (titulo like "%' + titulo + '%")';
            numeroConsultas=true;
            }if(genero){
                if(numeroConsultas){
                    sql = sql + ' and';
                };
                sql = sql + ' (genero_id=' + '"' + genero + '")';
                numeroConsultas=true;
                }if(anio){
                    if(numeroConsultas){
                        sql = sql + ' and';
                    };
                    sql = sql + ' (anio like ' + '"'+anio+'")';
                    }if(columna_orden){
                        sql = sql + ' order by ' + columna_orden + ' ' + tipo_orden;
                    };
    }

    conexion.query(sql, function (err, results, fields) {
        if (err) {
            console.log("error" + err)
            return res.status(404).json('No se encuentra los datos');
        };
        var data = {};
        //! se crea un for para introducir las peliculas que correspondan a cada pagina 
        data.peliculas = [];
        for(var i = 0; i<cantidad;i++){
            if(results[primeraFila+i]){
            data.peliculas.push(results[primeraFila+i]);
            };
        };
        data.total = results.length;
        res.send(JSON.stringify(data));
    });
};

function todosLosGeneros(req, res) {
    var sql = 'select * from genero';
    conexion.query(sql, function (err, results, fields) {
        if (err) {
            console.log("error" + err)
            return res.status(404).json('No se encuentra los datos');
        };
        var data = {};
        data.generos = results;
        res.send(JSON.stringify(data));
    })
};

function infoPelicula(req, res) {
    var id = req.params.id;
    var sql = 'select pelicula.*,genero.nombre,actor.nombre as nombreActor from genero join pelicula on genero.id=pelicula.genero_id join actor_pelicula on pelicula.id=actor_pelicula.pelicula_id join actor on actor.id=actor_pelicula.actor_id where pelicula.id="'+id+'"';
    
    conexion.query(sql, function (err, results, fields) {
        if (err) {
            console.log("error" + err)
            return res.status(404).json('No se encuentra los datos');
        };
        var data = {};
        data.actores = [];
        for(var i=0 ; i<results.length ; i++){
            data.actores.push({'nombre': results[i].nombreActor});
        };
        data.pelicula = results[0];
        res.send(JSON.stringify(data));
    })
};

//!exportamos las funciones de consulta

module.exports = { todasLasPeliculas, todosLosGeneros, infoPelicula};
