const Products = require("../models/products");
const cloudinary = require("../utils/cloudinary");

exports.createProducts = async (req, res) => {
  const { name_product, detail_product, price, image } = req.body;
  try {
    if (req.file == null) throw new Error("Mohon Isi Gambar");
    const fileBase64 = req.file.buffer.toString("base64");
    const file = `data:${req.file.mimetype};base64,${fileBase64}`;

    const products = await Products.find();

    if (products !== null) {
      products.forEach((data) => {
        if (data.name_product === name_product)
          throw new Error("Nama Product Sudah Ada");
      });
    }
    const result = await cloudinary.uploader.upload(
      file,
      {
        folder: "Product Coffee Shop",
      },
      async function (err, result) {
        if (!!err) {
          return res.status(400).json({
            status: "upload file",
            message: err.message,
          });
        }

        const product = await Products.create({
          name_product,
          detail_product,
          price,
          image: {
            public_id: result.public_id,
            url: result.secure_url,
          },
        });

        res.status(201).json({
          status: "Success",
          message: "Berhasil Membuat Product",
          product: product,
        });
      }
    );
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const result = await Products.find();
    res.status(200).json({
      status: "Success",
      message: "Berhasil Mengambil Products",
      products: result,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.checkProductById = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const product = await Products.findById({ _id });
    if (!product) throw new Error("Product tidak ada");
    req.product = product;
    next();
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  const product = req.product;
  res.status(200).json({
    status: "Success",
    message: "Berhasil Mengambil Product",
    product: product,
  });
};
