exports.handleRoot = (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is running!",
  });
};
