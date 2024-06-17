import { Request, Response } from "express";
import { authErrors, responseMessages } from "../constants/index";
import {
  createUserService,
  loginService,
  refreshTokenService,
} from "../services/auth";

export async function loginController(req: Request, res: Response) {
  try {
    const userAccess = await loginService(req.body);

    return res.send(userAccess).status(200);
  } catch (error) {
    console.log(error);
    if (error == authErrors.incorrect_data) {
      return res.status(401).send(error);
    }

    if (error == authErrors.user_not_found) {
      return res.status(401).send(error);
    }

    return res.status(500).send({
      message: "Something went wrong.",
      code: 500,
    });
  }
}

export async function createUserController(req: Request, res: Response) {
  try {
    const userData = req.body;

    const user = await createUserService(userData);

    return res.send(user).status(200);
  } catch (error) {
    console.log(error);

    if (
      error == authErrors.user_already_exits ||
      error == authErrors.email_already_being_used ||
      error == authErrors.invalid_CPF
    ) {
      return res.status(401).send(error);
    }

    return res.status(500).send(responseMessages.internal_server_error);
  }
}

export async function refreshTokenController(req: Request, res: Response) {
  try {
    const id = req as unknown as number;
    const token = await refreshTokenService(id);

    res.send(token);
  } catch (error) {
    console.log(error);
    return res.status(500).send(responseMessages.internal_server_error);
  }
}
