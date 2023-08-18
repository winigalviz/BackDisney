const {Sequelize} = require("sequelize");
const personajeModel = require('../db/models').Personaje;
const peliculaSerieModel = require('../db/models').PeliculaSerie;

const response = { status: 0, message: "" };

module.exports.create = async (body) => {
    try {
        if(validateAtributes(body)) {
            const peliculaSerie = await peliculaSerieModel.create(body)
            response.status = 200;
            response.message = peliculaSerie;
        } else {
            response.status = 400;
            response.message = "Datos incorrectos";
        }
    } catch (err) {
        response.status = 500;
        response.message = err.message;
    }
    return response;
}

module.exports.readAll = async () => {
    try {
        const peliculaSeries = await peliculaSerieModel.findAll({
            include: {
                model: personajeModel
            }
        });
        response.status = 200;
        response.message = peliculaSeries;
    } catch (err) {
        response.status = 500;
        response.message = err.message;
    }
    return response;
}

module.exports.update = async (id, body) => {
    try {
        let peliculaSeries = await peliculaSerieModel.findOne({ where: { id: id }});
        if (peliculaSeries && validateAtributes(body)) {
            peliculaSeries = peliculaSeries.update(body);
            response.status = 200;
            response.message = peliculaSeries;
        } else {
            response.status = 400;
            response.message = "Datos incorrectos";
        }
    } catch (err) {
        response.status = 500;
        response.message = err.message;
    }
    return response;
}

module.exports.delete = async (id) => {
    try {
        const peliculaSerie = await peliculaSerieModel.findOne({ where: { id: id } });
        if(peliculaSerie) {
            peliculaSerie.destroy();
            response.status = 200;
            response.message = "Personaje eliminado";
        } else {
            response.status = 400;
            response.message = "Datos incorrectos";
        }
    } catch (err) {
        response.status = 500;
        response.message = err.message;
    }
    return response;
}

module.exports.filter = async (data) => {
    try {
        let where = {};
        let options = {};
        let include = { model: personajeModel };
        if(data.titulo) where.titulo = data.titulo;
        if(data.orden) options.order = [["titulo", data.orden]];
        if(Object.keys(where).length > 0) options.where = where;
        options.include = include;

        console.log("options",  options)

        const peliculas = await peliculaSerieModel.findAll(options);
        response.status = 200;
        response.message = peliculas;
    } catch (err) {
        response.status = 500;
        response.message = err.message;
    }
    return response;
}

module.exports.setPersonajes = async (id, personajeIds) => {
    try {
        let pelicula = await peliculaSerieModel.findOne({ where: { id: id } });
        if(pelicula && personajeIds.length > 0) {
            await validatePersonajes(personajeIds, pelicula);
        } else {
            response.status = 400;
            response.message = "Datos incorrectos";
        }
    } catch (err) {
        response.status = 500;
        response.message = err.message;
    }
    return response;
}

const validatePersonajes = async (personajeIds, pelicula) => {
    try {
        const personajes = await personajeModel.findAll({
            where: { id: { [Sequelize.Op.in]: personajeIds } }
        });
        if (personajes && personajes.length > 0) {
            pelicula.addPersonajes(personajes);
            response.status = 200;
            response.message = "Operacion exitosa";
        } else {
            response.status = 400;
            response.message = "No se encontraron personajes a asociar";
        }
    } catch (err) {
        response.status = 500;
        response.message = err.message;
    }
}

const validateAtributes = (body) =>
    (body.imagen && body.imagen.length > 0) &&
    (body.titulo && body.titulo.length > 0) &&
    (body.calificacion && body.calificacion > 0);