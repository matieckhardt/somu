window.onload = function () {
    consultarCategorias();
}

function consultarCategorias() {
    var urlCompleta = '/OperacionCategorias/ObtenerCategorias';

    var request = $.ajax({
        url: urlCompleta,
        type: 'GET',
        dataType: 'json',
        data: {}
    })
    request.done(function (response) {
        agregarCategorias(response);
        agregarCategoriasAlNavbar(response);
    })
    request.fail(function (jqXHR, textStatus) {})
}

function agregarCategorias(response) {
    response.forEach(element => {
        try {
            var categorias = document.getElementById("categorias");
            var categoria = document.createElement("a");
            console.log(element)
            if (response.length < 5) {
                categoria.href = "/Home/Products?categoriaId=" + element.CategoriaId;
                categoria.className = "w-50 h-50";
                categoria.innerHTML = "<div class='w-100 h-100 category-custom' style='background: url(/img/categories/cat" + element.CategoriaId + ".jpg'></div><h1 class='text-white text-left pt-3'>" + element.CategoriaName + "</h1>";
                categorias.appendChild(categoria);
            } else {
                categoria.href = "/Home/Products?categoriaId=" + element.CategoriaId;
                categoria.className = "col-4 p-0 m-0 h-50";
                categoria.innerHTML = "<div class='w-100 h-100 category-custom' style='background: url(/img/categories/cat" + element.CategoriaId + ".jpg'></div><h1 class='text-white text-left pt-3'>" + element.CategoriaName + "</h1>";
                categorias.appendChild(categoria);
            }
        } catch (error) {}
    });
}

function agregarCategoriasAlNavbar(response) {
    response.forEach(element => {
        try {
            var categoriasNavbar = document.getElementById("categorias-navbar");

            var categoria = document.createElement("li");
            categoria.className = "blockquote-footer my-1";
            categoria.innerHTML = "<a class='d-inline nav-link text-truncate' href='/Home/Products?categoriaId=" + element.CategoriaId + "'>" + element.CategoriaName + "</a>";
            categoriasNavbar.appendChild(categoria);

        } catch (error) {}
    });
}