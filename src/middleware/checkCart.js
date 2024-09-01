import {response,request} from "express"; 
import cartServices from "../services/cartServices.js";


//Valida sólo la existencia del carrito.
export const checkCart = async (req = request,res = response,next)=>{
    let {cid} = req.params

    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(400).json({status:"Error",msg:"No se encontró el carrito."})//Verifico la existencia del carrito.
    next();
}