const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

app.use(cors());
app.use(express.json());

let db;

async function connectToDatabase() {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'technostore'
        });
        console.log('Склад MySQL успешно подключен через Promises!');
    } catch (err) {
        console.error('Ошибка подключения к БД:', err);
    }
}

connectToDatabase();

app.get('/api/products', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM products');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Ошибка при получении товаров" });
    }
});

app.post('/api/register', async (req, res) => {
    const { login, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = "INSERT INTO users (login, password) VALUES (?, ?)";
        await db.query(sql, [login, hashedPassword]);
        
        res.json({ message: "Регистрация прошла успешно!" });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "Этот логин уже занят" });
        }
        res.status(500).json({ error: "Ошибка сервера при регистрации" });
    }
});

app.post('/api/login', async (req, res) => {
    const { login, password } = req.body;
    try {
        const [results] = await db.query("SELECT * FROM users WHERE login = ?", [login]);

        if (results.length === 0) {
            return res.status(401).json({ error: "Пользователь не найден" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            res.json({ 
                message: "Вход выполнен!", 
                user: { id: user.id, login: user.login } 
            });
        } else {
            res.status(401).json({ error: "Неверный пароль" });
        }
    } catch (err) {
        res.status(500).json({ error: "Ошибка сервера при входе" });
    }
});

app.post('/api/orders', async (req, res) => {
    const { customer_name, phone, address, total_price, user_id, items_list } = req.body;
    try {
        const sql = "INSERT INTO orders (customer_name, phone, address, total_price, user_id, items_list) VALUES (?, ?, ?, ?, ?, ?)";
        const [result] = await db.query(sql, [customer_name, phone, address, total_price, user_id, items_list]);
        
        res.json({ message: "Заказ оформлен!", orderId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Ошибка при сохранении заказа" });
    }
});

app.get('/api/my-orders/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC";
        const [results] = await db.query(sql, [userId]);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: "Ошибка при получении истории заказов" });
    }
});


app.listen(3000, () => {
    console.log('Сервер запущен. Менеджер ждет запросов на http://localhost:3000');
});