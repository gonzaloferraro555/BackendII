import {response,request} from "express"; 
import cartServices from "../services/cartServices.js";
import productServices from "../services/productServices.js";


//Valida tanto la existencia del carrito como del producto.
export const checkProductAndCart = async (req = request,res = response,next)=>{
    let {cid,pid} = req.params
    const product = await productServices.getProductById(pid);
    if (!product) return res.status(404).json({status:"Error",msg:"No se ha encontrado el producto."})//Verifico su existencia en la DB, no por stock, sino si está dado de alta.
    
    const cart = await cartServices.getCartById(cid);
    if (!cart) return res.status(400).json({status:"Error",msg:"No se encontró el carrito."})//Verifico la existencia del carrito.
    next();
}