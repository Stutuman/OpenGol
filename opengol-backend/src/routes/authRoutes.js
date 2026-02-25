const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/authController'); // Importamos el método

// Definimos la ruta POST para el registro
router.post('/registro', registrarUsuario);

// Mañana aquí agregaremos: router.post('/login', iniciarSesion);

module.exports = router;