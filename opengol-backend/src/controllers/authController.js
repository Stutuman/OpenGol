const bcrypt = require('bcrypt');
const pool = require('../config/db'); // Importamos la conexión a la base de datos

// Método para registrar un usuario
const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, telefono } = req.body;

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const nuevoUsuario = await pool.query(
            'INSERT INTO usuarios (nombre, email, password_hash, telefono) VALUES ($1, $2, $3, $4) RETURNING id, nombre, email',
            [nombre, email, passwordHash, telefono]
        );

        res.status(201).json({
            mensaje: '¡Usuario registrado con éxito para jugar!',
            usuario: nuevoUsuario.rows[0]
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Hubo un error al registrar el usuario' });
    }
};

module.exports = {
    registrarUsuario
};