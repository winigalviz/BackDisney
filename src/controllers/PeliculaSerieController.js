const controllerUtils = require('../utils/controllerUtils');
const peliculaSerieService = require('../services/PeliculaSerieService');
let response = {};

module.exports.create = async (req, res) => {
    response = await peliculaSerieService.create(req.body);
    controllerUtils.buildResponse(res, response);
}

module.exports.readAll = async (req, res) => {
    response = await peliculaSerieService.readAll();
    controllerUtils.buildResponse(res, response);

}