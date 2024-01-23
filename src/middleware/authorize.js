const Users = require("../models/users");
exports.authorize = async (req, res, next) => {
  try {
    const { userId: _id } = req.body;
    const user = await Users.findById(_id);
    if (!user) throw new Error("Akun Tidak Ada");
    req.user = user;
    next();
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};
