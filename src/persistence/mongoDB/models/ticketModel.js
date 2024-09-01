import mongoose from "mongoose";




const collectionticket = "Tickets";

const ticketSchema = new mongoose.Schema({
    code:{type:String,required:true,unique:true},
    purchaser:{type:String,required:true},
    purchase_dataTime:{type:Date,default:Date.now()},
    amount:{type:Number,required:true},
})

//ticketSchema.pre("find",function(){
//    this.populate("products.product")
//})


export const ticketModel = mongoose.model(collectionticket,ticketSchema);