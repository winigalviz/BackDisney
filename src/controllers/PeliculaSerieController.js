const controllerUtils = require('../utils/controllerUtils');
const peliculaSerieService = require('../services/PeliculaSerieService');
const personajeService = require("../services/PersonajeService");
let response = {};

module.exports.create = async (req, res) => {
    response = await peliculaSerieService.create(req.body);
    controllerUtils.buildResponse(res, response);
}

module.exports.readAll = async (req, res) => {
    if(req.query.title || req.query.order) {
        let data = {};
        if(req.query.title) data.titulo = req.query.title;
        if(req.query.order) data.orden = req.query.order;
        response = await peliculaSerieService.filter(data);
    } else response = await peliculaSerieService.readAll();
    controllerUtils.buildResponse(res, response);
}

module.exports.update = async (req, res) => {
    response = await peliculaSerieService.update(req.params.id, req.body);
    controllerUtils.buildResponse(res, response);
}

module.exports.delete = async (req, res) => {
    response = await peliculaSerieService.delete(req.params.id);
    controllerUtils.buildResponse(res, response);
}

module.exports.setPersonajes = async (req, res) => {
    response = await peliculaSerieService.setPersonajes(req.params.id, req.body);
    controllerUtils.buildResponse(res, response);
}
