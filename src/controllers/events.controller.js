import Evento from "../models/Evento";
export const getEventos = async (req, res) => {
  const eventos = await Evento.find().populate("user", "name");
  res.json({
    ok: true,
    eventos,
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
export const actualizarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const { uid } = req;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permiso para editar este evento",
      });
    }
    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    return res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
export const elimarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const { uid: user } = req;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(400).json({
        ok: false,
        msg: "El evento que esta intentando actualizar no existe",
      });
    }
    if (evento.user !== user) {
      if (evento.user.toString() !== user) {
        return res.status(401).json({
          ok: false,
          msg: "No tiene permiso para editar este evento",
        });
      }
    }
    const eventoEliminado = await Evento.findByIdAndDelete(eventoId);

    return res.json({
      ok: true,
      eventoEliminado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};
