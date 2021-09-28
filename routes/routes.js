const { Router } = require("express");
const Categoria = require("../models/Categorias");
const Productos = require("../models/Productos");
const Form = require("../models/Form");
const path = require("path");
const Carousel = require("../models/Carousel");
const router = Router();

const ruta = path.join(__dirname, "../public/");

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/Home", function (req, res) {
  res.render("index");
});
router.get("/Categories", function (req, res) {
  res.render("categories");
});
router.get("/Home/Products", function (req, res) {
  res.render("products");
});
router.get("/Home/Products/Details", function (req, res) {
  res.render("/products-a/product-1");
});
router.get("/AboutUs", function (req, res) {
  res.render("about-us");
});
router.get("/Faq", function (req, res) {
  res.render("faq");
});
router.get("/Empresas", function (req, res) {
  res.render("empresas");
});
router.get("/Suv", function (req, res) {
  res.render("suv");
});
router.get("/Contact", function (req, res) {
  res.render("contact");
});
router.get("/Form", function (req, res) {
  res.render("form");
});
router.get("/Shop", function (req, res) {
  res.render("shop");
});
router.get("/Categorias/:subcat", async (req, res) => {
  try {
    const items = await Categoria.find({ CategoriaName: req.params.subcat });
    const datos = items[0].SubCategorias.map(
      ({ SubCategoriaImg, SubCategoriaName }) => ({
        img: SubCategoriaImg,
        name: SubCategoriaName,
      })
    );
    res.render("subcat", {
      SubCategorias: datos,
      CategoriaName: req.params.subcat,
    });
  } catch (error) {
    console.log("ups", error);
  }
});

router.get("/Categorias/:subcat/:producto", async (req, res) => {
  try {
    const producto = req.params.producto;
    const items = await Productos.find({ SubCategoriaName: req.params.producto });
   const datos = items.map(
      ({ MainImageURL, SubCategoriaName, Title }) => ({
        img: MainImageURL,
        name: Title,
        SubCategoria: SubCategoriaName,
      }
      ));
      console.log(datos)
    res.render("products", {
      Productos: datos,
      ProductoName: req.params.producto,
    });
  } catch (error) {
    console.log("ups", error);
  }
});

router.get("/getProd", async function (req, res) {
  const data = await Productos.find();
  const datos = data.map(
    ({ MainImageURL, SubCategoriaName, Title }) => ({
      img: MainImageURL,
      name: Title,
      SubCategoria: SubCategoriaName,
    }
    ));
    console.log(datos)
  res.json(datos);
});

// Filtros Categorias

router.get("/OperacionCategorias/ObtenerCategorias", async function (req, res) {
  const data = await Categoria.find();
  res.json(data);
});

router.get(
  "/OperacionCategorias/ObtenerSubCategorias/:nombre",
  async function (req, res) {
    Categoria.find({ CategoriaName: req.params.nombre }, (err, items) => {
      if (err) res.status(500).send(error);
      console.log(items[0].SubCategorias.map((o) => o.SubCategoriaName));
      res.render(
        "subcat",
        items[0].map((o) => o.SubCategoriaName)
      );
    });
  }
);

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
router.get("/ObtenerImagenesCarrousel", async function (req, res) {
  let data = await Carousel.find();
  res.json(data);
});

// Get all posts
router.get("/posts", async (req, res) => {
  const posts = await Carousel.find();
  res.send(posts);
});

router.post("/postCar", async (req, res) => {
  const datos = [
    {
      ProyectId: 1,
      MainImageURL: "/img/projects/romanos.jpg",
      Title: "Crono",
      Description: "Crono",
      ShortDescription: "",
      State: "",
      Address: "",
      Year: 0,
      Size: 0,
      Rooms: 0,
      Visible: 1,
      CategoriaId: 1,
      CreatedBy: 1,
      TourURL: "",
      SubCategoriaName: "Romanos",
    },
  ];
  try {
    datos.forEach(async (dato) => {
      const Producto = new Productos(dato);
      await Producto.save();
    });
    res.status(201).json("ok");
  } catch (error) {
    res.status(500).send("There was a problem");
  }
});

router.post("/postSubCat", async (req, res) => {
  const datos = [
    {
      CategoriaId: 1,
      CategoriaName: "Jona",
      SubCategorias: [
        {
          SubCategoriaId: 1,
          SubCategoriaName: "Roberto",
        },
      ],
    },
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

router.post("/postMongo", async (req, res) => {
  const datos = [req.body];
  try {
    datos.forEach(async (dato) => {
      const form = new Form(dato);
      console.log(form);
      await form.save();
    });
    res.status(201).json(datos);
  } catch (error) {
    res.status(500).send("There was a problem registering the client");
  }
});
router.get("/getForm", async function (req, res) {
  let data = await Form.find();
  console.log(data);
  res.json(data);
});

module.exports = router;
