import {response,request} from "express"; 
import productServices from "../services/productServices.js";


//La diferencia con checkProd es que en checkProduct se valida la creación de un producto en cuanto a sus condiciones y parámetros y  
//en checkProd si existe en la DB. Valida sólo la existencia del producto.
export const checkProd = async (req = request,res = response,next)=>{
    let {pid} = req.params
    const product = await productServices.getProductById(pid);
    if (!product) return res.status(404).json({status:"Error",msg:"No se ha encontrado el producto."})//Verifico su existencia en la DB, no por stock, sino si está dado de alta.

    next();
}