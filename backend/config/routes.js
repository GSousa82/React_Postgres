const grupoRouter = require('../api/acao/route')

module.exports = (server) => {
    server.use('/acoes', grupoRouter)
}