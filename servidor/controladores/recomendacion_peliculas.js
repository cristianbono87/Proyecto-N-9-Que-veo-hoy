//!aqui creamos la referencia a la base de datos
const conexion = require('../lib/conexionbd');

function peliculaRecomendada(req, res) {

    var genero = req.query.genero;//!
    var anio_inicio = req.query.anio_inicio;//!
    var anio_fin = req.query.anio_fin;//!
    var puntuacion = req.query.puntuacion;//!

    var sql = 'select pelicula.*, genero.nombre from pelicula join genero on pelicula.genero_id = genero.id';

    var numeroConsultas = false;

    if (anio_inicio || genero || anio_fin || puntuacion) {
        sql = sql + ' where';
        if (anio_inicio & anio_fin) {
            sql = sql + ' (anio between ' + anio_inicio + ' and ' + anio_fin + ')';
            numeroConsultas = true;
        } if (genero) {
            if (numeroConsultas) {
                sql = sql + ' and';
            };
            sql = sql + ' (nombre=' + '"' + genero + '")';
            numeroConsultas = true;
        } if (puntuacion) {
            if (numeroConsultas) {
                sql = sql + ' and';
            };
            sql = sql + ' (puntuacion>=' + '"' + puntuacion + '")';
        };
    }
    conexion.query(sql, function (err, results, fields) {
        if (err) {
            console.log("error" + err)
            return res.status(404).json('No se encuentra los datos');
        };

        var data = {};
        data.peliculas = [];
        for (var i = 0; i < results.length; i++) {
            data.peliculas.push(results[i]);
        };
        res.send(JSON.stringify(data));
    });
};

//!exportamos las funciones de consulta

module.exports = { peliculaRecomendada };