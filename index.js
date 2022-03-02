import express from "express";
import "dotenv/config";
import cors from "cors";
import { dbConnection } from "./database/config";
import routerAuth from "./routes/auth.routes";
import routerEvents from "./routes/events.routes";

//Crear el servidor de express

const app = express();

//Base de datos para

dbConnection();

//CORS
app.use(cors());

//Directorio Publico

app.use(express.static("public"));
//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", routerAuth);
app.use("/api/events", routerEvents);
//TODO: crud :Eventos

//Escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log("Servidor en puerto", process.env.PORT);
});
