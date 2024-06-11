// =============================================================

( function ( ) {

// =============================================================

//
const
  NO_VALIDADO = -1,
  EXITO       = 0,
  ERROR       = 1;
//
const
  ERROR_LON_MIN                = 2,
  ERROR_LON_MAX                = 3,
  ERROR_CONTIENE_SOLO_ESPACIOS = 4;
//
const
  ERROR_CORREO_SIN_AROBA = 5,
  ERROR_CORREO_NO_VALIDO = 6;
//
let vForm1 = document.getElementById ( 'form-1' );
vForm1.vEstado = NO_VALIDADO;
//
vForm1.vInputTextCorreo                 = document.getElementById ( 'form-1_input-text-correo' );
vForm1.vInputTextCorreo.vDescripcion    = document.getElementById ( 'form-1_input-text-correo-desc' );
vForm1.vInputTextCorreo.vEstado         = NO_VALIDADO;
vForm1.vInputTextCorreo.vEstadoMensajes = [ ];
vForm1.vInputTextCorreo.vEstadoMensajes [ NO_VALIDADO ]                  = vForm1.vInputTextCorreo.vDescripcion.innerHTML;
vForm1.vInputTextCorreo.vEstadoMensajes [ ERROR_LON_MIN ]                = 'Tienes que colocar tu dirección de correo';
vForm1.vInputTextCorreo.vEstadoMensajes [ ERROR_CONTIENE_SOLO_ESPACIOS ] = 'Solo contiene espacios';
vForm1.vInputTextCorreo.vEstadoMensajes [ ERROR_CORREO_SIN_AROBA ]       = 'No contiene el caracter "@"';
vForm1.vInputTextCorreo.vEstadoMensajes [ ERROR_CORREO_NO_VALIDO ]       = 'Esta dirección de correo no es válida';
//
vForm1.vInputPassContrasena                 = document.getElementById ( 'form-1_input-pass-contrasena' );
vForm1.vInputPassContrasena.vDescripcion    = document.getElementById ( 'form-1_input-pass-contrasena-desc' );
vForm1.vInputPassContrasena.vEstado         = NO_VALIDADO;
vForm1.vInputPassContrasena.vEstadoMensajes = [ ];
vForm1.vInputPassContrasena.vEstadoMensajes [ NO_VALIDADO ]                  = vForm1.vInputPassContrasena.vDescripcion.innerHTML;
vForm1.vInputPassContrasena.vEstadoMensajes [ ERROR_LON_MIN ]                = 'Tienes que colocar tu contraseña';
vForm1.vInputPassContrasena.vEstadoMensajes [ ERROR_CONTIENE_SOLO_ESPACIOS ] = 'Solo contiene espacios';

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
// Este método se utiliza para desabilitar el comportamiento predeterminado del evento donde sea invocado

function prevenirPorDefecto ( vElemento )
{
  if ( vElemento.preventDefault ) {
    vElemento.preventDefault ( );
  }
  else {
    vElemento.returnValue = false;
  }
}

// =============================================================

function validarCorreo ( vCorreo )
{
  //
  if ( vCorreo.length == 0 ) {
    return ERROR_LON_MIN;
  }
  //
  vCorreo = vCorreo.trim ( );
  if ( vCorreo.length == 0 ) {
    return ERROR_CONTIENE_SOLO_ESPACIOS;
  }
  //
  if ( vCorreo.indexOf ( '@' ) < 0 ) {
    return ERROR_CORREO_SIN_AROBA;
  }
  //
  let vRegExp = /^([A-Za-z0-9!\#\$%&\'*+\-/=?^_`{|}~]+(\.[A-Za-z0-9!\#\$%&\'*+\-/=?^_`{|}~]+)*|"([A-Za-z0-9!\#\$%&\'*+\-/=?^_`{|}~\(\)<>\[\].,:;@]|\\[A-Za-z0-9!\#\$%&\'*+\-/=?^_`{|}~\(\)<>\[\].,:;@ "\\])*")@([A-Za-z0-9!\#\$%&\'*+\-/=?^_`{|}~]+(\.[A-Za-z0-9!\#\$%&\'*+\-/=?^_`{|}~]+)*|\[[\x21-\x5A\x5E-\x7E]+\])$/;
  if ( vRegExp.test ( vCorreo ) == false ) {
    return ERROR_CORREO_NO_VALIDO;
  }
  //
  return EXITO;
}

// =============================================================

function validarContrasena ( vContrasena )
{
  //
  if ( vContrasena.length == 0 ) {
     return ERROR_LON_MIN;
  }
  //
  vContrasena = vContrasena.trim ( );
  if ( vContrasena.length == 0 ) {
     return ERROR_CONTIENE_SOLO_ESPACIOS;
  }
  //
  return EXITO;
}

// =============================================================

let evFocusInputTextOrPass = function ( vEvento )
{
  vEvento = vEvento || window.event;
  let vElemento = vEvento.target || vEvento.srcElement;
  //
  if ( vElemento.vEstado != NO_VALIDADO )
  {
    vElemento.classList.replace ( vElemento.classList [ 2 ], 'principal_d-1_d-1_input-text-pass-tp-1-e-1' );
    vElemento.vDescripcion.classList.replace ( vElemento.vDescripcion.classList [ 2 ], 'principal_d-1_d-1_p-tp-1_e-1' );
    vElemento.vDescripcion.innerHTML = vElemento.vEstadoMensajes [ NO_VALIDADO ];
    vElemento.vEstado = NO_VALIDADO;
  }
}

// =============================================================

let evSubmit = function ( vEvento )
{
  vEvento = vEvento || window.event;
  var vElemento = vEvento.target || vEvento.srcElement;
  //
  vElemento.vInputTextCorreo.vEstado     = validarCorreo ( vElemento.vInputTextCorreo.value );
  vElemento.vInputPassContrasena.vEstado = validarContrasena ( vElemento.vInputPassContrasena.value );
  //
  vElemento.vEstado = ( vElemento.vInputTextCorreo.vEstado == EXITO 
                        && vElemento.vInputPassContrasena.vEstado == EXITO ) 
                      ? EXITO 
                      : ERROR;
  //
  if ( vElemento.vEstado != EXITO )
  {
    //
    if ( vElemento.vInputTextCorreo.vEstado != EXITO ) {
      vElemento.vInputTextCorreo.classList.replace ( vElemento.vInputTextCorreo.classList [ 2 ], 'principal_d-1_d-1_input-text-pass-tp-1-e-2' );
      vElemento.vInputTextCorreo.vDescripcion.classList.replace ( vElemento.vInputTextCorreo.vDescripcion.classList [ 2 ], 'principal_d-1_d-1_p-tp-1-e-2' );
      vElemento.vInputTextCorreo.vDescripcion.innerHTML = vForm1.vInputTextCorreo.vEstadoMensajes [ vElemento.vInputTextCorreo.vEstado ];
    }
    //
    if ( vElemento.vInputPassContrasena.vEstado != EXITO ) {
      vElemento.vInputPassContrasena.classList.replace ( vElemento.vInputPassContrasena.classList [ 2 ], 'principal_d-1_d-1_input-text-pass-tp-1-e-2' );
      vElemento.vInputPassContrasena.vDescripcion.classList.replace ( vElemento.vInputPassContrasena.vDescripcion.classList [ 2 ], 'principal_d-1_d-1_p-tp-1-e-2' );
      vElemento.vInputPassContrasena.vDescripcion.innerHTML = vForm1.vInputPassContrasena.vEstadoMensajes [ vElemento.vInputPassContrasena.vEstado ];
    }
    prevenirPorDefecto ( vEvento );
  }
};

// =============================================================

agregarControlador ( document, 'DOMContentLoaded', function ( vEvento )
{
  agregarControlador ( vForm1.vInputTextCorreo, 'focus', evFocusInputTextOrPass );
  agregarControlador ( vForm1.vInputPassContrasena, 'focus', evFocusInputTextOrPass );
  agregarControlador ( vForm1, 'submit', evSubmit );  
});

})();

// =============================================================