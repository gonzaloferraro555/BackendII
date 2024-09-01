import mongoose from "mongoose";




const collectionCart = "Carritos";

const cartSchema = new mongoose.Schema({
     products:{
        type:[{product:{type:mongoose.Schema.Types.ObjectId, ref:"Productos"},quantity: Number}],
        default:[] //Debe existir el default, para cuando creo un usuario, se creará este carrito vacío por defecto. En el proyecto final no estaba esta línea.
    }})

cartSchema.pre("find",function(){
    this.populate("products.product")
})


export const cartModel = mongoose.model(collectionCart,cartSchema);
    

