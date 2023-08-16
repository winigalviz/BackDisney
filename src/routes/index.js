const express = require('express');
const router = express.Router();

const personajeRouter = require('./PersonajeRouter');
const peliculaSerieRouter = require('./PeliculaSerieRouter');
const autenticacionRouter = require('./AutenticacionRouter');

/* GET home page. */
router.use('/characters', personajeRouter);
router.use('/movies', peliculaSerieRouter);
router.use('/auth', autenticacionRouter);

module.exports = router;
