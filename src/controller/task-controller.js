const Task = require('../model/Task');
const settings = require('../../settings');
const dbHandler = require('../config/database');
module.exports = {
    list: (req, res) => {
        res.sendFile(`${settings.viewsPath}\\list.html`);
    },
    getAll: async (req, res) => {
        const db = await dbHandler.makeConnection();
        const tasks = await Task.getAll(db);
        await db.close();
        res.json(tasks);
    },
    add: async (req, res) => {
        try {
            const db = await dbHandler.makeConnection();
            const task = new Task(req.body?.description, req.body?.days, req.body?.begins, req.body?.ends, req.body?.responsible);
            const result = await Task.store(task, db);
            await db.close();
            return res.json({
                status: true,
                result: result
            });
            
        } catch(e) {
            return res.json({
                status: false,
                reason: e
            });
        }
    }
    
}