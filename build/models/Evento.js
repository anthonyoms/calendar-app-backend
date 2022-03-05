"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const _excluded = ["_id"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const EventoSchema = (0, _mongoose.Schema)({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  //Relacion en mongo
  user: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  }
}, {
  versionKey: false
});
EventoSchema.method("toJSON", function () {
  const _this$toObject = this.toObject(),
        {
    _id
  } = _this$toObject,
        event = _objectWithoutProperties(_this$toObject, _excluded);

  event.id = _id;
  return event;
});

var _default = (0, _mongoose.model)("Evento", EventoSchema);

exports.default = _default;