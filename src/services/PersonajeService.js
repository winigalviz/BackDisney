const {Sequelize} = require("sequelize");
const personajeModel = require('../db/models').Personaje;
const peliculaSerieModel = require('../db/models').PeliculaSerie;

const response = { status: 0, message: "" };

module.exports.create = async (body) => {
    try {
        if(validateAtributes(body)) {
            const personaje = await personajeModel.create(body);
            response.status = 200;
            response.message = personaje;
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
        const personajes = await personajeModel.findAll();
        response.status = 200;
        response.message = personajes;
    } catch (err) {
        response.status = 500;
        response.message = err.message;
    }
    return response;
}

module.exports.update = async (id, body) => {
    try {
        let personaje = await personajeModel.findOne({where: {id: id}});
        if (personaje && validateAtributes(body)) {
            personaje = personaje.update(body);
            response.status = 200;
            response.message = personaje;
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
        const personaje = await personajeModel.findOne( { where: { id: id } });
        if(personaje) {
            console.log(personaje)
            personaje.destroy();
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

module.exports.details = async () => {
    try {
        const personajes = await personajeModel.findAll({
            include: peliculaSerieModel
        });
        response.status = 200;
        response.message = personajes;
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
        let include = { model: peliculaSerieModel };
        if(data.nombre) where.nombre = data.nombre;
        if(data.edad) where.edad = data.edad;
        if(data.movies) {
            include.where = { id: data.movies }
        }
        if(Object.keys(where).length > 0) options.where = where;
        options.include = include;

        const personaje = await personajeModel.findAll(options);
        response.status = 200;
        response.message = personaje;
    } catch (err) {
        response.status = 500;
        response.message = err.message;
    }
    return response;
}

module.exports.setPeliculaSerie = async (id, peliculaIds) => {
    try {
        let personaje = await personajeModel.findOne({ where: { id: id } });
        if(personaje && peliculaIds.length > 0) {
            await validatePeliculaSeries(peliculaIds, personaje);
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

const validatePeliculaSeries = async (peliculaIds, personaje) => {
    try {
        const peliculaSeries = await peliculaSerieModel.findAll({
            where: { id: { [Sequelize.Op.in]: peliculaIds } }
        });
        if (peliculaSeries && peliculaSeries.length > 0) {
            personaje.addPeliculaSeries(peliculaSeries);
            response.status = 200;
            response.message = "Operacion exitosa";
        } else {
            response.status = 400;
            response.message = "No se encontraron peliculas a asociar";
        }
    } catch (err) {
        response.status = 500;
        response.message = err.message;
    }
}

const validateAtributes = (body) =>
    (body.imagen && body.imagen.length > 0) &&
    (body.nombre && body.nombre.length > 0) &&
    (body.edad && body.edad > 0) &&
    (body.peso && body.peso > 0) &&
    (body.historia && body.historia.length > 0);