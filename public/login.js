function LoguearUsuario() {
    var user = document.getElementById("inputName").value;
    var password = document.getElementById("inputPassword").value;

    if(user != "" && password != ""){
        consultarUsuario(user, password);
    } 
}

function consultarUsuario(user, password){
    var urlCompleta = 'https://forexportmotos.com/OperacionUsuarios/Loguear';

    var request = $.ajax({
        url: urlCompleta, 
        type: 'GET', 
        dataType: 'json',
        data: {username: user, password: password}
    })
    request.done(function (response) {
        sessionStorage.setItem('usuario', JSON.stringify(response));
        window.location.href = "./Index";
    })  
    request.fail(function (jqXHR, textStatus) {

    })
}