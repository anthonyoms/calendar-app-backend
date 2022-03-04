//Obtener eventos
/*
Rutas de eventos / Events
host + /api/events
*/
import { Router } from "express";
import { check } from "express-validator";
import {
  actualizarEvento,
  crearEvento,
  elimarEvento,
  getEventos,
} from "../controllers/events.controller";
import { isDate } from "../helpers/isDate";
import { validarCampos } from "../middlewares/validar-campos";

import { validarJWT } from "../middlewares/validar-jwt";

const router = Router();

router.use(validarJWT);

router.get("/", getEventos);
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").notEmpty(),
    check("start", "Fecha inicio es obligatorio").custom(isDate),
    check("end", "Fecha de finalización es obligatorio").custom(isDate),
    validarCampos,
  ],
  crearEvento
);
router.put(
  "/:id",
  check("title", "El titulo es obligatorio").not().isEmpty(),
  check("start", "Fecha de inicio es obligatoria").custom(isDate),
  check("end", "Fecha de finalización es obligatoria").custom(isDate),
  validarCampos,
  actualizarEvento
);
router.delete("/:id", elimarEvento);

export default router;
