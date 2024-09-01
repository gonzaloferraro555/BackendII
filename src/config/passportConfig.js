import {request,response} from "express";
import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt"; 
import userRepository from "../persistence/mongoDB/userRepository.js";
import cartRepository from "../persistence/mongoDB/cartRepository.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { verifyToken } from "../utils/jwt.js";
import envs from "./envsConfig.js";
import { cookieExtractor } from "../utils/cookieExtractor.js"; 
import passportCustom from "passport-custom"; 


const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy; 
const ExtractJWT = jwt.ExtractJwt;

const CustomStrategy = passportCustom.Strategy;



export const initializePassport = () => {
  passport.use(
    "register", 
    new LocalStrategy({ passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => { 

      try {
        const { first_name, last_name, age } = req.body;
        const user = await userRepository.getByEmail(username);
        if (user) return done(null, false, { message: "User already exists" });


        //Creamos el carrito del usuario. No puedo asignar directamente la creaciòn al crear el usuario porque es una operaciòn asicrònica, la DB me crea un carrito.
        const cart = await cartRepository.create();

        const newUser = {
          first_name,
          last_name,
          password: createHash(password), 
          email: username,
          age,
          cart: cart._id //Lo que quiero tener es sòlo el id del carrito generado por Mongo DB.
        };

        const userCreate = await userRepository.create(newUser);

    

        return done(null, userCreate);
      } catch (error) {
        return done(error);
      }
    }) 
  );    



  //No necesito del front la informaciòn username y password, usando el req, a diferencia de register, porque ya uso la informaciòn de user. Lo hace passport.
  passport.use(
    "login",
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => { //El body viene con un email y contraseña. El primer dato del body debe ser "email", y el segundo se supone que el campo password porque va a ser validado luego.

      try {
        const user = await userRepository.getByEmail(username);
        if (!user || !isValidPassword(user.password, password)) return done(null, false); 

        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );








  passport.use(
    "jwt",
    new JWTStrategy( 
      {jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), secretOrKey: envs.JWT_SECRET_CODE}, //cookieExtractor devuelve el token codificado.
      async (jwt_payload, done) => { //payload es un objeto que contiene al usuario ya parseado. Verifica el token?, porque en current aplicamos verifyToken, aquí sólo lo extrajimos. Por esta razón use "current" como estrategia de validación.
          try {
            
            return done(null, jwt_payload); //Si no hay error devuelvo la informaciòn del usuario en un payload, equivale al user y no se como interactùa con el rew.user del passportCall(strategy)
            
          } catch (error) {
            return done(error); 
          }
      }
    )
  )



  passport.use(
    "current",
    new CustomStrategy(
      async (req=request, done) => {
        try {

          const token = cookieExtractor(req);//El objeto req tiene el campo cookie, donde guarde el token en el momento del login. Tiene este campo porque instaamos cookie-parser.
          if(!token) return done(null, false);
          const tokenVerify = verifyToken(token);
          if(!tokenVerify) return done(null, false);
          const user = await userRepository.getByEmail(tokenVerify.email)
          done(null, user);
          
        } catch (error) {
          done(error)
        }
      }
    )
  )




  passport.serializeUser((user, done) => {
    done(null, user._id);
    });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userRepository.getById(id);
      done(null, user);
        } 
    catch (error) {
      done(error);
        }
    });


  };
