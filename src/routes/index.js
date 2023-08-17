const express = require('express');
const router = express.Router();

const jwtMiddleware = require('../middleware/jwtMiddleware');

const personajeRouter = require('./PersonajeRouter');
const peliculaSerieRouter = require('./PeliculaSerieRouter');
const autenticacionRouter = require('./AutenticacionRouter');

/* GET home page. */
router.use('/characters', jwtMiddleware.authenticateToken, personajeRouter);
router.use('/movies', jwtMiddleware.authenticateToken, peliculaSerieRouter);
router.use('/auth', autenticacionRouter);

module.exports = router;
