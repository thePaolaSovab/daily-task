const open = require('sqlite').open;
const sqlite3 = require('sqlite3');

class DbHandler {
    static async makeConnection() {
        return await open({
            filename: 'C:\\Users\\Ruben\\Documents\\projects-practices\\daily-task-javascript\\db.sqlite',
            driver: sqlite3.Database
        });
    }
}

module.exports = DbHandler;