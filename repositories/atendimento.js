const query = require('../infra/database/queries');

class Atendimento {
    add(atendimento) {
        const sql = 'INSERT INTO atendimentos SET ?';

        return query(sql, atendimento);
    }

    list() {
        const sql = 'SELECT * FROM atendimentos'

        return query(sql)
    }
}

module.exports = new Atendimento();