const db = require('../config/db');

exports.getAllClients = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT  * FROM clients');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createClient = async (req, res) => {
    try {
        const { name, dniruc, phone, address } = req.body;
        const [result] = await db.query('INSERT INTO clients (name, dniruc, phone, address) values (?, ?, ?, ?)', [name, dniruc, phone, address]);
        res.status(201).json({ id: result.insertId, name, dniruc, phone, address });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateClient = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const { name, dniruc, phone, address } = req.body;
        const [result] = await db.query('UPDATE clients SET name = ?, dniruc = ?, phone = ?, address = ? WHERE id = ?', [name, dniruc, phone, address, id]);
        res.status(201).json({ id: result.insertId, name, dniruc, phone, address });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        const id = req.params.id;
        const [result] = await db.query('DELETE FROM clients WHERE id = ?', [id]);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}