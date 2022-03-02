import { response } from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario";
import { generarJwt } from "../helpers/generar-jwt";

export const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res
        .status(400)
        .json({ ok: false, msg: "Un usuario Existe con este correo" });
    }
    usuario = new Usuario(req.body);

    //Encriptar contaseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //Generar JWT
    const token = await generarJwt(usuario.id, usuario.name);
    res.status(201).json({
      ok: false,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comunicarse con el administrador",
    });
  }
};

export const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res
        .status(400)
        .json({ ok: false, msg: "El usuario no existe con este email" });
    }

    //Confirmar passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({ ok: false, msg: "Password incorrecto" });
    }
    //Generar token
    const token = await generarJwt(usuario.id, usuario.name);
    res.json({
      ok: false,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comunicarse con el administrador",
    });
  }
};

export const revalidarToken = async (req, res) => {
  const { uid, name } = req;

  const token = await generarJwt(uid, name);
  res.json({ ok: true, token });
};
