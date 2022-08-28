import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import brands from "./data/brands.data.js";
import products from "./data/products.data.js";
import testLibrary from "./data/test-library.data.js";

import Brand from "./models/brandModel.js";
import Product from "./models/productModel.js";
import TestLibrary from "./models/testLibraryModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Brand.deleteMany();
    await Product.deleteMany();
    await TestLibrary.deleteMany();

    const mappedBrand = brands.map((brand) => {
      delete brand._id;
      delete brand.__v;
      return brand;
    });
    await Brand.insertMany(mappedBrand);

    const mappedProd = products.map((prod) => {
      delete prod._id;
      delete prod.__v;
      return prod;
    });
    await Product.insertMany(mappedProd);

    const mappedTestLibrary = testLibrary.map((data) => {
      delete data._id;
      delete data.__v;
      return data;
    });
    await TestLibrary.insertMany(mappedTestLibrary);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Brand.deleteMany();
    await Product.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
