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
        const peliculaSerie = peliculaSerieModel.findOne({ where: { id: id } });
        if(peliculaSerie) {
            peliculaSerie.delete();
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

const validateAtributes = (body) =>
    (body.imagen && body.imagen.length > 0) &&
    (body.titulo && body.titulo.length > 0) &&
    (body.calificacion && body.calificacion > 0);