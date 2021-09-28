const { Router } = require("express");
const Categoria = require("../models/Categorias");
const Productos = require("../models/Productos");
const Form = require("../models/Form");
const path = require("path");
const Carousel = require("../models/Carousel");
const router = Router();

const ruta = path.join(__dirname, "../public/");

// Ruta del index y carousel
router.get("/", async (req, res)  => {
  try {
  const slide = await Carousel.find();
  const datos = slide.map(
    ({ HomeData }) => ({
      slideUrl: HomeData,
    })
  ); 
  res.render("index", {Slides: datos});
} catch (error) {
  console.log("ups", error);
}
});

// rutas a secciones 

router.get("/Categories", async (req, res)  => {
  try {
  const items = await Categoria.find();
  const datos = items.map(
    ({ CategoriaId, CategoriaName }) => ({
      id: CategoriaId,
      nombre: CategoriaName,     
    })
  ); 
  res.render("categories", {categorias: datos});
} catch (error) {
  console.log("ups", error);
}
});

router.get("/Productos/:subcat/:detalles", function (req, res) {
  res.render("/prodetails");
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

// Rutas de las Sub Categorias
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

// Rutas de los Productos
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



// Ruta para postear cosas a la base de ejemplo
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


module.exports = router;
