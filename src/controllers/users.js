const Users = require("../models/users");

exports.createUsers = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const users = await Users.find();

    if (!username || !password || !email) {
      throw new Error("Tolong isi semua data");
    }

    users.map((user) => {
      if (user.email === email) {
        throw new Error("Email sudah ada");
      }
      if (user.username === username) {
        throw new Error("Username sudah ada");
      }
    });

    const user = await Users.create({
      email,
      username,
      password,
    });

    res.status(201).json({
      status: "Success",
      message: "create user is success",
      user: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  Users.find().then((result) => {
    res.status(200).json({
      status: "Success",
      message: "Get all users success",
      users: result,
    });
  });
};

exports.checkUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;

    if (!username || !password || !email)
      throw new Error("email, username, password harus di isi");

    const user = await Users.findOne({ email });
    if (!user) throw new Error("Akun tidak ada");

    if (user.username !== username && user.password !== password)
      throw new Error("Username dan Password Salah");

    if (user.username !== username) throw new Error("Username Salah");

    if (user.password !== password) throw new Error("Password Salah");

    req.user = user;

    next();
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getOneUser = async (req, res) => {
  const { _id } = req.user;
  Users.findById({ _id }).then((result) => {
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil akun",
      user: result,
    });
  });
};

exports.checkUserId = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await Users.findById({ _id });
    if (!user) throw new Error("Akun Tidak ada");
    req.user = user;
    next();
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getOneUserById = async (req, res) => {
  const { _id, username, password } = req.user;
  res.status(200).json({
    status: "Success",
    message: "Berhasil mengambil akun",
    user: { _id, username, password },
  });
};

exports.updateUserById = async (req, res) => {
  try {
    const oldUser = req.user;
    const reqUser = req.body;
    const userPayload = {
      email: reqUser.email || oldUser.email,
      username: reqUser.username || oldUser.username,
      password: reqUser.password || oldUser.password,
    };

    const user = await Users.findByIdAndUpdate(
      { _id: oldUser._id },
      userPayload,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Berhasil Meng-Update",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await Users.deleteOne({ _id });
    if (!user) throw new Error("Akun Gagal Dihapus");
    res.status(200).json({
      status: "Success",
      message: "Berhasil Menghapus Akun",
      user: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.changePasswordUserById = async (req, res) => {
  try {
    const oldUser = req.user;
    const reqUser = req.body;
    const userPayload = {
      email: reqUser.email || oldUser.email,
      username: reqUser.username || oldUser.username,
      password: reqUser.password || oldUser.password,
    };

    const user = await Users.findByIdAndUpdate(
      { _id: oldUser._id },
      userPayload,
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Berhasil Meng-Update",
      user: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};
