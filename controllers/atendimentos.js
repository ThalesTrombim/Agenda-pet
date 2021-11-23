const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('vrauu'));

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        Atendimento.adicionar(atendimento, res)
    })
}