var variableItemSeleccionado = 0;

window.onload = function () {
  var data = window.location.search;
  consultarCategoria(data.substr(data.indexOf("=") + 1));
  consultarCategorias();
};

function consultarCategorias() {
  var urlCompleta = "/OperacionCategorias/ObtenerCategorias";

  var request = $.ajax({
    url: urlCompleta,
    type: "GET",
    dataType: "json",
    data: {},
  });
  request.done(function (response) {
    agregarCategoriasAlNavbar(response);
  });
  request.fail(function (jqXHR, textStatus) {});
}

async function consultarCategoria(id) {
  await fetch("/OperacionCategorias/ObtenerCategoria", {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      $(".subtitle").text(data.CategoriaName);
      $(".title").text("Productos de " + data.CategoriaName);
      consultarItemsDeCategoria(data.CategoriaId);
    })
    .catch((err) => console.log(err));
}

async function consultarItemsDeCategoria(id) {
  await fetch("/OperacionCategorias/ObtenerItemsCategoria", {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => agregarItemDeCategoria(data))
    .catch((err) => console.log(err));
}

function agregarItemDeCategoria(items) {
  var itemCategoria = document.getElementById("items-categoria");

  items.forEach(function (element, index) {
    var item = document.createElement("div");
    item.id = "item-" + element.ProyectId;
    item.className = "card card-custom mx-2 mb-3";
    item.innerHTML = elementosDelItem(element);
    itemCategoria.appendChild(item);
  });

  if (
    sessionStorage.getItem("usuario") != null &&
    sessionStorage.getItem("usuario") != "null"
  ) {
    var addItem = document.createElement("div");
    addItem.className = "card card-custom mx-2 mb-3";
    addItem.innerHTML = elementoAgregarItemNuevo();
    itemCategoria.appendChild(addItem);
  }
}

function elementosDelItem(element) {
  var elementos =
    "" +
    "<a href='/Home/Products/Details?ProyectId="+ element.ProyectId + "'>" +
    "<img src='" +
    element.MainImageURL +
    "' alt='product img' class='card-img products-img'>" +
    "<div class='card-body d-flex flex-column mt-auto'><h4 class='card-title mb-0'>" +
    element.Title +
    "</h4><p class='card-text'>" +
    element.ShortDescription +
    "</p></div></a>";
  if (
    sessionStorage.getItem("usuario") != null &&
    sessionStorage.getItem("usuario") != "null"
  ) {
    elementos =
      elementos +
      "<div class='product-edit'>" +
      "<a href='#' onclick='itemSeleccionadoParaModificar(" +
      element.ProyectId +
      ")' data-toggle='modal' data-target='#editProduct' class='btn btn-sm btn-block btn-success editar-prod'>" +
      "<i class='fa fa-pen fa-lg'></i>" +
      "</a>" +
      "<a href='#' onclick='itemSeleccionado(" +
      element.ProyectId +
      ")' data-toggle='modal' data-target='#deleteProduct' class='btn btn-sm btn-block btn-danger eliminar-prod'>" +
      "<i class='fa fa-trash-alt fa-lg'></i>" +
      "</a>" +
      "</div>";
  }

  return elementos;
}

function elementoAgregarItemNuevo() {
  var elementoItemNuevo =
    "" +
    "<a href='' data-toggle='modal' data-target='#addProduct' class='h-100 w-100 d-flex justify-content-center'>" +
    "<i class='fa fa-plus fa-10x align-self-center text-secondary'></i>" +
    "</a>";

  return elementoItemNuevo;
}

function agregarCategoriasAlNavbar(response) {
  response.forEach((element) => {
    try {
      var categoriasNavbar = document.getElementById("categorias-navbar");

      var categoria = document.createElement("li");
      categoria.className = "blockquote-footer my-1";
      categoria.innerHTML =
        "<a class='d-inline nav-link text-truncate' href='/Home/Products?categoriaId=" +
        element.CategoriaId +
        "'>" +
        element.CategoriaName +
        "</a>";
      categoriasNavbar.appendChild(categoria);
    } catch (error) {}
  });
}

function guardarItemNuevo() {
  var imagenPrimaria = document.getElementById("imagen-principal-item").files;
  var imagenSecundaria = document.getElementById(
    "imagen-secundaria-item"
  ).files;
  var form = new FormData();
  var url = "/img/category-A/";

  if (imagenPrimaria.length == 1) {
    form.append(imagenPrimaria[0].name, imagenPrimaria[0]);
    url = url + imagenPrimaria[0].name;
  }

  for (var i = 0; i < imagenSecundaria.length; i++) {
    form.append(imagenSecundaria[i].name, imagenSecundaria[i]);
  }

  var specs1 = document.getElementById("specs1-add").value;
  var specs2 = document.getElementById("specs2-add").value;
  var specs3 = document.getElementById("specs3-add").value;
  var specs4 = document.getElementById("specs4-add").value;
  var specs5 = document.getElementById("specs5-add").value;
  var nombreProducto = document.getElementById("nombreProducto-add").value;
  var productDescription = document.getElementById(
    "productDescription-add"
  ).value;
  var resumenProducto = document.getElementById("resumenProducto-add").value;

  AgregarItemNuevo(
    url,
    nombreProducto,
    productDescription,
    resumenProducto,
    specs1,
    specs2,
    specs3,
    specs4,
    specs5,
    form
  );
}

function AgregarItemNuevo(
  url,
  nombreProducto,
  productDescription,
  resumenProducto,
  specs1,
  specs2,
  specs3,
  specs4,
  specs5,
  form
) {
  var urlCompleta = "/OperacionCategorias/AgregarItemNuevo";

  var request = $.ajax({
    url: urlCompleta,
    type: "GET",
    dataType: "json",
    data: {
      urlImagen: url,
      nombre: nombreProducto,
      descripcion: productDescription,
      resumen: resumenProducto,
      especificacion1: specs1,
      especificacion2: specs2,
      especificacion3: specs3,
      especificacion4: specs4,
      especificacion5: specs5,
    },
  });
  request.done(function (response) {
    AgregarImagenesItemNuevo(form);
  });
  request.fail(function (jqXHR, textStatus) {});
}

function AgregarImagenesItemNuevo(form) {
  debugger;
  var urlCompleta = "/OperacionCategorias/AgregarImagenesItemNuevo";

  var request = $.ajax({
    url: urlCompleta,
    type: "POST",
    contentType: false,
    processData: false,
    data: form,
  });
  request.done(function () {
    debugger;
    window.location.reload();
  });
  request.fail(function (jqXHR, textStatus) {});
}

function itemSeleccionado(id) {
  variableItemSeleccionado = id;
}

function eliminarItem() {
  var urlCompleta = "/OperacionCategorias/EliminarItem";

  var request = $.ajax({
    url: urlCompleta,
    type: "GET",
    data: {
      id: variableItemSeleccionado,
    },
  });
  request.done(function () {
    window.location.reload();
  });
  request.fail(function (jqXHR, textStatus) {});
}

function itemSeleccionadoParaModificar(id) {
  variableItemSeleccionado = id;

  var urlCompleta = "/OperacionCategorias/ObtenerItem";

  var request = $.ajax({
    url: urlCompleta,
    type: "GET",
    data: {
      id: variableItemSeleccionado,
    },
  });
  request.done(function (response) {
    $("#specs1-Edit").val();
    $("#specs2-Edit").val();
    $("#specs3-Edit").val();
    $("#specs4-Edit").val();
    $("#specs5-Edit").val();
    $("#nombreProducto-Edit").val(response.Title);
    $("#productDescription-Edit").val(response.Description);
    $("#resumenProducto-Edit").val(response.ShortDescription);
  });
  request.fail(function (jqXHR, textStatus) {});
}

function guardarModificaciones() {
  //TODO: FALTA LO DEL ARCHIVO
  var specs1 = document.getElementById("specs1-Edit").value;
  var specs2 = document.getElementById("specs2-Edit").value;
  var specs3 = document.getElementById("specs3-Edit").value;
  var specs4 = document.getElementById("specs4-Edit").value;
  var specs5 = document.getElementById("specs5-Edit").value;
  var nombreProducto = document.getElementById("nombreProducto-Edit").value;
  var productDescription = document.getElementById(
    "productDescription-Edit"
  ).value;
  var resumenProducto = document.getElementById("resumenProducto-Edit").value;

  AgregarModificaciones(
    nombreProducto,
    productDescription,
    resumenProducto,
    specs1,
    specs2,
    specs3,
    specs4,
    specs5
  );
}

function AgregarModificaciones(
  nombreProducto,
  productDescription,
  resumenProducto,
  specs1,
  specs2,
  specs3,
  specs4,
  specs5
) {
  var urlCompleta = "/OperacionCategorias/ModificarItem";

  var request = $.ajax({
    url: urlCompleta,
    type: "GET",
    dataType: "json",
    data: {
      id: variableItemSeleccionado,
      nombre: nombreProducto,
      descripcion: productDescription,
      resumen: resumenProducto,
      especificacion1: specs1,
      especificacion2: specs2,
      especificacion3: specs3,
      especificacion4: specs4,
      especificacion5: specs5,
    },
  });
  request.done(function (response) {
    window.location.reload();
  });
  request.fail(function (jqXHR, textStatus) {});
}
