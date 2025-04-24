// Migration 設定檔
module.exports = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_NAME,
  host: process.env.MYSQL_HOST,
  dialect: process.env.MYSQL_DIALECT,
  port: process.env.MYSQL_PORT,
};