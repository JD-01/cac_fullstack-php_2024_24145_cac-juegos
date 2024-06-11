( function ( ) {

// =============================================================

const 
  URL_API = 'https://randomuser.me/api/';
//
const
  EXITO       = 0,
  ERROR       = 1;
//
let vButtonBuscarJugador            = document.getElementById ( 'button-buscar-jugador' );
//
vButtonBuscarJugador.vNombreUsuario = document.getElementById ( 'span-jugador-nombre-usuario' );
vButtonBuscarJugador.vNombre        = document.getElementById ( 'span-jugador-nombre' );
vButtonBuscarJugador.vApellido      = document.getElementById ( 'span-jugador-apellido' );
vButtonBuscarJugador.vEdad          = document.getElementById ( 'span-jugador-edad' );
vButtonBuscarJugador.vCorreo        = document.getElementById ( 'span-jugador-correo' );
vButtonBuscarJugador.vPais          = document.getElementById ( 'span-jugador-pais' );
vButtonBuscarJugador.vCiudad        = document.getElementById ( 'span-jugador-ciudad' );
vButtonBuscarJugador.vMensajeBusqueda = document.getElementById ( 'p-mensaje-busqueda' );
//
vButtonBuscarJugador.vMensajeBusqueda.vEstadoMensajes = [ ];
vButtonBuscarJugador.vMensajeBusqueda.vEstadoMensajes [ EXITO ] = '¡Jugador aleatorio encontrado exitosamente!';
vButtonBuscarJugador.vMensajeBusqueda.vEstadoMensajes [ ERROR ] = 'No se encontró un jugador aleatorio';

// =============================================================
// Este método se utiliza para agregar controladores de eventos compatibles con la mayoría de los navegadores

function agregarControlador ( vElemento, vTipo, vControlador )
{
  if ( vElemento.addEventListener ) {
    vElemento.addEventListener ( vTipo, vControlador, false );
  }
  else if ( vElemento.attachEvent ) {
    vElemento.attachEvent ( 'on' + vTipo, vControlador );
  }
  else {
    vElemento [ 'on' + vTipo ] = vControlador;
  }
}

// =============================================================

let evClick = async function ( vEvento )
{
  vEvento = vEvento || window.event;
  var vElemento = vEvento.target || vEvento.srcElement;
  //
  try
  {
    let vRespuesta     = await fetch ( URL_API );
    let vJsonAnalizado = await vRespuesta.json();
    let vJugador       = vJsonAnalizado.results[0];
    //
    vElemento.vNombreUsuario.innerHTML = vJugador.login.username;
    vElemento.vCorreo.innerHTML        = vJugador.email;
    vElemento.vNombre.innerHTML        = vJugador.name.first;
    vElemento.vApellido.innerHTML      = vJugador.name.last;
    vElemento.vEdad.innerHTML          = vJugador.dob.age;
    vElemento.vPais.innerHTML          = vJugador.location.country;
    vElemento.vCiudad.innerHTML        = vJugador.location.city;
    //
    vElemento.vMensajeBusqueda.innerHTML = vElemento.vMensajeBusqueda.vEstadoMensajes [ EXITO ];
    vElemento.vMensajeBusqueda.classList.replace ( vElemento.vMensajeBusqueda.classList [ 2 ], 'principal_d-1_d-1_d-2_p-1-e-3' );
  }
  catch ( vError )
  {
    vElemento.vMensajeBusqueda.innerHTML = vElemento.vMensajeBusqueda.vEstadoMensajes [ ERROR ];
    vElemento.vMensajeBusqueda.classList.replace ( vElemento.vMensajeBusqueda.classList [ 2 ], 'principal_d-1_d-1_d-2_p-1-e-2' );
  }
};

// =============================================================

agregarControlador ( document, 'DOMContentLoaded', function ( vEvento )
{
  agregarControlador ( vButtonBuscarJugador, 'click', evClick );
});

})();

// =============================================================