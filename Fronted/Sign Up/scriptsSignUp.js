window.onload = function () {
// 1. Inicializamos la librería JustValidate
const validador = new JustValidate("#formulario", {
  errorFieldCssClass: "error",
  errorLabelCssClass: "mensajeError",
  errorLabelStyle: {
    color: "#ec4490",
  },
});

// Reglas CORREO
validador.addField("#correo", [
  {
    rule: "required",
    errorMessage: "Debes introducir un correo",
  },
  {
    rule: "email",
    errorMessage: "El correo debe ser válido",
  },
]);
//Reglas EDAD 
  validador.addField("#edad", [
    { rule: "required", errorMessage: "Inserta una edad" },
    { rule: "number", errorMessage: "La edad debe ser un número" },
  ]);

  // Reglas TELÉFONO 
  validador.addField("#telefono", [
    { rule: "required", errorMessage: "Inserta un número de teléfono" },
    {
      rule: "customRegexp",
      value: /^[0-9]{7,15}$/,
      errorMessage: "El número de teléfono no es válido (7 a 15 dígitos)",
    },
  ]);
// Reglas CONTRASEÑA
validador.addField("#contrasena", [
  {
    rule: "required",
    errorMessage: "Debes introducir una contraseña",
  },
  {
    rule: "minLength",
    value: 6,
    errorMessage: "Mínimo 6 caracteres",
  },
  {
    rule: "maxLength",
    value: 12,
    errorMessage: "Máximo 12 caracteres",
  },
  {
    rule: "customRegexp",
    value: /[A-Z]/,
    errorMessage: "Debe tener al menos una mayúscula",
  },
  {
    rule: "customRegexp",
    value: /[0-9]/,
    errorMessage: "Debe tener al menos un número",
  },
  {
    rule: "customRegexp",
    value: /\W/,
    errorMessage: "Debe tener al menos un símbolo",
  },
]);

// Se ejecuta al pulsar Enviar si no haber errores y enviar a a lologin.php
validador.onSuccess((e) => {
  const correoInput = document.getElementById("correo").value;
  localStorage.setItem("correo", correoInput);
  alert("Ha entrado al área cliente");

  e.target.submit(); //  ir a login.php
});

//Cargar correo guardado al abrir la página
window.addEventListener("DOMContentLoaded", () => {
  let correoGuardado = localStorage.getItem("correo");
  if (correoGuardado) {
    document.getElementById("correo").value = correoGuardado;
  }
});
}
