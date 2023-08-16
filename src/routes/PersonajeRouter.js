const express = require('express');
const router = express.Router();

const personajeController = require('../controllers/PersonajeController');

/* GET users listing. */
router.post("/", personajeController.create);
router.get('/', personajeController.readAll);
router.get("/details", personajeController.details);
router.put("/:id", personajeController.update);
router.delete("/:id", personajeController.delete);
router.put("/:id/peliculaSeries", personajeController.setPeliculaSerie);

module.exports = router;
