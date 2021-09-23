var variableImagenSeleccionado = 0;

window.onload = function () {
    obtenerImagenes();
    asignarPermisos();

    // ** ESTE ES EL CARRUSEL DEL QUOTE **
  $("#testimonios").slick({
    dots: false,
    arrows: false,
    autoplay: true,
    draggable: true,
    fade: true,
    infinite: true,
    autoplaySpeed: 1000,
    speed: 2000,
  });
}



function asignarPermisos(){
    if(sessionStorage.getItem('usuario') != null && sessionStorage.getItem('usuario') != "null"){
        var carrouselEdit = document.getElementById("carousel-edit");

        var edit = document.createElement("a");
        edit.className = "d-block";
        edit.href = "#";
        edit.setAttribute("data-toggle","modal");
        edit.setAttribute("data-target","#uploadImg");
        edit.innerHTML = "<i class='text-primary fa fa-plus-circle fa-2x'></i>";
        carrouselEdit.appendChild(edit);

        var sort = document.createElement("a");
        sort.className = "d-block";
        sort.href = "#";
        sort.setAttribute("data-toggle","modal");
        sort.setAttribute("data-target","#sortImg");
        sort.innerHTML = "<i class='text-primary fa fa-sort-numeric-down fa-2x'></i>";
        carrouselEdit.appendChild(sort);

        var del = document.createElement("a");
        del.className = "d-block";
        del.href = "#";
        del.setAttribute("data-toggle","modal");
        del.setAttribute("data-target","#deleteImg");
        del.innerHTML = "<i class='text-primary fa fa-trash-alt fa-2x'></i>";
        carrouselEdit.appendChild(del);
    }
}

function obtenerImagenes() {
    var urlCompleta = '/ObtenerImagenesCarrousel';

    var request = $.ajax({
        url: urlCompleta,
        type: 'GET',
        dataType: 'json',
        data: {}
    })
    request.done(function (response) {
        agregarImagenesAlCarrousel(response);
        ejecutarAcciones();
    })
    request.fail(function (jqXHR, textStatus) {
    })
}

function agregarImagenesAlCarrousel(imagenes) {
    imagenes.forEach(element => {
        var carrousel = document.getElementById("carousel-landing");

        var imagen = document.createElement("div");
        imagen.innerHTML = "<img src='" + element.HomeData + "' alt='Imagen carrusel presentación " + element.HomeId + "'>";
        carrousel.appendChild(imagen);
    });
}

function guardarImagenDeCarrousel() {
    var files = document.getElementById("customFile").files;
    var formData = new FormData();

    for(var i = 0; i < files.length; i++){
        formData.append(files[i].name, files[i]);
    }

    uploadFiles(formData);
}   

function uploadFiles(formData){
    var urlCompleta = '/OperacionHome/AgregarImagenCarrousel';

    var request = $.ajax({
        url: urlCompleta,
        type: 'POST',
        contentType: false,
        processData: false,
        data: formData
    })
    request.done(function (response) {
        window.location.reload(); 
    })
    request.fail(function (jqXHR, textStatus) {
    })
}

function imagenSeleccionado(id){
    variableImagenSeleccionado = id;
}

//TODO : falta implementar para que se muestren las imagenes en modal
function eliminarImagenCarrousel(){
    var urlCompleta = '/OperacionHome/EliminarImagenCarrousel';

    var request = $.ajax({
        url: urlCompleta,
        type: 'GET',
        data: { id: variableImagenSeleccionado }
    })
    request.done(function () {
        window.location.reload(); 
    })
    request.fail(function (jqXHR, textStatus) {
    })
}

function ejecutarAcciones() {
    // **** ESTE ES EL CARRUSEL DEL INDEX ****
    $("#carousel-landing").slick({
        dots: false,
        arrows: false,
        autoplay: true,
        draggable: true,
        fade: true,
        lazyLoad: 'progressive',
        infinite: true,
        autoplaySpeed: 4000,
        speed: 4000,
    });

    // **** ESTE ES EL CARRUSEL DE LOS PRODUCTOS ****
    $(".carousel-product").slick({
        dots: true,
        arrows: true,
        autoplay: true,
        draggable: true,
        fade: true,
        lazyLoad: 'progressive',
        infinite: true,
        autoplaySpeed: 5000,
        speed: 3000,
    });

    // **** ESTO ES EL TOGGLER DEL MENU PARA VERSION MOBILE ****
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
/*
    // **** ESTO PRESENTA LAS IMGS DEL CARRUSEL EN EL BOTON DE EDITAR ****
    // seteamos el dir y la extensión de los archivos a buscar
    var dir = "/img/carousel";
    var fileextension = [".jpeg", ".jpg"];
    $.ajax({
        // hacemos la consulta a ajax con la url donde están las imgs y los ok los presentamos en el html
        url: dir,
        success: function (data) {
            // acá listamos todos los archivos encontrados
            $(data).find("a:contains(" + (fileextension[0]) + "), a:contains(" + (fileextension[1]) +
                ")").each(function () {
                    var filename = this.href.replace(window.location.host, "//forexportmotos.com/").replace("http://",
                        "");
                    $("#preview").append(
                        `<div class='edit-carousel col p-0'>
              <a href="#" class='seleccionar d-block' name='` + filename + `' onclick='selectImg(this)'>
                  <img class='img-fluid' src='` + filename + `'>
              </a>
          </div>`
                    );
                });
        }
    });

    // **** ESTO PRESENTA LAS IMGS DEL CARRUSEL EN EL BOTON DE BORRAR ****
    var dir = "/img/carousel";
    var fileextension = [".jpeg", ".jpg"];
    $.ajax({
        url: dir,
        success: function (data) {
            $(data).find("a:contains(" + (fileextension[0]) + "), a:contains(" + (fileextension[1]) +
                ")").each(function () {
                    var filename = this.href.replace(window.location.host, "//forexportmotos.com/").replace("http://",
                        "");
                    $("#deleteCar").append(
                        `<div class='edit-carousel col p-0'>
                            <a href="#" class='seleccionar d-block' name='` + filename + `' onclick='selectImg(this)'>
                            <img class='img-fluid' src='` + filename + `'>
                            </a>
                        </div>`
                    );
                });
        }
    });

    // **** ESTO DETECTA CLICKS EN LAS IMG DEL EDITOR CARRUSEL ****
    // **** TE DEVUELVE EL URL DE LA IMG ****
    // se genera array de imgs con la clase .seleccionar
    const arrImgs = document.getElementsByClassName('.seleccionar');
    // se itera el array
    for (let item of arrImgs) {
        // le agregamos un listener al hacer click con la funcion selectImg
        item.addEventListener('click', selectImg(this));
    }
    // esta funcion te devuelve el filename del attr name
    const selectImg = e => {
        let imagen = e.getElementsByTagName('img')[0];
        alert("la url es " + imagen.src)
    }
    */

    // **** ACTIVA EL SCROLLREVEALER WOW ****
    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animate__animated', // animation css class (default is animated)
        offset: 15, // distance to the element when triggering the animation (default is 0)
        mobile: false, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function (box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null, // optional scroll container selector, otherwise use window,
        resetAnimation: true, // reset animation on end (default is true)
    });
    wow.init();
}



