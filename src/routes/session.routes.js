import { Router } from "express";
import { passportCall } from "../middleware/passport.middleware.js";
import sessionControllers from "../controllers/sessionControllers.js";


const router = Router();

router.post("/register", passportCall("register"),sessionControllers.registerUser); 


router.post("/login", passportCall("login"),sessionControllers.userLogin);


router.get("/current", passportCall("current"),sessionControllers.checkCurrent);

export default router;


/*Organizamos nuestra capa de rutas, al igual que gestionamos las rutas con el routeIndex.js, para organizar el código,
y que sea más fácil rastrear problemas, ya que si ocurre en este archivo, sabré que viene de la capa de controllers o de negocio de cart,
si ocurre con la persistencia, estará en los archivos de repository. De cualquier manera, podemos agregar aqui los middlewares que hagan falta
a nivel ruta.*/