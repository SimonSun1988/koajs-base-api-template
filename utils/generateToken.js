/*
 * 產生隨機 token
 */

const Promise = require('bluebird');
const chance = require('chance').Chance();

module.exports = async (options = {}) => {
    try {
        return chance.string(options);
    } catch (err) {
        return Promise.reject(err);
    }
}