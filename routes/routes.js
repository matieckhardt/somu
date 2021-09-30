const { Router } = require("express");
const Categoria = require("../models/Categorias");
const Productos = require("../models/Productos");
const Form = require("../models/Form");
const path = require("path");
const Carousel = require("../models/Carousel");
const Photos = require("../models/Photos.files");
const Chunks = require("../models/Photo.chunks");
const homeController = require("../controllers/fotoUpload");
const uploadController = require("../controllers/upload");
const router = Router();

const ruta = path.join(__dirname, "../public/");

// Ruta del index y carousel
router.get("/", async (req, res) => {
  try {
    const slide = await Carousel.find();
    const datos = slide.map(
      ({ HomeData }) => ({
        slideUrl: HomeData,
      })
    );
    res.render("index", { Slides: datos, headContent: 'Home' });
  } catch (error) {
    console.log("ups", error);
  }
});

// rutas a secciones 

router.get("/Categories", async (req, res) => {
  try {
    const items = await Categoria.find();
    const datos = items.map(
      ({ CategoriaId, CategoriaName }) => ({
        id: CategoriaId,
        nombre: CategoriaName,
      })
    );
    res.render("categories", { categorias: datos, headContent: 'Categorias' });
  } catch (error) {
    console.log("ups", error);
  }
});

router.get("/Productos/Detalles/:details", async (req, res) => {
  try {
    const Detalles = await Productos.find({ Title: req.params.details });
    const DetallesImg = await Productos.find();
    const fotos = DetallesImg[0].imgCar.map(
      (imgCar) => ({ fotos: imgCar })
    );
    const datos = Detalles.map(
      ({ Title,
        MainImageURL,
        Description,
        Resumen,
        SpecA,
        SpecB,
        SpecC,
        SpecD,
        SpecE,
        SubCategoriaName,
        LinkUrl, }) => ({
          Titulo: Title,
          img: MainImageURL,
          Descrip: Description,
          Resumen: Resumen,
          SpA: SpecA,
          SpB: SpecB,
          SpC: SpecC,
          SpD: SpecD,
          SpE: SpecE,
          link: LinkUrl,
          SubCat: SubCategoriaName,

        })
    );
    res.render("prodetails", { Car: fotos, detalles: datos, headContent: 'Detalles' });
    console.log(datos)
  } catch (error) {
    console.log("ups", error);
  }
});

router.get("/AboutUs", function (req, res) {
  res.render("about-us", { headContent: 'Nosotros' });
});
router.get("/CargaProd", function (req, res) {
  res.render("cargaProd", { headContent: 'Nuevo Producto' });
});
router.get("/upload", function (req, res) {
  res.render("upload", { headContent: 'Nueva fotos' });
});
router.get("/Faq", function (req, res) {
  res.render("faq", { headContent: 'FAQ' });
});
router.get("/Empresas", function (req, res) {
  res.render("empresas", { headContent: 'Empresas' });
});
router.get("/Suv", function (req, res) {
  res.render("suv", { headContent: 'Soluciones UV' });
});
router.get("/Contact", function (req, res) {
  res.render("contact", { headContent: 'Contacto' });
});
router.get("/Form", function (req, res) {
  res.render("form", { headContent: 'Form' });
});
router.get("/Shop", function (req, res) {
  res.render("shop", { headContent: 'Shop' });
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
      headContent: 'SubCategorias',
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
      headContent: 'Productos',
    });
  } catch (error) {
    console.log("ups", error);
  }
});



// Ruta para postear cosas a la base de ejemplo
router.post("/nuevoProd", async (req, res) => {
  try {
    const { Title, Description, Resumen, SpecA, SpecB, SpecC, SpecD, SpecE, LinkUrl, SubCategoriaName } = req.body;
    const Producto = new Productos({
      Title,
      Description,
      Resumen,
      SpecA,
      SpecB,
      SpecC,
      SpecD,
      SpecE,
      LinkUrl,
      SubCategoriaName,
    });
    await Producto.save();
    return false;
  } catch (error) {
    res.status(500).send("There was a problem registering the productos");
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

// upload fotos

router.get("/fotoUpload", homeController.getHome);
router.post("/upload", uploadController.uploadFile);

router.get('/Photos', async (req, res) => {
  try {
    const imagen = await Chunks.find();
    const fotos = imagen.map((data) => ({ img: data}));
    console.log(fotos)
    res.render ("chunks",{ Chunks: fotos });
  } catch (error) {
    console.log("ups", error);
  }
});
  module.exports = router;
