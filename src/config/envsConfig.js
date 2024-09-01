import dotenv from "dotenv";

const enviorment = "NADA"



dotenv.config({
  path: enviorment === "dev" ? "./.env.dev" : "./.env"
});

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SECRET_CODE: process.env.SECRET_CODE,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  JWT_SECRET_CODE:process.env.JWT_SECRET_CODE
};
