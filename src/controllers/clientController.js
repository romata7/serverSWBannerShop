const db = require('../config/db');

exports.getAllClients = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clients');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ danger: error });
    }
};

exports.createClient = async (req, res) => {
    try {
        const [result] = await db.query(
            'INSERT INTO clients SET ?',
            [req.body]
        );

        if (result.affectedRows === 1) {
            res.status(200).json({ success: "Cliente creado exitosamente" });
        } else {
            res.status(500).json({ warning: "Cliente no creado" });
        }
    } catch (error) {
        res.status(500).json({ danger: error });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const [result] = await db.query(
            'UPDATE clients SET ? WHERE id = ?',
            [req.body, req.params.id]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ success: 'Cliente actualizado con éxito' });
        } else {
            res.status(404).end({ warning: 'Cliente no actualizado' });
        }
    } catch (error) {
        res.status(500).json({danger:error});
    }
};

// DELETE /api/clients/:id - Eliminar cliente
exports.deleteClient = async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM clients WHERE id = ?',
            [req.params.id]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({success:'Cliente eliminado con éxito'}); // Éxito sin contenido
        } else {
            res.status(404).json({ warning: 'Cliente no eliminado' }); // No encontrado
        }
    } catch (error) {
        res.status(500).json({ danger: error });
    }
};