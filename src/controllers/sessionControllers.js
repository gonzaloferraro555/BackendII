import {request,response} from "express";
import { createToken } from "../utils/jwt.js";
import dto from "../dto/dto.js";


/*Todos los archivos que usen request y response, necesitan de la importación de express, así mismo, debo darles a req y res lo valores
de estos objetos importados, para que sean reconocidos. Ordenando las capas sólo tendré que hacerlo en la capa de Controllers, y en los
middlewares. */


/*El registro del usuario debería incluir la creación de un carrito asociado a ese usuario, que quedará asociado a él por toda la vida del usuario en la DB. */
const registerUser = async (req=request,res=response) => {
    try {
      res.status(201).json({ status: "ok", msg: "User created" }); 
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }


const userLogin = async (req=request,res=response) => {
    try {
      const token = createToken(req.user);
  
      res.cookie("token", token, { httpOnly: true });
  
  
      return res.status(200).json({ status: "ok", payload:req.user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "error", msg: "Internal server error" });
    }
  }



/*Le agregamos un middleware de passport para validar el token que venga guardado como en las otras peticiones, si es que viene en la cookie del navegador.
Modifique la estrategia por una custom. También filtra la información de devolución con un dto, escondiendo información sensible.*/
const checkCurrent = async (req=request,res=response) => {
    const filteredUser = dto.dtoUser(req.user);

    res.status(200).json({ status: "ok", user: filteredUser}); //Si no hice un login, cuando intente en /current, me dara no autorizado, porque el middleware detecta que no soy un usuario logueado, si me logueo me mostrarà con el req.user, la informaciòn del usuario.
  }


  export default {
    registerUser,
    userLogin,
    checkCurrent
  }
