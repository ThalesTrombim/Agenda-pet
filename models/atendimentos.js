const axios = require('axios');
const moment = require('moment');

const connection = require('../infra/database/connection');

class Atendimento {
    constructor(){
        this.dataValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao);
        this.clienteValido = (client_length) => client_length >= 5;
        this.valida = (params) => {
            this.validacoes.filter(campo => {
                const { nome } = campo
                const param = params[nome];

                return !campo.valido(param)
            })
        }
        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual!'
            },
            {
                nome: 'cliente',
                valido: this.clienteValido,
                mensagem: 'Nome do cliente dever ter pelo menos 5 caracteres'
            }
        ]
    }

    adicionar(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const repository = require('../repositories/atendimento')

        const params = {
            data: { data, dataCriacao },
            cliente: { client_length: atendimento.client_length.length }
        }

        const erros = this.valida(params);

        if(erros.length > 0){
            return new Promise((resolve, reject) => reject(erros))
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}

            return repository.add(atendimentoDatado).then(results => {
                const id = results.insertId;
                return { ...atendimento, id}
            });
        }
    }

    lista(){
        return repository.list()
    }

    getById(id, res){
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`

        connection.query(sql, async (erro, result) => {
            const atendimento = result[0]
            const cpf = atendimento.cliente;

            if(erro){
                res.status(400).json(erro)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`);
                atendimento.cliente = data
                res.status(200).json(atendimento)
            }
        })
    }

    alterar(id, valores, res){
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        }
        const sql = `UPDATE atendimentos SET ? WHERE id=${id}`;

        connection.query(sql, valores, (erro, result) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deletar(id, res){
        const sql = `DELETE FROM atendimentos WHERE id=?`

        connection.query(sql, id, (erro, result) => {
            if(erro){
                res.status(200).json(erro)
            } else {
                res.status(400).json(result)
            }
        })
    }
}

module.exports = new Atendimento;