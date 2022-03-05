"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _events = require("../controllers/events.controller");

var _isDate = require("../helpers/isDate");

var _validarCampos = require("../middlewares/validar-campos");

var _validarJwt = require("../middlewares/validar-jwt");

//Obtener eventos

/*
Rutas de eventos / Events
host + /api/events
*/
const router = (0, _express.Router)();
router.use(_validarJwt.validarJWT);
router.get("/", _events.getEventos);
router.post("/", [(0, _expressValidator.check)("title", "El titulo es obligatorio").notEmpty(), (0, _expressValidator.check)("start", "Fecha inicio es obligatorio").custom(_isDate.isDate), (0, _expressValidator.check)("end", "Fecha de finalización es obligatorio").custom(_isDate.isDate), _validarCampos.validarCampos], _events.crearEvento);
router.put("/:id", (0, _expressValidator.check)("title", "El titulo es obligatorio").not().isEmpty(), (0, _expressValidator.check)("start", "Fecha de inicio es obligatoria").custom(_isDate.isDate), (0, _expressValidator.check)("end", "Fecha de finalización es obligatoria").custom(_isDate.isDate), _validarCampos.validarCampos, _events.actualizarEvento);
router.delete("/:id", _events.elimarEvento);
var _default = router;
exports.default = _default;