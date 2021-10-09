import express from 'express';
import mysql from 'mysql';

const app = express()


const APPLICATION = "APP"

const port = "3000"
const host = "0.0.0.0"
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const connection = mysql.createConnection(config)
const sql = `INSERT INTO people(name) values('Jeferson Rocha')`
connection.query(sql)

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function (req, res) {
    connection.query('SELECT * FROM people', (error, rows) => {
        if (error) throw error;

        if (!error) {
        console.log(rows)
        res.render('home', { rows })
        }
    })
})

  


app.listen(port, host, ()=> {
    console.log('Rodando no Host: ' +host + ' na porta ' + port)
})