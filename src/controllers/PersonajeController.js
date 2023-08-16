const controllerUtils = require('../utils/controllerUtils');
const personajeService = require('../services/PersonajeService');
let response = {};

module.exports.create = async (req, res) => {
    response = await personajeService.create(req.body);
    controllerUtils.buildResponse(res, response);
}

module.exports.readAll = async (req, res) => {
    if(req.query.name || req.query.age || req.query.movies) {
        let data = {};
        if(req.query.name) data.nombre = req.query.name;
        if(req.query.age) data.edad = req.query.age;
        if(req.query.movies) data.movies = req.query.movies;
        response = await personajeService.filter(data);
    } else response = await personajeService.readAll();
    controllerUtils.buildResponse(res, response);
}

module.exports.update = async (req, res) => {
    response = await personajeService.update(req.params.id, req.body);
    controllerUtils.buildResponse(res, response);
}

module.exports.delete = async (req, res) => {
    response = await personajeService.delete(req.params.id);
    controllerUtils.buildResponse(res, response);
}

module.exports.details = async (req, res) => {
    response = await personajeService.details();
    controllerUtils.buildResponse(res, response);
}

module.exports.setPeliculaSerie = async (req, res) => {
    response = await personajeService.setPeliculaSerie(req.params.id, req.body);
    controllerUtils.buildResponse(res, response);
}