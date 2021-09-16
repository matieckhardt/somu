const { Schema, model } = require("mongoose");

const categoriasSchema = new Schema(
  {
    CategoriaId: String,
    CategoriaName: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("categorias", categoriasSchema);
