"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.revalidarToken = exports.loginUsuario = exports.crearUsuario = void 0;

var _express = require("express");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _Usuario = _interopRequireDefault(require("../models/Usuario"));

var _generarJwt = require("../helpers/generar-jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const crearUsuario = async (req, res = _express.response) => {
  const {
    email,
    password
  } = req.body;

  try {
    let usuario = await _Usuario.default.findOne({
      email
    });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario Existe con este correo"
      });
    }

    usuario = new _Usuario.default(req.body); //Encriptar contaseña

    const salt = _bcryptjs.default.genSaltSync();

    usuario.password = _bcryptjs.default.hashSync(password, salt);
    await usuario.save(); //Generar JWT

    const token = await (0, _generarJwt.generarJwt)(usuario.id, usuario.name);
    res.status(201).json({
      ok: false,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comunicarse con el administrador"
    });
  }
};

exports.crearUsuario = crearUsuario;

const loginUsuario = async (req, res = _express.response) => {
  const {
    email,
    password
  } = req.body;

  try {
    const usuario = await _Usuario.default.findOne({
      email
    });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con este email"
      });
    } //Confirmar passwords


    const validPassword = _bcryptjs.default.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto"
      });
    } //Generar token


    const token = await (0, _generarJwt.generarJwt)(usuario.id, usuario.name);
    res.json({
      ok: false,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comunicarse con el administrador"
    });
  }
};

exports.loginUsuario = loginUsuario;

const revalidarToken = async (req, res) => {
  const {
    uid,
    name
  } = req;
  const token = await (0, _generarJwt.generarJwt)(uid, name);
  res.json({
    ok: true,
    token
  });
};

exports.revalidarToken = revalidarToken;