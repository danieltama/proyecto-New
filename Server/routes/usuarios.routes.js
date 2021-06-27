const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuarios.controllers');

router.put('/:id', usuario.editUsuario);
router.delete('/:id', usuario.deleteUsuario);

module.exports = router;