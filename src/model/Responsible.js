class Responsible {
    constructor(name) {
        this.name = name;
    }

    static async getResponsibleById(id, db) {
        try {
            return await db.get(`SELECT * FROM responsible WHERE id_responsible=?`, [id]);
        } catch(e) {
            return {
                status: false,
                reason: e
            };
        }
    }
}

module.exports = Responsible;