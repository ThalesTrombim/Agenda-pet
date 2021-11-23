const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.getById(id, res) 
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        Atendimento.adicionar(atendimento, res)
    })
}