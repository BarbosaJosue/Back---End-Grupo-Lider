const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())


let db = [
    {'1':{ Nota: '0000000000000000000000000000000000000000', Nome: 'Josue', CPF: '00000000000'}},
    {'2':{ Nota: '0000000000000000000000000000000000000000', Nome: 'Josue', CPF: '00000000000'}},
    {'3':{ Nota: '0000000000000000000000000000000000000000', Nome: 'Josue', CPF: '00000000000'}},
]

// Buscar Dados
app.get('/', (req, res) => {
    return res.json(db)
})

// Inserir Dados
app.post('/add', (req, res) => {
    const body = req.body

    if(!body)
    return res.status(400).end()

    db.push(body)
    return res.json(body)
})

app.delete('/:id', (req, res) => {
    const id = req.params.id

    let newDB = db.filter(item => {
        if(!item[id])
            return item
    })

    db = newDB

    return res.send(newDB)
})

app.listen(21262, () => {
    console.log('express start at http://localhost:21262')
})