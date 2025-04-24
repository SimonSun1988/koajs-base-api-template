const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const database = process.env.MYSQL_NAME;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const dialect = process.env.MYSQL_DIALECT;
const port = process.env.MYSQL_PORT;

const sequelize = new Sequelize(database, username, password, {
    dialect,
    dialectOptions: {
        // 數值處理相關設定
        decimalNumbers: true,        // 使用原生小數點數值，確保小數精度
        supportBigNumbers: true,     // 支援大數值處理
        bigNumberStrings: true,      // 將大數值轉換為字符串，避免 JavaScript 數字精度問題

        // 字符集和時區設定
        charset: 'utf8mb4',          // 使用 utf8mb4 字符集，支援完整的 Unicode 字符（包括表情符號）
        timezone: '+08:00',          // 設定時區為台北時區

        // 日期時間處理
        dateStrings: true,           // 將日期時間作為字符串返回，避免時區轉換問題

        // 連接池設定
        connectTimeout: 10000,       // 建立新連接的超時時間（10秒）
        acquireTimeout: 10000,       // 從連接池獲取連接的超時時間（10秒）
        waitForConnections: true,    // 當連接池達到最大連接數時是否等待
        connectionLimit: 10,         // 連接池的最大連接數
        queueLimit: 0                // 等待連接的隊列最大長度（0表示不限制）
    },
    host,
    port,
    logging: false,
    // operatorsAliases: {
    //     $or: Sequelize.Op.or,
    //     $ne: Sequelize.Op.ne,
    //     $gte: Sequelize.Op.gte,
    //     $lte: Sequelize.Op.lte,
    //     $between: Sequelize.Op.between
    // }
});

fs
    .readdirSync(`${__dirname}/schemas`)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(`${__dirname}/schemas`, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;