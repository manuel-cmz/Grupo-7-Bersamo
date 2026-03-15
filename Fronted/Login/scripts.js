const EMAIL = document.getElementById("mail");
const CONTRASINAL = document.getElementById("contrasinal");
const ERROR_MAIL = document.getElementById("errorMail");
const ERROR_CONTRASINAL = document.getElementById("errorContrasinal");
const CONTRASINAL_VISIBILITY = document.getElementById(
  "contrasinal_visibility"
);
const RECORDAR = document.getElementById("remember");
const ENVIAR = document.getElementById("enviar");

ENVIAR.addEventListener("click", validar, false);

function validarEMail() {
  if (!EMAIL.checkValidity()) {
    if (EMAIL.validity.valueMissing) {
      error(EMAIL, "Debes introducir un mail");
    }

    if (EMAIL.validity.patternMismatch) {
      error(EMAIL, "El mail debe de ser válido");
    }

    return false;
  }

  return true;
}

function validarContrasinal() {
  let regexNumero = /[0-9]/;
  let regexMayus = /[A-Z]/;
  let regexSimbolo = /\W/;

  if (!CONTRASINAL.checkValidity()) {
    if (CONTRASINAL.validity.valueMissing) {
      error(CONTRASINAL, "Debes introducir una contraseña");
    }

    if (CONTRASINAL.validity.patternMismatch) {
      if (
        !regexMayus.test(CONTRASINAL.value) &&
        !regexNumero.test(CONTRASINAL.value) &&
        !regexSimbolo.test(CONTRASINAL.value)
      ) {
        error(
          CONTRASINAL,
          "La contraseña debe tener al menos un número, una letra mayúscula y un símbolo"
        );
      } else if (!regexMayus.test(CONTRASINAL.value)) {
        error(CONTRASINAL, "La contraseña debe tener al menos una mayúscula");
      } else if (!regexNumero.test(CONTRASINAL.value)) {
        error(CONTRASINAL, "La contraseña debe tener al menos un número");
      } else if (!regexSimbolo.test(CONTRASINAL.value)) {
        error(CONTRASINAL, "La contraseña debe tener al menos un símbolo");
      } else {
        error(CONTRASINAL, "La contraseña debe tener entre 6 y 12 caracteres");
      }
    }

    return false;
  }

  return true;
}

function validar(e) {
  borrarError();
  e.preventDefault();

  let emailValido = validarEMail();
  let contrasinalValida = validarContrasinal();

  if (
    emailValido &&
    contrasinalValida &&
    confirm("¿Desea acceder al área cliente?")
  ) {
    if (RECORDAR.checked) {
      localStorage.setItem("mail", EMAIL.value);
    }

    alert("Ha entrado al área cliente");
    return true;
  } else {
    return false;
  }
}

window.addEventListener("DOMContentLoaded", (e) => {
  let mail = localStorage.getItem("mail");

  if (mail) {
    EMAIL.value = mail;
  }
});

function error(elemento, mensaje) {
  let idElemento = elemento.id;

  elemento.className = "error";
  elemento.focus();

  switch (idElemento) {
    case "mail":
      ERROR_MAIL.innerHTML = mensaje;
      ERROR_MAIL.className = "mensajeError";
      break;
    case "contrasinal":
      ERROR_CONTRASINAL.innerHTML = mensaje;
      ERROR_CONTRASINAL.className = "mensajeError";
      break;
  }
}

function borrarError() {
  let formulario = document.forms[0];
  let errores = [ERROR_MAIL, ERROR_CONTRASINAL];

  for (let i = 0; i < formulario.elements.length; i++) {
    formulario.elements[i].className = "";
  }

  for (let j = 0; j < errores.length; j++) {
    errores[j].className = "normal";
    errores[j].innerHTML = "ddddd";
  }
}

CONTRASINAL_VISIBILITY.addEventListener("click", showPassword, false);

let cont = 1;

function showPassword() {
  if (CONTRASINAL.type === "password") {
    CONTRASINAL.type = "text";
  } else {
    CONTRASINAL.type = "password";
  }

  cont++;

  if (cont % 2 == 0) {
    CONTRASINAL_VISIBILITY.classList.remove("fa-eye-slash");
    CONTRASINAL_VISIBILITY.classList.add("fa-eye");
  } else {
    CONTRASINAL_VISIBILITY.classList.remove("fa-eye");
    CONTRASINAL_VISIBILITY.classList.add("fa-eye-slash");
  }
}