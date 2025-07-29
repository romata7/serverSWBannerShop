const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const clientRoutes = require('./routes/clientRoutes');

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/clients', clientRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});