const fs = require('fs');
const path = require('path');
const appRoot = require('app-root-path');

// Load environment variables
const envPath = fs.existsSync(`${appRoot}/.env`) ? `${appRoot}/.env` :
fs.existsSync(`${appRoot}/.env.${process.env.NODE_ENV}`) ? `${appRoot}/.env.${process.env.NODE_ENV}` :
fs.existsSync(`${appRoot}/.env_localhost`) ? `${appRoot}/.env_localhost` : null;

console.log(`🗂️ Load .env file path is ${envPath} 🗂️`);

if (envPath === null) {
  console.log(`❌ there is no env file ❌`);
  process.exit();
}

require('dotenv').config({ path: envPath });

// Load the app
const api = require(`${appRoot}/apis/web-api/app.js`);

// Start the app
const port = process.env.WEB_API_PORT ?? 3000;
api.listen(port);
console.log(`🚀 web api running on port ${port} 🚀`);