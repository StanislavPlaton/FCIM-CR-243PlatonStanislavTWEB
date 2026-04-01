const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'technostore'
});

db.connect(err => {
    if (err) {
        console.error('Ошибка подключения к БД:', err);
    } else {
        console.log('Склад MySQL успешно подключен!');
    }
});

app.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;
        res.json(results); 
    });
});

app.listen(3000, () => {
    console.log('Сервер запущен. Менеджер ждет запросов на http://localhost:3000');
});