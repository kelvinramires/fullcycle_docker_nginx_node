const express = require("express")
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'teste',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
let sql = `INSERT INTO people(name) values ('Kelvin')`
connection.query(sql)

app.get('/', (req,res) => {
    const number = Math.floor(Math.random() * (1000)) + 1
    const nome = 'Kelvin ' + number
    let sql = `INSERT INTO people(name) values ('${nome}')`
    connection.query(sql)
    connection.query(`SELECT name FROM people`, (error, results) => {
        res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${!!results.length ? results.map(el => `<li>${el.name}</li>`).join('') : ''}
      </ol>
    `)
    })
})
app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
