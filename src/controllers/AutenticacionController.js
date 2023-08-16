const controllerUtils = require('../utils/controllerUtils');
const autenticacionService = require('../services/AutenticacionService');
let response = {};

module.exports.register = async (req, res) => {
    response = await autenticacionService.register(req.body);
    controllerUtils.buildResponse(res, response);
}

module.exports.login = async (req, res) => {
    response = await autenticacionService.login(req.body);
    controllerUtils.buildResponse(res, response);
}
