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
validador.addField("#email", [
  {
    rule: "required",
    errorMessage: "Debes introducir un email",
  },
  {
    rule: "email",
    errorMessage: "El email debe ser válido",
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
  const emailInput = document.getElementById("email").value;
  localStorage.setItem("email", emailInput);
  alert("Ha entrado al área cliente");

  e.target.submit(); //  ir a login.php
});

//Cargar email guardado al abrir la página
window.addEventListener("DOMContentLoaded", () => {
  let emailGuardado = localStorage.getItem("email");
  if (emailGuardado) {
    document.getElementById("email").value = correoGuardado;
  }
});
}
