const { Router } = require("express");
const Categoria = require("../models/Categorias");
const Productos = require("../models/Productos");
const path = require("path");
const Carousel = require("../models/Carousel");
const jsonProductos = require("../public/jsons/productos.json");
const router = Router();

const ruta = path.join(__dirname, "../public/");

router.get("/", (req, res) => {
  res.send(index);
});
router.get("/Home", function (req, res) {
  res.sendFile(ruta + "index.html");
});
router.get("/Categories", function (req, res) {
  res.sendFile(ruta + "categories.html");
});
router.get("/Home/Products", function (req, res) {
  res.sendFile(ruta + "products.html");
});
router.get("/Home/Products/Details", function (req, res) {
  res.sendFile(ruta + "/products-a/product-1.html");
});
router.get("/AboutUs", function (req, res) {
  res.sendFile(ruta + "about-us.html");
});
router.get("/Faq", function (req, res) {
  res.sendFile(ruta + "faq.html");
});
router.get("/Empresas", function (req, res) {
  res.sendFile(ruta + "empresas.html");
});
router.get("/Suv", function (req, res) {
  res.sendFile(ruta + "suv.html");
});
router.get("/Contact", function (req, res) {
  res.sendFile(ruta + "contact.html");
});
router.get("/Sales", function (req, res) {
  res.sendFile(ruta + "sales.html");
});

// Filtros Categorias

router.get("/OperacionCategorias/ObtenerCategorias", async function (req, res) {
  const data = await Categoria.find();
  res.json(data);
});

router.post("/OperacionCategorias/ObtenerCategoria", async function (req, res) {
  const data = await Categoria.find({ CategoriaId: req.body.id });
  res.json(data[0]);
});

router.post(
  "/OperacionCategorias/ObtenerItemsCategoria",
  async function (req, res) {
    let data = await Productos.find({ CategoriaId: req.body.id });
    res.json(data);
  }
);
router.get(
  "/ObtenerImagenesCarrousel",
  async function (req, res) {
    let data = await Carousel.find();
    res.json(data);
  }
);

// Get all posts
router.get("/posts", async (req, res) => {
  const posts = await Carousel.find();
  res.send(posts);
});

router.post("/postCar", async (req, res) => {
  const datos = [
    {
      CarouselLanding: 1,
      HomeId: "carousel-landing",
      HomeData: "./img/carousel/img-2.jpg",
    },
    {
      CarouselLanding: 2,
      HomeId: "carousel-landing",
      HomeData: "./img/carousel/img-2.jpg",
    },
    {
      CarouselLanding: 3,
      HomeId: "carousel-landing",
      HomeData: "./img/carousel/img-3.jpg",
    },
    {
      CarouselLanding: 4,
      HomeId: "carousel-landing",
      HomeData: "./img/carousel/img-4.jpg",
    },
  ];
  try {
    datos.forEach(async (dato) => {
      const carrusel = new Carousel(dato);
      await carrusel.save();
    });
    res.status(201).json("ok");
  } catch (error) {
    res.status(500).send("There was a problem");
  }
});

router.post("/postearDatos", async (req, res) => {
  const datos = [
    {
      "CategoriaId": 1,
      "CategoriaName": "Calle"
    },
    {
      "CategoriaId": 2,
      "CategoriaName": "Enduro / Touring"
    },
    {
      "CategoriaId": 3,
      "CategoriaName": "Scooter"
    },
    {
      "CategoriaId": 4,
      "CategoriaName": "Cubs"
    },
    {
      "CategoriaId": 5,
      "CategoriaName": "Naked / Pista"
    },
    {
      "CategoriaId": 6,
      "CategoriaName": "Cascos"
    }
  ];
  try {
    datos.forEach(async (dato) => {
      const categorias = new Categoria(dato);
      console.log(categorias);
      await categorias.save();
    });
    res.status(201).json("ok");
  } catch (error) {
    res.status(500).send("There was a problem registering the client");
  }
});

module.exports = router;
