module.exports.buildResponse = (res, response) => {
    res.status(response.status).json(response.message);
}