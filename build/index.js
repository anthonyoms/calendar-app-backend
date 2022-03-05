"use strict";

var _express = _interopRequireDefault(require("express"));

require("dotenv/config");

var _cors = _interopRequireDefault(require("cors"));

var _config2 = require("./database/config");

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

var _events = _interopRequireDefault(require("./routes/events.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Crear el servidor de express
const app = (0, _express.default)(); //Base de datos para

(0, _config2.dbConnection)(); //CORS

app.use((0, _cors.default)()); //Directorio Publico

app.use(_express.default.static("public")); //Lectura y parseo del body

app.use(_express.default.json()); //Rutas

app.use("/api/auth", _auth.default);
app.use("/api/events", _events.default); //TODO: crud :Eventos
//Escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log("Servidor en puerto", process.env.PORT);
});