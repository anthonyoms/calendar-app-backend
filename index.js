import "dotenv/config";
import express from "express";
import { dbConnection } from "./database/config";
import routerAuth from "./routes/auth.routes";

//Crear el servidor de express

const app = express();

//Base de datos para

dbConnection();

//Directorio Publico

app.use(express.static("public"));
//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", routerAuth);
//TODO: crud :Eventos

//Escuchar peticiones

app.listen(process.env.PORT, () => {
  console.log("Servidor en puerto", process.env.PORT);
});
