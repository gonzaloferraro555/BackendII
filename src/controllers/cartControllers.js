import {request,response} from "express";
import cartServices from "../services/cartServices.js";
import ticketServices from "../services/ticketServices.js";



/*Todos los archivos que usen request y response, necesitan de la importación de express, así mismo, debo darles a req y res lo valores
de estos objetos importados, para que sean reconocidos. Ordenando las capas sólo tendré que hacerlo en la capa de Controllers, y en los middlewares. */


 
const createCart = async (req=request,res=response)=>{
    try{
        const nuevo = await cartServices.createCart();
        if (!nuevo) return res.status(400).json({status:"Error",msg:"No se logró crear el carrito."})
        //Verifico la existencia del carrito por cualquier error inesperado que pudiese impedir su creación.
        res.status(200).json({status:"Success",msg:"El carrito fue creado con éxito."})
    }

    catch(e){
        res.status(500).json({status:"Error",msg:"Error inesperado del servidor."})
        console.log(e.message);
    }}



const getCartById = async (req=request,res=response)=>{
    try{
        const {cid} = req.params
        let cart = await cartServices.getCartById(cid)
        res.status(200).json({status:"Succes",payload:cart})
        console.log("Mostrando carrito")
    }
    catch(e){
        res.status(500).json({status:"Error",msg:"Error inesperado del servidor."})
        console.log(e)
    }}



    //Reemplazamos código por un middleware para que no haya verificaciones en la capa de controllers.
const addProductToCart = async (req=request,res=response)=>{
    try{
        let {cid,pid} = req.params
        const carritoVerificado = await cartServices.addProductToCart(cid,pid); //Ya lo devuelve actualizado.
        res.status(200).json({status:"Success",msg:"El carrito fue actualizado con éxito.",carritoVerificado})

    }
    catch(e){
        res.status(500).json({status:"Error",msg:"Error inesperado del servidor."})
        console.log(e.message);
    }}



const deleteProductOfCart = async (req=request,res=response)=>{
    try{
        let {cid,pid} = req.params;
        const cartUpdated = await cartServices.removeProductFromCart(cid,pid)//Explicado en cartServices.js.
        res.status(200).json({status:"Success",msg: cartUpdated})
    }
    catch(e){
        console.log(e.message);
        res.status(404).json({status:"Error",msg:"Error inesperado en el servidor."})
    }
}


const updateProductQuantity = async (req=request,res=response)=>{
    try{
        let {cid,pid} = req.params; //Tomo id de producto y de carrito.
        let {q} = req.body;     //Tomo el objeto q con el dato para reemplazar en quantity.

        const cartUpdated = await cartServices.updateProductFromCart(cid,pid,q) //Envío id de carrito, de producto, y campo de reemplazo para quantity.
        res.status(200).json({status:"Success",msg: cartUpdated})
    }
    catch(e){
        console.log(e.message);
        res.status(404).json({status:"Error",msg:"Error inesperado en el servidor."})
        }}

const deleteAllProductsFromCart = async (req=request,res=response)=>{
    try{
        const {cid} = req.params
        const updatedCart = await cartServices.emptyCart(cid) //Explicado en cartRepository.js.
        
        res.status(200).json({status:"Succes",payload:updatedCart})
        console.log("Mostrando carrito vacío.")
    }
    catch(e){
        res.status(500).json({status:"Error",msg:"Error inesperado del servidor."})
        console.log(e)}}


const getAllCarts = async (req=request,res=response)=>{
    try{
        const cart = await cartServices.getAllCarts();
        res.status(200).json({status:"Succes",payload:cart})
        console.log("Mostrando carritos")
        console.log(cart)
    }
    catch(e){
        res.status(500).json({status:"Error",msg:"Error inesperado del servidor."})
        console.log(e)
    }}


const purchaseCart = async (req=request,res=response)=>{
    try{
        const {cid} = req.params;
        const total = await cartServices.purchaseCart(cid);
        const ticket = await ticketServices.createTicket(req.user.email,total); 
        res.status(200).json({status:"Success",ticket});

    }
    catch(e){
        res.status(500).json({status:"Error",msg:"Error inesperado del servidor."})
        console.log(e)
    }}


    export default {
        getAllCarts,
        getCartById,
        addProductToCart,
        deleteAllProductsFromCart,
        updateProductQuantity,
        createCart,
        deleteProductOfCart,
        purchaseCart

    }