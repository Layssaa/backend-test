import { DbSource } from "../database/data-source";
import { User } from "../entity/User";

export type OptionalUser = Partial<User>;

async function getUserById({ id }: { id: number }) {
  const userRepository = DbSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: id,
    active: true
  });

  return user;
}

async function getAllUsers() {
  const userRepository = DbSource.getRepository(User).find({
    where: {
      active: true,
    },
  });
  return userRepository;
}

async function editUser({ id, data }: { id: number; data: OptionalUser }) {
  const userRepository = DbSource.getRepository(User);

  let user = await userRepository.findOneBy({
    id: id,
  });

  const keys = Object.keys(data);

  keys.forEach((key) => {
    user[key] = data[key];
  });

  await userRepository.save(user);

  return user;
}

async function editPassword({
  id,
  password,
}: {
  id: number;
  password: string;
}) {
  return editUser({
    id: id,
    data: {
      password: password,
    },
  });
}

async function deactivateUser({ id }: { id: number }) {
  return editUser({
    id: id,
    data: {
      active: false,
    },
  });
}

async function deleteUser({ id }: { id: number }) {
  return editUser({
    id: id,
    data: {
      deletedAt: new Date(),
    },
  });
}

export {
  getUserById,
  getAllUsers,
  editUser,
  editPassword,
  deactivateUser,
  deleteUser,
};
