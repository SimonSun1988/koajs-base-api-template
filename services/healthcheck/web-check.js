module.exports = async (payload) => {
  try {
    return 'web-api ok';
  } catch (err) {
    return Promise.reject(err);
  }
};