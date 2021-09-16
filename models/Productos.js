const { Schema, model } = require("mongoose");

const productosSchema = new Schema(
  {
    ProyectId: Number,
    MainImageURL: String,
    Title: String,
    Description: String,
    ShortDescription: String,
    State: String,
    Address: String,
    Year: Number,
    Size: Number,
    Rooms: Number,
    Visible: Number,
    CategoriaId: Number,
    CreatedBy: Number,
    TourURL: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("productos", productosSchema);
