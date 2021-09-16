window.onload = function () {
    consultarCategorias();
}

function consultarCategorias(){
    var urlCompleta = '/OperacionCategorias/ObtenerCategorias';
    
    var request = $.ajax({
        url: urlCompleta, 
        type: 'GET', 
        dataType: 'json',
        data: {}
    })
    request.done(function (response) {
        agregarCategoriasAlNavbar(response);
    })   
    request.fail(function (jqXHR, textStatus) {
    })
}

function agregarCategoriasAlNavbar(response){
    response.forEach(element => {
        try {
            var categoriasNavbar = document.getElementById("categorias-navbar");

            var categoria = document.createElement("li");
            categoria.className = "blockquote-footer my-1";
            categoria.innerHTML =  "<a class='d-inline nav-link text-truncate' href='/Home/Products?categoriaId=" + element.CategoriaId + "'>" + element.CategoriaName + "</a>";
            categoriasNavbar.appendChild(categoria);
            console.log(element)
        } catch (error) { }
    });
}