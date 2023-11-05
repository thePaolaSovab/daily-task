const Responsible = require('../model//Responsible');
const database = require('../config/database');

module.exports = {
    getUser: async (req, res) => {
        const id = req.params.id;
        const db = await database.makeConnection();
        const person = await Responsible.getResponsibleById(id, db);
        return res.json(person);
    }
}