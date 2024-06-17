import { NextFunction, Request, Response } from "express";
import { createUserValidation } from "../validators/user";
import { authErrors } from "../constants";
import { checkActiveUserService } from "../services/auth";

export async function createUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    
    await createUserValidation.validate({
      body: req.body,
    });

    return next();
  } catch (error) {
    console.log(error);
    
    return res.status(400).send({
      message: error.errors,
      code: 403,
    });
  }
}

export async function userOwnerMiddleware(
  req: Request & { id: number },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req;
    const { id: editId } = req.body;

    if (editId != id) {
      throw authErrors.unauthorized;
    }

    return next();
  } catch (err) {
    return res.status(400).send(authErrors.unauthorized);
  }
}

export async function activeUserCheckMiddleware(
  req: Request & { id: number },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req;

    console.log(id);
    

    await checkActiveUserService(id);

    return next();
  } catch (err) {
    return res.status(400).send(authErrors.unauthorized);
  }
}
