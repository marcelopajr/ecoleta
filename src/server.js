const express = require("express")
const server = express()

// PEGAR O BANCO DE DADOS
const db = require("./database/db")

// CONFIGURAR PASTA PÚBLICA
server.use(express.static("public"))

// HABILITAR O USO DO req.body NA APLICAÇÃO
server.use(express.urlencoded({ extended: true }))

// UTILIZANDO TEMPLATE ENGINE
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// CONFIGURAR CAMINHOS DA APLICAÇÃO
// PÁGINA INICIAL (req: REQUISIÇÃO, res: RESPOSTA)
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    // req.query: QUERY STRINGS DA NOSSA URL
    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body: O CORPO DO NOSSO FORMULÁRIO
    // console.log(req.body)

    // INSERIR DADOS NO BANCO DE DADOS
    const query = `
        INSERT INTO places (
            image,
            name,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

        const values = [
            req.body.image,
            req.body.name,
            req.body.adress,
            req.body.adress2,
            req.body.state,
            req.body.city,
            req.body.items
        ]

        function afterInsertData(err) {
            if(err) {
                console.log(err)
                return res.send("Erro no cadastro!")
            }

            console.log("Cadastrado com sucesso")
            console.log(this)

            return res.render("create-point.html", { saved: true })
        }

        db.run(query, values, afterInsertData)

})


server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        // PESQUISA VAZIA
        return res.render("search-results.html", {total: 0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)

        const total = rows.length

        // MOSTRAR A PÁGINA HTML COM OS DADOS DO BANCO DE DADOS
        return res.render("search-results.html", {places: rows, total: total})
    })

})

// LIGAR O SERVIDOR
server.listen(3000)