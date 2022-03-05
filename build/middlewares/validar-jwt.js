"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validarJWT = void 0;

var _express = require("express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validarJWT = (req, res = _express.response, next) => {
  // x-token headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición"
    });
  }

  try {
    const {
      uid,
      name
    } = _jsonwebtoken.default.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Token no válido"
    });
  }

  next();
};

exports.validarJWT = validarJWT;