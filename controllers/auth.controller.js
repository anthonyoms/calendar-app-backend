import { response } from "express";


export const crearUsuario = (req, res = response) => {
  const { name, email, password } = req.body;

  res.status(201).json({ ok: false, msg: "registro", name, email, password });
};

export const loginUsuario = (req, res = response) => {
  const { name, email } = req.body;

  res.json({ ok: false, msg: "login", name, email });
};

export const revalidarToken = (req, res) => {
  res.json({ ok: false, msg: "renew" });
};
