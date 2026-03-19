window.onload = function () {
  // 1. Inicializamos la librería con las opciones de validación desactivadas en tiempo real
  const validador = new JustValidate("#formulario", {
    errorFieldCssClass: "error",
    errorLabelCssClass: "mensajeError",
    errorLabelStyle: {
      color: "#ec4490",
    },
    validateOnInput: false,  // No muestra mientras escribes
    validateOnBlur: false,   // No muestra al salir del input
  });

  // 2. Reglas CORREO
  validador.addField("#usuario", [
    {
      rule: "required",
      errorMessage: "Debes introducir un usuario",
    },
  ]);

  // 3. Reglas CONTRASEÑA
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

  // 4. Se ejecuta SOLO si no hay errores al pulsar Enviar
  validador.onSuccess((e) => {
    const correoInput = document.getElementById("correo").value;
    localStorage.setItem("correo", correoInput);
    alert("Ha entrado al área cliente");
    e.target.submit(); 
  });

  // 5. Cargar correo guardado
  let correoGuardado = localStorage.getItem("correo");
  if (correoGuardado) {
    document.getElementById("correo").value = correoGuardado;
  }
};