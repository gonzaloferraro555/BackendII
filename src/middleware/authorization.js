import { request, response } from "express";



//Autoriza a los usuarios a realizar determinadas acciones en función del campo "role", que puede tomar valor "user" por default, o crearse por DB con valor "admin".
export const authorization = (role) => {
  return async (req = request, res = response, next) => {
    if (!req.user) return res.status(401).json({ status: "error", msg: "Unauthorized" });
    if (req.user.role != role) return res.status(403).json({ status: "error", msg: "No permission" });
    
    next();
  };
};
