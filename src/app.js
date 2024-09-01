import express from "express";
import routerIndex from "./routes/routeIndex.js";
import {mongoDBConnect} from "./config/mongoDB.config.js";
import envs from "./config/envsConfig.js";
import session from "express-session";
import passport from "passport";
import { initializePassport } from "./config/passportConfig.js";
import cookieParser from "cookie-parser";
//import { seedFunction } from "./dao/mongoDB/models/seedProducts.js";


//Obtengo en app la variable que levanta el servidor.
const app = express();




//Conexión a la DB definida en la carpeta config.
mongoDBConnect();



//Definición del puerto.     La comentamos por comenzar a usar variables de entorno.
//let PORT =8080;


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); //No estaba instalado en la clase 4, pero ahora lo neceistaremos para usar cookies que guarden nuestro token de usuario. Cuando hago req.cookie, el servidor gracias a este paquete trae la cookie directamente, la reocnoce.
app.use(
  session({
    secret: envs.SECRET_CODE, // palabra secreta
    resave: true, // Mantiene la session activa, si esta en false la session se cierra en un cierto tiempo
    saveUninitialized: true, // Guarda la session
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());




//Manejo del enrutado para mayor simpleza de lectura en el código.
app.use("/api",routerIndex);

//seedFunction(); 
//Dejo comentado el agregado general de 18 productos que fue ejecutado por única vez.

//Configuración del puerto que usará el servidor y mensaje por consola.
const server = app.listen(envs.PORT,()=>{
    console.log(`Escuchando solicitudes vía el puerto ${envs.PORT} `);

});

