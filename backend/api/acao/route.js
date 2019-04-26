const acao = require('./controller')
const express = require('express')
const router = express.Router()



router.get('/', (req, res) => {
    return acao.getAll()
        .then(result => res.status(200).send({result}))
        .catch(error => res.status(500).send(`Erro ${error.error}`))
})

router.get('/compra', (req, res) => {
    return acao.getCompra()
        .then(result => res.status(200).send({result}))
        .catch(error => res.status(500).send(`Erro ${error.error}`))
})

router.get('/venda', (req, res) => {
    return acao.getVenda()
        .then(result => res.status(200).send({result}))
        .catch(error => res.status(500).send(`Erro ${error.error}`))
})

router.get('/:id', (req, res) => {
    if (req.params.id === null)
        res.status(500).send('Parâmetro obrigatório')

    return acao.getByID(req.params.id)
        .then(result => res.status(200).send({result}))
        .catch(error => res.status(500).send(`Erro ${error.error}`))
})

router.post('/', (req, res) => {
    if (req.body.nome === null || req.body.valor === null){
        res.status(500).send('Parâmetro obrigatório')
    }else{
        return acao.insert(req.body)
            .then(result => res.status(200).send({result}))
            .catch(error => res.status(500).send(`Erro ${error.error}`))
    }
})

router.put('/:id', (req, res) => {
    if (req.body.nome === null || req.body.valor === null){
        res.status(500).send('Parâmetro obrigatório')
    }else{
        return acao.update(req.body, req.params.id)
            .then(result => res.status(200).send({result}))
            .catch(error => res.status(500).send(`Erro ${error.error}`))
    }
})

router.delete('/:id',
    (req, res) => {
        if (req.body.id === null) {
            res.status(500).send('Parâmetro Obrigatório')
        } else {
            return acao.remove(req.params.id)
                .then(result => { res.status(200).send({ result }) }
                ).catch(erro => res.status(erro.status).send(`Erro ${error.erro}`))
        }
    }
)

module.exports = router