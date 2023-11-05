const db = require('../config/database');
const task = require('../model/Task');
const Responsible = require('../model/Responsible');


(async () => {
    const database = await db.makeConnection();
    console.log(await Responsible.getResponsibleById(1, database));
    await database.close()
})()