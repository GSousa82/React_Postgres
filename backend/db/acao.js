
const db = require('../config/database')

function getAll() {
    return db.query(' SELECT * FROM acoes ORDER BY nome ')
        .then((result) => {
            return result.rows
        }).catch(err => {
            const error = { error: err.code, status: 500 }
            return erro
        })
}

function getCompra() {
return db.query(` SELECT * FROM acoes Where tipo = 'Compra' `)
        .then((result) => {
            return result.rows
        }).catch(err => {
            const error = { error: err.code, status: 500 }
            return erro
        })
}

function getVenda() {
    return db.query(` SELECT * FROM acoes Where tipo = 'Venda' `)
        .then((result) => {
            return result.rows
        }).catch(err => {
            const error = { error: err.code, status: 500 }
            return erro
        })
}

function getByID(id){
    return db.query(' SELECT *  FROM acoes  WHERE id = $1 ORDER BY nome ', [id])                    
        .then(result => {
            return result.rows
        }).catch(err => {
            const error = { error: err.code, status: 500 }
            return error
        })
}

function insert(data){
    const { nome, valor, dt_acao, tipo } = data
    
    return db.query('INSERT INTO acoes (nome, valor, dt_acao, tipo) VALUES ($1, $2, $3, $4) RETURNING id ', [ nome, valor, dt_acao, tipo ])           
        .then(result => {
            return result.rows[0].id
        }).catch(err => {
            const error = { error: err.code, status: 500 }
            return error
        })
}

function update(data, id){
    const { nome, valor, tipo, dt_acao } = data
    return db.query('UPDATE acoes SET nome = $1, valor = $2, tipo = $3, dt_acao = $4 Where id = $5 ', [nome, valor, tipo, dt_acao, id])
            .then(result => {
            return id
        })
        .catch( err => {
            const error = { error: err.code, status: 500 }
            return error
        })
}

function remove(id){
    return db.query('DELETE FROM acoes WHERE id = $1 ', [id])
        .then(result => {
            return id;
        }).catch(err => {
            const error = { error: err.code, status: 500 }
            return error;
        })
}

module.exports = {
    getAll,
    getCompra,
    getVenda,
    getByID,
    insert,
    update,
    remove,
  }