"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var _validarCampos = require("../middlewares/validar-campos");

var _auth = require("../controllers/auth.controller");

var _validarJwt = require("../middlewares/validar-jwt");

/*
Rutas de Usuario / Auth
host + /api/auth
*/
const router = (0, _express.Router)();
router.post("/new", [(0, _expressValidator.check)("name", "El nombre es obligatorio").notEmpty(), (0, _expressValidator.check)("email", "El email es obligatorio").isEmail(), (0, _expressValidator.check)("password", "El password es obligatorio, minimo 6 caracteres").isLength({
  min: 6
}), _validarCampos.validarCampos], _auth.crearUsuario);
router.post("/", [(0, _expressValidator.check)("email", "El email es obligatorio").isEmail(), (0, _expressValidator.check)("password", "El password es obligatorio, minimo 6 caracteres").isLength({
  min: 6
}), _validarCampos.validarCampos], _auth.loginUsuario);
router.get("/renew", _validarJwt.validarJWT, _auth.revalidarToken);
var _default = router;
exports.default = _default;