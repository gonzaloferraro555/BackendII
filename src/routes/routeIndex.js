import { Router } from "express";
import routeProducts from "./routeProducts.js";
import routeCarts from "./routeCarts.js";
import sessionRouter from "./session.routes.js";




const router = Router();


router.use("/products",routeProducts);

router.use("/carts",routeCarts);

router.use("/session",sessionRouter)


/*La idea de usar el index route es centralizar varias subrutas de 
una misma ruta raíz. */




export default router;