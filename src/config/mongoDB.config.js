import mongoose from "mongoose";
import envs from "./envsConfig.js";

/*Conexion con la DB de mongo, implica o acceder a una DB existente, o a 
crearla en su defecto. Requiero de mis credenciales de la página de MongoDb.*/
export const mongoDBConnect = async ()=>{
    try {
        mongoose.connect(envs.MONGO_URL);
        console.log("Conectado a MongoDB.")
    }
    catch(e){
        console.log(`${e.message}`);        
    }
}