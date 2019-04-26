const db = require('../../db/acao')

function getAll(){
    return db.getAll()
}

function getCompra(){
    return db.getCompra()
}
function getVenda(){
    return db.getVenda()
}

function getByID(id){
    return db.getByID(id)
}

function insert(data){
    return db.insert(data)
}

function update(data, id){
    return  db.update(data, id);
}

function remove(id){
    return  db.remove(id);
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