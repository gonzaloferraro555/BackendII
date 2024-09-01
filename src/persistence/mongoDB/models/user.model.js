import mongoose from "mongoose";


const userCollection = "user";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
    default: "user"
  },
  cart:{type:mongoose.Schema.Types.ObjectId, ref:"Carritos"} //Carrito asociado al user. Cuando cree el usuario, deberá ser en formato _id de mongo, y su valor será correspondido con un id del schema carts, para que podamos expandir los productos contenidos con el populate.
}); 

  
  userSchema.pre("findOne",function(){//Cuando se ejecute la petción de findOne porque está buscando un carrito correponsdiente a un usuario para mostrarlo en el momento en que me logueo y se va a mostrar al usuario logueado, se ejecutará la function() que aplica un populate o apertura sobre el eschema Carritos.
    this.populate("cart")
  })
  //Este "cart" es un string, pero debe detallar el componente que quiero abrir, en este caso, cada carrito, asique debe ser el campo cart.


export const userModel = mongoose.model(userCollection, userSchema);
