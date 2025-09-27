const express = require('express')
const app = express()
const fs = require('fs')

const PORT = 3000
const CAMINHO_ARQUIVO = "./livros.json"

app.use(express.json())

if (!fs.existsSync(CAMINHO_ARQUIVO)) {
    fs.writeFileSync(CAMINHO_ARQUIVO, '[]')
}


app.post('/livros', (req, res) => {
    try {
        const { titulo, autor, ano_publicacao, estoque } = req.body

        if ( titulo == "" || titulo == undefined || autor == "" || autor == undefined || isNaN(estoque) || estoque == undefined || ano_publicacao == undefined || isNaN(ano_publicacao)) {
            return res.status(400).json({
                message: "Campos obrigatorios nao preenchidos"
            })
        }

        const data = fs.readFileSync(CAMINHO_ARQUIVO, 'utf-8')
        let livros = JSON.parse(data)

        const novoLivro = {
            id: livros.length +1,
            titulo,
            autor,
            ano_publicacao, 
            estoque
        }

        livros.push(novoLivro)

        fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(livros, null, 4))

        res.status(201).json({
            message: `Livro cadastrado com sucesso`,
            livros: novoLivro
        })
    } catch (error) {
        console.error("Erro interno no servidor: ", error)
        res.status(500).json({
            message: "Erro no servidor!"
        })
    }
})

app.get("/livros", (req, res) => {
    try {
        const data = fs.readFileSync(CAMINHO_ARQUIVO, 'utf-8')
        let livros = JSON.parse(data)

        res.status(200).json({
            message: "Livros",
            livros: livros
        })
    } catch (error) {
        
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})