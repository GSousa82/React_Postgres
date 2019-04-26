const { Client } = require('pg')

const db = new Client(
    {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: '123456',
        database: 'acoes'
    }
)

db.connect(err => {
    if (err) 
        console.error('connection error', err.message)
    else
       console.log('connected')
})

module.exports = db