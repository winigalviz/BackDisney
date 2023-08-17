const autenticacionModel = require('../db/models').Autenticacion;
const jwtUtils = require('../utils/jwtUtils');

const response = { status: 0, message: "" };

module.exports.register = async (body) => {
    try {
        if(validateAtributesRegister(body)) {
            const autenticacion = await autenticacionModel.create({
                correo: body.user,
                nombre: body.name,
                contrasena: body.pass
            });
            response.status = 200;
            response.message = autenticacion;
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

module.exports.login = async (body) => {
    try {
        if (validateAtributesLogin(body)) {
            const autenticacion = await autenticacionModel.findOne({
                where: {
                    correo: body.user,
                    contrasena: body.pass
                }
            });
            if(autenticacion) {
                const data = { id: autenticacion.id, mail: autenticacion.correo };
                const jwt = jwtUtils.create(data);
                const decode = jwtUtils
                response.status = 200;
                response.message = `Token: ${jwt}`;
            } else {
                response.status = 400;
                response.message = "Credenciales incorrectas";
            }
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

const validateAtributesRegister = (data) =>
    (data.user && data.user.length > 0) &&
    (data.pass && data.pass.length > 0) &&
    (data.name && data.name.length > 0);

const validateAtributesLogin = (data) =>
    (data.user && data.user.length > 0) &&
    (data.pass && data.pass.length > 0);