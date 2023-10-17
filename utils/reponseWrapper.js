const success = (statusCode, response) => {
  return {
    status: "ok",
    statusCode,
    response,
  };
};
//for the failure Api send data in this format:
const error = (statusCode, message) => {
  return {
    status: "error",
    statusCode,
    message,
  };
};
module.exports = { success, error };
