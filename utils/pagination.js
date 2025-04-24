
module.exports = (payload) => {
  try {
    return {
      page: payload.page ?? 1,
      limitPerpage: payload.limit ?? 10,
      totalCount: payload.totalCount ?? 0,
      totalPage: Math.ceil(payload.totalCount / payload.limit)
    };
  } catch (err) {
    return Promise.reject(err);
  }
}