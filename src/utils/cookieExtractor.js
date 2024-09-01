import {request,response} from "express";

//Funciòn que usa la estrategia de jwt o la de current en la verificación de passport.

export const cookieExtractor = (req=request) => {  
  let token = null;             //comienza en null, porque o lo tengo, o devuelvo null.
  if (req && req.cookies) { 
    token = req.cookies.token; //guardo en la variable token obteniendola desde la peticiòn.
  }

  return token; //devolverà null o el token extraìdo desde la cookie.
};

//La finalidad es la misma que en la forma sin passport, es devolver el token que està en la cookie del cliente, en este caso gracias al req.cookie.token, que obtengo gracias
//al cookie-parser. 
