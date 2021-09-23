const { Schema, model } = require("mongoose");

const categoriasSchema = new Schema(
  {
    CategoriaId: String,
    CategoriaName: String,
    SubCategorias: [
      {
      SubCategoriaId: Number,
      SubCategoriaName: String
      }
  ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("categorias", categoriasSchema);
