import jwt from "jsonwebtoken";
import { JWT_KEY } from "../configs/env";
import  { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
      return response.error({  msg: "You are not authenticated!"}, StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
  }
  jwt.verify(token, JWT_KEY, async (err, payload) => {
    if (err) return response.error({  msg: "Token is not valid!"}, StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN);
    req.userId = payload?.userId;
    next();
  });
};
