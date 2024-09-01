import jwt from "jsonwebtoken";
import envs from "../config/envsConfig.js";



//La creaciòn del token implica poca informaciòn, SI NECESITO MÀS INFORMACIÒN DEL USUARIO, la saco de la desencriptaciòn del token, y con el email o el _id dentro de Mongo busco màs informaciòn que necesite.
export const createToken = (user) => {
  const { _id, email, role, cart } = user;
  const token = jwt.sign({ _id, email, role, cart}, envs.JWT_SECRET_CODE, { expiresIn: "20m" });//El token cambia con cada logueo de usuario. Si la cambiamos desde la cookie, nos darà error, y a los 2 minutos ya no serà valida. 

  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, envs.JWT_SECRET_CODE);
    return decoded; //La desenctriptaciòn, muestra exactamente el objeto { _id, email, role, cart} que fue encriptado, asique puedo acceder a esos campos, para llegar a màs informaciòn dentro de la DB.
                    // El còdigo secreto OBVIAMENTE nunca forma parte, es sòlo para verificar los token. Es por esto que se usan variable de entorno, no pueden estar en el còdigo principal.
  } catch (error) {
    return null;
  }
};
