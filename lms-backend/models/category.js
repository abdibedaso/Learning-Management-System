const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
  },
  { timestamps: { uploadedAt: "created_at" } }
);

const Category = mongoose.model("Category", categorySchema);

exports.Category = Category;
