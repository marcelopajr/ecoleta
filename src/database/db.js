// IMPORTAR A DEPENDÊNCIA DO SQLITE3
const sqlite3 = require("sqlite3").verbose()

// CRIAR O OBJETO DE IRÁ FAZER OPERAÇÕES NO BANCO DE DADOS
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// UTILIZAR O OBJETO DE BANCO DE DADOS PARA NOSSAS OPERAÇÕES
db.serialize(() => {

    //     // 01 - CRIAR UMA TABELA
    //     db.run(`
    //         CREATE TABLE IF NOT EXISTS places (
    //             id INTEGER PRIMARY KEY AUTOINCREMENT,
    //             image TEXT,
    //             name TEXT,
    //             adress TEXT,
    //             adress2 TEXT,
    //             state TEXT,
    //             city TEXT,
    //             items TEXT
    //         );
    //     `)

    //     // 02 - INSERIR DADOS NA TABELA
    //     const query = `
    //     INSERT INTO places (
    //         image,
    //         name,
    //         adress,
    //         adress2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?, ?, ?, ?, ?, ?, ?);
    // `

    //     const values = [
    //         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
    //         "Papersider",
    //         "Guilherme Gemballa, Jardim América",
    //         "Nº 296",
    //         "Santa Catarina",
    //         "Rio do Sul",
    //         "Papéis e Papelão"
    //     ]

    //     function afterInsertData(err) {
    //         if(err) {
    //             return console.log(err)
    //         }

    //         console.log("Cadastrado com sucesso")
    //         console.log(this)
    //     }

    //     db.run(query, values, afterInsertData)

    //     // 03 - CONSULTAR OS DADOS DA TABELA
    //     db.all(`SELECT name FROM places`, function(err, rows) {
    //         if(err) {
    //             return console.log(err)
    //         }

    //         console.log("Aqui estão seus registros: ")
    //         console.log(rows)
    //     })

    //     // 04 - DELETAR UM DADO DA TABELA
    // db.run(`DELETE FROM places WHERE id = ?`, [13], function (err) {
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso")
    // })

})