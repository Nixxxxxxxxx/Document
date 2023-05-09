/**  Подключение зависимостей  */
const express = require('express');
const cors = require('cors');
const sequelize = require('./connection.js');
const router = require('./routers/router');

/**  */
const PORT = 8080;
/**  Экземпляр приложения  */
const app = express();

/**  Подключение middlewares  */
app.use(express.json());
app.use(cors());
app.use('/api', router);

//**  Проверка подключения к БД  **//
const assertDatabaseConnectionOk = async () => {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
    }
}

/**  Функция старта приложения  */
const start = async () => {
    try {
        await assertDatabaseConnectionOk();
        app.listen(PORT, () => console.log(`Server run on port - ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
