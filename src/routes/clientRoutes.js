const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Middleware para eliminar timestamps no permitidos
const sanitizeTimestamps = (req, res, next) => {
    console.log('antes:', req.body);
    const disallowedFields = ['created_at', 'updated_at', 'id'];

    disallowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
            console.warn(`Se intentó modificar el campo protegido: ${field}`);
            delete req.body[field];
        }
    });

    console.log('después:', req.body);
    next();
};

router.get('/', clientController.getAllClients);
router.post('/', sanitizeTimestamps, clientController.createClient);
router.put('/:id', sanitizeTimestamps, clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;