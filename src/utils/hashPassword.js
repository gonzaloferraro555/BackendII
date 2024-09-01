import bcrypt from "bcrypt";

// Hasheo de contraseña 
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

// Validar las contraseñas
export const isValidPassword = (userPassword, password) => {
  return bcrypt.compareSync(password, userPassword);
}

//El back nunca obtiene la password del usuario, JAMAS debe guardarle, MENOS EN LA DB, debemos respetar la confidencialidad. SI podrìa hacerlo al obtenerla del body, pero nunca se hace.