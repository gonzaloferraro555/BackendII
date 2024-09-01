import { Router } from "express";
import { isUserCart } from "../middleware/isUserCart.js";
import cartControllers from "../controllers/cartControllers.js";
import { checkProductAndCart } from "../middleware/checkProductAndCart.js";
import { checkCart } from "../middleware/checkCart.js";
import { authorization } from "../middleware/authorization.js";
import { passportCall } from "../middleware/passport.middleware.js";


const router = Router();


/*Los passportCall() van siempre primero, porque canalizan la estrategia de passport desde  config para validar el token del usuario actual
dependiendo de cada acción/ruta accedida, y al hacerlo guardan en el objeto req.user, los datos del usuario actual. Así, los siguientes middleware
pueden usar la información del usuario a partir del req.user, por ejemplo authorization("user"). */



//Creación de nuevo carrito.Petición en postman: CrearCarrito. Se supone que se ejecuta con el registro del usuario.
router.post("/", cartControllers.createCart)



/*Agrego un producto la carrito. Para ello, debo encontrar el carrito por parámetro y
el producto que también viene por parámetro. Petición en postman: AgregoProductoACarrito  */
router.post("/:cid/product/:pid",passportCall("current"),checkProductAndCart,authorization("user"),isUserCart,cartControllers.addProductToCart) //Agrego middleware para aliviar el controller, validando carrito y producto.



//Elimino un producto del carrito. Es similar al agregado. Petición en postman: removerProductoDelCarrito.
router.delete("/:cid/products/:pid",passportCall("current"),checkProductAndCart,authorization("user"),isUserCart, cartControllers.deleteProductOfCart) //Agrego middleware para aliviar el controller, validando carrito y producto.



//Muestro todos los carritos creados a este momento. Petición en postman: MostrarCarritos
router.get("/", passportCall("current"), authorization("admin"),cartControllers.getAllCarts)


/*Obtengo un carrito por id. Cuando lo busco por id el método getById utiliza el método populate,
lo que me permite "abrir" el grado de detalle de cada id de producto mostrando todos sus campos.
Petición en postman: MostrarCarrito */
router.get("/:cid",passportCall("current"), checkCart, authorization("user"),cartControllers.getCartById)


/*Acutalizo el stock de un producto.Recibo la cantidad por el body desde el front,
 url params para identificar carrito y producto, desde allí enviamos quantity
al método de actualización. Petición postman: ModificarQuantity.*/
router.put("/:cid/products/:pid",passportCall("current"), checkProductAndCart,authorization("user"),isUserCart, cartControllers.updateProductQuantity) //Agrego middleware para aliviar el controller, validando carrito y producto.



//Vaciamos el carrito.Peiticón de postman: VaciarCarrito.
router.delete("/:cid",passportCall("current"), checkCart, authorization("user"),isUserCart,cartControllers.deleteAllProductsFromCart)


/*Ruta solicitada para */
router.get("/:cid/purchase",passportCall("current"),checkCart,authorization("user"),isUserCart,cartControllers.purchaseCart)




export default router;

/*Organizamos nuestra capa de rutas, al igual que gestionamos las rutas con el routeIndex.js, para organizar el código,
y que sea más fácil rastrear problemas, ya que si ocurre en este archivo, sabré que viene de la capa de controllers o de negocio de cart,
si ocurre con la persistencia, estará en los archivos de repository. De cualquier manera, podemos agregar aqui los middlewares que hagan falta
a nivel ruta.*/