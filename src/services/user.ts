import { authErrors } from "../constants";
import {
  OptionalUser,
  deactivateUser,
  deleteUser,
  editPassword,
  editUser,
  getAllUsers,
  getUserById,
} from "../repositories/user";
import { authenticateUser, encryptData } from "../utils/hash";

async function getUserByIdService({ id }) {
  const user = await getUserById(id);

  if (!user) {
    throw "user_not_found";
  }

  delete user.password;

  return user;
}

async function getAllUsersServices() {
  const users = await getAllUsers();

  return { data: users };
}

async function deleteUserService({
  sessionId,
  deleteUserId,
}: {
  sessionId: number;
  deleteUserId: number;
}) {
  if (sessionId != deleteUserId) {
    throw authErrors.unauthorized;
  }

  await deleteUser({ id: deleteUserId });

  return;
}

async function deactivateUserService({
  deactivateUserId,
}: {
  deactivateUserId: number;
}) {
  return deactivateUser({ id: deactivateUserId });
}

async function editPasswordService({
  newPassword,
  oldPassword,
  id,
}: {
  newPassword: string;
  oldPassword: string;
  id: number;
}) {
  const user = await getUserById({ id });

  const authUser = await authenticateUser(
    oldPassword,
    user.email,
    user.password
  );

  if (!authUser) {
    throw authErrors.unauthorized;
  }

  const { hash } = await encryptData(newPassword, user.email);

  await editPassword({
    id,
    password: hash,
  });

  return;
}

async function editUserService({
  id,
  data,
}: {
  id: number;
  data: OptionalUser;
}) {
  await editUser({
    id,
    data,
  });

  return;
}

export {
  getUserByIdService,
  getAllUsersServices,
  deleteUserService,
  deactivateUserService,
  editPasswordService,
  editUserService
};
