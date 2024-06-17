import { Request, Response } from "express";
import {
  deactivateUserService,
  deleteUserService,
  editPasswordService,
  editUserService,
  getAllUsersServices,
  getUserByIdService,
} from "../services/user";
import { OptionalUser } from "../repositories/user";
import { authErrors } from "../constants";

interface IRequest extends Request {
  id: number;
}

async function getUserByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await getUserByIdService({ id });

    return res.send(user).status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
      code: 500,
    });
  }
}

async function getAllUsersController(req: Request, res: Response) {
  try {
    const users = await getAllUsersServices();

    return res.send(users).status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
      code: 500,
    });
  }
}

async function deleteUserController(req: IRequest, res: Response) {
  try {
    const { id } = req;
    const { id: deleteUserId } = req.params;

    await deleteUserService({
      deleteUserId: Number(deleteUserId),
      sessionId: id,
    });

    return res.send({ message: "Deleted" }).status(200);
  } catch (error) {
    console.log(error);

    if(error == authErrors.unauthorized){
      res.status(401).send(error)
    }

    return res.status(500).send({
      message: "Internal Error",
      code: 500,
    });
  }
}

async function deactivateUserController(req: IRequest, res: Response) {
  try {
    const { id: deactivateUserId } = req.params;

    await deactivateUserService({
      deactivateUserId: Number(deactivateUserId),
    });

    return res.send({ message: "Deactivated." }).status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
      code: 500,
    });
  }
}

async function editPasswordController(req: IRequest, res: Response) {
  try {
    const { id } = req;
    const { newPassword, oldPassword } = req.body;

    await editPasswordService({
      id,
      newPassword: newPassword,
      oldPassword: oldPassword,
    });

    return res.send({ message: "Password changed." }).status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
      code: 500,
    });
  }
}

async function editUserController(req: IRequest, res: Response) {
  try {
    const { id } = req;
    const data = req.body as OptionalUser;

    await editUserService({
      id,
      data: data,
    });

    return res.send({ message: "User edited." }).status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Internal Error",
      code: 500,
    });
  }
}

export {
  getUserByIdController,
  getAllUsersController,
  deleteUserController,
  deactivateUserController,
  editPasswordController,
  editUserController,
};
