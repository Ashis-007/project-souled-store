const Category = require("../models/category");

exports.getCategoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id).exec();
    req.category = category;
    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Could not find category",
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const newCategory = await category.save();
    res.json({
      msg: "Successfully created new category",
      category: newCategory,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Could not save category in DB",
    });
  }
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    res.json(categories);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "No categories found",
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = req.category;
    category.name = req.body.name;
    await category.save();
    res.json({ msg: "Successfully updated category", category });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Failed to update category",
    });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    const category = req.category;
    await category.remove();
    res.json({
      message: "Successfully deleted category",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "Failed to delete category",
    });
  }
};
