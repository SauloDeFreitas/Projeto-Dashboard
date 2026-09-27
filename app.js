import express from 'express'
import { contarArquivos } from './consultarImgs.js'
import cors from 'cors'
const porta = 3000

const app = express()
app.use(cors())

app.get('/contarImagens', (req, res) =>{
    const pasta = req.query.pasta
    const total = contarArquivos(pasta)
    res.json({quantidade : total.length, nomes : total})
})

app.listen(porta, ()=> console.log("servidor rodando na porta: ", porta))