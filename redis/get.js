const Promise = require('bluebird');
const client = require('./client');

const jsonRegex = /^\s*(\{.*\}|\[.*\])\s*$/;

module.exports = async (key) => {
  try {

    const value = await client.get(key);

    if (typeof value !== 'string') {
      return value;
    }

    if (jsonRegex.test(value) === false) {
      return value;
    }

    return JSON.parse(value);
  } catch (err) {
    return Promise.reject(err);
  }
}