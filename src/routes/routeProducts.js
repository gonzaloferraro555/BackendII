import {Router} from "express";
import { checkProduct } from "../middleware/checkProduct.js";
import { checkProd } from "../middleware/CheckProd.js";

import { passportCall } from "../middleware/passport.middleware.js";
import { authorization } from "../middleware/authorization.js";
import productControllers from "../controllers/productControllers.js";

/*Los passportCall() van siempre primero, porque canalizan la estrategia de passport desde  config para validar el token del usuario actual
dependiendo de cada acción/ruta accedida, y al hacerlo guardan en el objeto req.user, los datos del usuario actual. Así, los siguientes middleware
pueden usar la información del usuario a partir del req.user, por ejemplo authorization("user"). */



const router = Router()


//Deje a modo de ejemplo el passporCall de "jwt" aquí, pero usé siempre current, porque la estrategia de "jwt" no verifica la validez del token con tokenVerify.
router.get("/", passportCall("jwt"),authorization("user"),productControllers.getAllProducts);




router.get("/:pid",checkProd,productControllers.getProductById); //Aquí no uso el passportCall por ejemplo, pq mostrar un producto no requiere de req.user en ningun momento, evitando el error de undefined,
                                                                // de todas formas debería validarse el usuario ante cada acción, si le agrego authorization, me da error porque necesito req.user con contenido.



router.post("/",passportCall("current"),checkProduct,authorization("admin"),productControllers.createProduct); //CheckProduct valida la creación/alta de nuevos productos a la DB.



router.put("/:pid",passportCall("current"),checkProd,authorization("admin"),productControllers.updateProduct);



router.delete("/:pid",passportCall("current"),checkProd,authorization("admin"),productControllers.deleteProduct);



export default router;

/*Organizamos nuestra capa de rutas, al igual que gestionamos las rutas con el routeIndex.js, para organizar el código,
y que sea más fácil rastrear problemas, ya que si ocurre en este archivo, sabré que viene de la capa de controllers o de negocio de cart,
si ocurre con la persistencia, estará en los archivos de repository. De cualquier manera, podemos agregar aqui los middlewares que hagan falta
a nivel ruta.*/