import { DbSource } from "../database/data-source";
import { User } from "../entity/User";

async function getUserByEmail(email: string) {
  const userRepository = DbSource.getRepository(User);

  const user = await userRepository.findOneBy({
      email: email,
      active: true
  });

  return user;
}

async function getUserByCPF(cpf: string) {
  const userRepository = DbSource.getRepository(User);

  const user = await userRepository.findOneBy({
      cpf,
      active: true
  });

  return user;
}

async function createUser(userData: User) {
  const user = new User();

  user.active = true;
  user.cpf = userData.cpf;
  user.email = userData.email;
  user.name = userData.name;
  user.password = userData.password;

  await DbSource.manager.save(user);

  return await DbSource.manager.find(User);
}

export { getUserByEmail, createUser, getUserByCPF };
