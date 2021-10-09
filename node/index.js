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

const create_table = 'CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))'
connection.query(create_table)

const sql = `INSERT INTO people(name) values('Jeferson Rocha');`
const sql2 = `INSERT INTO people(name) values('Wesley');`
const sql3 = `INSERT INTO people(name) values('Adriano');`
connection.query(sql)
connection.query(sql2)
connection.query(sql3)

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
