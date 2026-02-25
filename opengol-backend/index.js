require('dotenv').config();
const express = require('express');
const {Pool} = require('pg');
const app = express();
const puerto = 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
})
pool.connect()
    .then(() => console.log('¡Conexión exitosa a la base de datos de openGol! ⚽'))
    .catch(err => console.error('Error conectando a la base de datos:', err.stack));
    
app.get('/', (req, res) => {
    res.send('¡El servidor de openGol está vivo y funcionando perfectamente!');
});

app.listen(puerto, () => {
    console.log(`Servidor de openGol escuchando en http://localhost:${puerto}`);
});