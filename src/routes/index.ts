import { Router } from "express";

import {
  deactivateUserController,
  deleteUserController,
  editUserController,
  getAllUsersController,
  getUserByIdController,
} from "../controllers/user";
import {
  createUserController,
  loginController,
  refreshTokenController,
} from "../controllers/auth";
import { tokenValidation } from "../middleware/userSessionValidation";
import {
  activeUserCheckMiddleware,
  createUserMiddleware,
  userOwnerMiddleware,
} from "../middleware/user";

const routers = Router();

const routersProtected = Router();

routersProtected.use(tokenValidation, activeUserCheckMiddleware);

// --------- auth -------------
routers.post("/login", loginController);

routers.post("/register", createUserMiddleware, createUserController);

// --------- token -------------
routers.post("/auth/refreshToken", refreshTokenController);

routersProtected.post("/auth");

// --------- user -------------
routersProtected.get("/user/:id", getUserByIdController);

routersProtected.get("/users", getAllUsersController);

routersProtected.put("/user", userOwnerMiddleware, editUserController);

routersProtected.put("/deactive/:id", deactivateUserController);

routersProtected.delete("/user/:id", deleteUserController);

export { routersProtected, routers };
