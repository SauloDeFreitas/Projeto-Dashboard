import express from 'express'
import { contarArquivos } from './consultarImgs.js'
import cors from 'cors'
const porta = 3000

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }));

let jogos = []

app.post('/extensao', (req,res) =>{
    const total = contarArquivos(req.body.pasta)

    for(let i = 0; i < total.length; i++){
        if(total[i] === (req.body.nome + '.' + total[i].split('.').pop())){
            const extensao =  ('.' + total[i].split('.').pop())
            res.json({extensao : extensao})
        }
    }
})

app.get('/contarImagens', (req, res) =>{
    const pasta = req.query.pasta
    const total = contarArquivos(pasta)
    res.json({quantidade : total.length, nomes : total})
})

app.post('/jogo/cadastrar', (req, res) =>{
    jogos.push(req.body)
})


app.get('/jogo/mostrar', (req, res) =>{
    res.json(jogos)
})

app.listen(porta, ()=> console.log("servidor rodando na porta: ", porta))