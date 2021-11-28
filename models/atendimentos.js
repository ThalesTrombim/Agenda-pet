const { default: axios } = require('axios');
const moment = require('moment');

const connection = require('../infra/connection');

class Atendimento {
    adicionar(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser maior ou igual a data atual!'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Nome do cliente dever ter pelo menos 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)

        if(erros.length > 0){
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO atendimentos SET ?'

            connection.query(sql, atendimentoDatado, (erro, result) => {
                if(erro){
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimentoDatado)
                }
            })
        }
    }

    lista(res){
        const sql = 'SELECT * FROM atendimentos'

        connection.query(sql, (erro, result) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(result)
            }
        })
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