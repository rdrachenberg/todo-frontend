// Middleware to handle errors globally in the application
module.exports = (err, req, res, next) => {
  res.status(500).json({ error: err.message }); // Respond with a 500 status and the error message in JSON format
};
