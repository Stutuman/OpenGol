require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/routes/authRoutes'); // Importamos las rutas de autenticación

const app = express();
const puerto = 3000;

app.use(express.json());

// Le decimos a Express que use nuestras rutas
// El '/api/usuarios' es un prefijo estándar. 
// Así, la ruta completa será: http://localhost:3000/api/usuarios/registro
app.use('/api/usuarios', authRoutes);

app.listen(puerto, () => {
    console.log(`Servidor de openGol escuchando en http://localhost:${puerto}`);
});