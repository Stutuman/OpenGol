const express = require('express');
const app = express();
const puerto = 3000;

app.get('/', (req, res) => {
    res.send('¡El servidor de openGol está vivo y funcionando perfectamente!');
});

app.listen(puerto, () => {
    console.log(`Servidor de openGol escuchando en http://localhost:${puerto}`);
});