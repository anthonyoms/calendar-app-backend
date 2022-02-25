"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Crear el servidor de express
var app = (0, _express["default"])(); //Rutas

app.get("/", function (req, res) {
  res.json({
    ok: true
  });
}); //Escuchar peticiones

app.listen(4000, function () {
  console.log("Servidor en puerto", 4000);
});