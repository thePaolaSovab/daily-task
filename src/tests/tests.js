const db = require('../config/database');
const task = require('../model/Task');
const Responsible = require('../model/Responsible');


(async () => {
    const database = await db.makeConnection();
    console.log(await task.update(14, JSON.parse('{"description":"Una tareas","days":"10","begins":"2222-02-22","ends":"2222-02-22","responsible":"1"}'), database));
    await database.close()
})()