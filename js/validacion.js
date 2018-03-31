// Configuracion de FireBase
var error;
var config = {
  apiKey: "AIzaSyCiVPnmlWaTnjYmkTaTIzffAGNltS-k8Qs",
  authDomain: "bambumobile-e3934.firebaseapp.com",
  databaseURL: "https://bambumobile-e3934.firebaseio.com",
  projectId: "bambumobile-e3934",
  storageBucket: "bambumobile-e3934.appspot.com",
  messagingSenderId: "1079532805161"

};
var script = document.createElement('script');

firebase.initializeApp(config);

//Funcion que carga al iniciar la pagina, que liga la funcion "authOnClick" con el boton "iniciarsesion"
window.onload = function() {
  document.getElementById('iniciarsesion').addEventListener('click', authOnClick, false);
};

//Funcion que verifica si el usuario se puede autenticar con esas credenciales
function autenticar(email,pwd){
  var usr = firebase.auth().signInWithEmailAndPassword(email, pwd).then(function(data){
        location.href='logeado.html';
      },function(error){
        if (error.code === 'auth/wrong-password')
          alert('Contraseña incorrercta.');
        else if (error.code === 'auth/user-not-found')
          alert("Usuario no encontrado")
        else
          alert("Error al iniciar sesion")
      }).catch(function(error) {
        alert("Error en la comunicacion");
      });
}

//Funcion invocada al dar click en iniciar sesion
function authOnClick(){
  var email = document.getElementById("email").value;
  var pwd = document.getElementById("pwd").value;
  if(validarCorreo(email)){
    autenticar(email,pwd);
    };
}

//Funcion que para cerrar la sesion con FireBase
function salir(){
  firebase.auth().signOut();
}

//Se valida el correo por que en html5 es un poco pobre y no valida el dominio de primer nivel
function validarCorreo(email){
  if ( !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email))) {
    alert("Error en el formato del correro");
    return false;
  }
  return true;
}
