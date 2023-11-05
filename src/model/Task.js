class Task {
    constructor(description, days, begins, ends, responsible) {
        this.description = description;
        this.days = days;
        this.begins = begins;
        this.ends = ends;
        this.responsible = responsible;
    }

    /**
     * 
     * @param {Task} Task 
     * @param {object} db 
     * @returns 
     */
    static async store(Task, db) {
        try {
            return await db.exec(`INSERT INTO tareas(description, days, begins, ends, responsible) VALUES (?, ?, ?, ?, ?)`, [Task.description, Task.days, Task.begins, Task.ends, Task.responsible]);
        } catch (e) {
            console.trace(e);
            return {
                status: false,
                reason: e
            }
        }
    }
    static async delete(id, db) {
        try {
            return await db.exec(`DELETE FROM tareas WHERE id=?`, [id]);
        } catch (e) {
            return {
                status: false,
                reason: e
            };
        }
    }
    /**
     * 
     * @param {int} id 
     * @param {Task} task 
     * @param {object} db 
     * @returns 
     */
    static async update(id, task, db) {
        try {
            return await db.exec(`UPDATE FROM tareas SET description=?, days=?, begins=?, ends=?, responsible=? WHERE id=?`, [task.description, task.days, task.begins, task.ends, task.responsible]);
        } catch(e) {
            return {
                status: false,
                reason: e
            }
        }
    }
    
    static async get(id, db) {
        try {
            const task = await db.get(`SELECT * FROM tareas WHERE id=?`, [id]);
            return task;
        } catch(e) {
            return {
                status: false,
                reason: e
            };
        }
    }

    static async getAll(db) {
        try {
            return await db.all(`SELECT * FROM tareas`);
        } catch(e) {
            return {
                status: false,
                reason: e
            }
        }
    }
}

module.exports = Task;