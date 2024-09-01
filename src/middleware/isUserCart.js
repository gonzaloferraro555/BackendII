import {request,response} from "express";




//Valida la correspondencia entre el carrito del usuario actual, y que ingresa por parámetro.
export const isUserCart = async (req=request,res=response,next)=>{
    const {cid} = req.params;
    if (cid!==req.user.cart._id.toString()) return res.status(401).json({status:"Error",msg:"Wrong Cart User."})
    next();                                                                                             
                                                                                                     
}

