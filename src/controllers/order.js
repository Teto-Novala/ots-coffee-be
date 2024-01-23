const Orders = require("../models/orders");

exports.createOrder = async (req, res) => {
  try {
    const user = req.user;
    const { name_product, price, image } = req.body;
    if (!name_product || !price || !image) {
      throw new Error("Mohon Di isi");
    }

    const orders = await Orders.find({ userId: user._id });
    if (orders !== null) {
      orders.forEach((data) => {
        if (
          data.name_product === name_product &&
          data.transaction_status !== "settlement"
        ) {
          throw new Error("Anda Sudah Mengorder");
        }
      });
    }

    const order = await Orders.create({
      userId: user._id,
      user: {
        email: user.email,
        username: user.username,
      },
      name_product,
      price,
      image,
      transaction_status: "ordering",
    });
    res.status(200).json({
      status: "Success",
      message: "Berhasil Membuat Order",
      order: order,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const { _id } = req.params;
    const allOrders = await Orders.find({ userId: _id });
    const orders = allOrders.filter(
      (data) => data.transaction_status !== "settlement"
    );
    res.status(200).json({
      status: "Success",
      message: "Berhasil Mengambil Semua Order",
      orders,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.updateTransactionStat = async (req, res) => {
  try {
    const { userId } = req.params;
    const { transaction_status } = req.body;
    if (!userId) {
      throw new Error("Akun Tidak Ada");
    }

    const order = await Orders.updateMany(
      {
        userId: userId,
        transaction_status: {
          $in: ["ordering", "pending", "Terjadi Kesalahan"],
        },
      },
      {
        transaction_status,
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Berhasil Meng-update",
      orders: order,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.errorOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status_message } = req.body;

    const result = await Orders.updateMany(
      {
        userId,
        transaction_status: {
          $in: ["ordering", "pending"],
        },
      },
      {
        transaction_status: "Terjadi Kesalahan",
      }
    );

    return res.status(201).json({
      status: "Success",
      message: status_message,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};
