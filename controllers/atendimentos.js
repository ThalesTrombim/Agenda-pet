const Atendimento = require('../models/atendimentos');

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
            .then(results => res.json(results))
            .catch(err => res.status(400).json(err));
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.getById(id, res) 
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        Atendimento.adicionar(atendimento)
            .then(atendimento => res.status(201).json(atendimento))
            .catch(err => res.status(400).json(err))
    })

    app.patch('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.alterar(id, valores, res);
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.deletar(id, res);
    })
}