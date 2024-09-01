import { request, response } from "express";
import passport from "passport";

export const passportCall = (strategy) => {
  return async (req = request, res = response, next) => {                                                    
      passport.authenticate(strategy, (err, user, info) => { 
                                                            
      if (err) return next(err);  //Si el error no es null, por ejemplo en la estrategia register.                           
      if (!user) return res.status(401).json({ status: "error", msg: info.message ? info.message : info.toString() }); //Si hay error porque el usuario està en false porque ya existe, devuelvo al cliente desde aquì, usando el campo mensaje. 
                                                                                                                
      req.user = user; 
      //Si no hay error, y user fue registrado correctamente, es decir que viene con el done, lo guardo en el req.user, y doy el okey al cliente de que puede continuar.
      //Esta línea obliga a que cada vez que uso authorization.js en un endpoint, previamente deba ejecutar un passportCall("NombreDeLaEstrategia"), de lo contrario req.user no tendrá contenido.
      
      next();
    })(req, res, next); 
  };
};

