const express = require('express');
const router = express.Router();

const PeliculaSerieController = require('../controllers/PeliculaSerieController');

/* GET users listing. */
router.get('/', PeliculaSerieController.readAll);
router.post("/", PeliculaSerieController.create);

module.exports = router;
