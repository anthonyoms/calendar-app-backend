import Evento from "../models/Evento";
export const getEventos = (req, res) => {
  res.json({
    ok: true,
    msg: "getEventos",
  });
};
export const crearEvento = async (req, res) => {
  const evento = new Evento(req.body);
  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    return res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
export const actualizarEvento = (req, res) => {
  res.json({
    ok: true,
    msg: "actualizarEvento",
  });
};
export const elimarEvento = (req, res) => {
  res.json({
    ok: true,
    msg: "elimarEvento",
  });
};
