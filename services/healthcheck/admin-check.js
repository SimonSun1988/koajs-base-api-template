module.exports = async (payload) => {
  try {
    return 'admin-api ok';
  } catch (err) {
    return Promise.reject(err);
  }
};