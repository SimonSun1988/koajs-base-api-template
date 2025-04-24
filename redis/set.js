const Promise = require('bluebird');
const client = require('./client');

module.exports = async (key, value, ttl) => {
  try {

    let newValue;
    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
      newValue = JSON.stringify(value);
    }

    await client.set(key, newValue);

    if (ttl) {
      client.expire(key, ttl);
    }

    return value;
  } catch (err) {
    return Promise.reject(err);
  }
}