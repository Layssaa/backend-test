import { NextFunction, Request, Response } from "express";
import { authenticJWT } from "../utils/authJwt";
import { responseMessages, responseStatus } from "../constants";

export async function tokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.header("authorization");

    const authResponse = await authenticJWT(authorization);

    if (authResponse.auth) {
      req.id = authResponse.id;
      next();
    }
  } catch (error) {

    console.log(error);
    return res.status(401).send({
      auth: false,
      status: responseStatus.forbidden,
      error: responseMessages.not_token_provide,
    });
  }
}

export async function refreshTokenValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const refresToken = req.header("refresToken");

    const authResponse = await authenticJWT(refresToken);

    if (authResponse.auth) {
      req.id = authResponse.id;
      next();
    }

  } catch (error) {

    console.log(error);
    return res.status(401).send({
      auth: false,
      status: responseStatus.forbidden,
      error: responseMessages.not_token_provide,
    });
  }
}
