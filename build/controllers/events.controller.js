"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEventos = exports.elimarEvento = exports.crearEvento = exports.actualizarEvento = void 0;

var _Evento = _interopRequireDefault(require("../models/Evento"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const getEventos = async (req, res) => {
  const eventos = await _Evento.default.find().populate("user", "name");
  res.json({
    ok: true,
    eventos
  });
};

exports.getEventos = getEventos;

const crearEvento = async (req, res) => {
  const evento = new _Evento.default(req.body);

  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    return res.json({
      ok: true,
      evento: eventoGuardado
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    });
  }
};

exports.crearEvento = crearEvento;

const actualizarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const {
    uid
  } = req;

  try {
    const evento = await _Evento.default.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id"
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permiso para editar este evento"
      });
    }

    const nuevoEvento = _objectSpread(_objectSpread({}, req.body), {}, {
      user: uid
    });

    const eventoActualizado = await _Evento.default.findByIdAndUpdate(eventoId, nuevoEvento, {
      new: true
    });
    return res.json({
      ok: true,
      evento: eventoActualizado
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    });
  }
};

exports.actualizarEvento = actualizarEvento;

const elimarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const {
    uid: user
  } = req;

  try {
    const evento = await _Evento.default.findById(eventoId);

    if (!evento) {
      return res.status(400).json({
        ok: false,
        msg: "El evento que esta intentando actualizar no existe"
      });
    }

    if (evento.user !== user) {
      if (evento.user.toString() !== user) {
        return res.status(401).json({
          ok: false,
          msg: "No tiene permiso para editar este evento"
        });
      }
    }

    const eventoEliminado = await _Evento.default.findByIdAndDelete(eventoId);
    return res.json({
      ok: true,
      eventoEliminado
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    });
  }

  res.json({
    ok: true,
    msg: "elimarEvento"
  });
};

exports.elimarEvento = elimarEvento;