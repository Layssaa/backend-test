import { authErrors, responseMessages } from "../constants/index";
import { User } from "../entity/User";
import { createUser, getUserByCPF, getUserByEmail } from "../repositories/auth";
import { getUserById } from "../repositories/user";
import { createTokenAuth, createTokenRenew } from "../utils/authJwt";
import { authenticateUser, encryptData } from "../utils/hash";

async function loginService(userData: { email: string; password: string }) {
  const userfounded = await getUserByEmail(userData.email);

  if (userfounded) {
    const authUser = await authenticateUser(
      userData.password,
      userData.email,
      userfounded.password
    );

    if (authUser) {
      const { token: tokenAuth } = createTokenAuth({
        id: userfounded.id,
      });

      const { token: tokenRenew } = createTokenRenew({
        id: userfounded.id,
      });

      return {
        tokenAuth,
        tokenRenew,
        id: userfounded.id,
      };
    } else {
      throw authErrors.incorrect_data;
    }
  } else {
    throw authErrors.user_not_found;
  }
}

async function createUserService(userData: User) {
  const { hash } = await encryptData(userData.password, userData.email);

  const alreadyExistThisEmail = await getUserByEmail(userData.email);
  const alreadyExistThisCPF = await getUserByCPF(userData.cpf);


  if (alreadyExistThisEmail) {
    throw authErrors.email_already_being_used;
  }

  if(alreadyExistThisCPF){
    throw authErrors.invalid_CPF
  }

  const userCreated = await createUser({
    ...userData,
    password: hash,
  });

  if (!userCreated) {
    throw responseMessages.internal_server_error;
  }

  const { token: tokenAuth } = createTokenAuth({
    id: userCreated.id,
  });

  const { token: tokenRenew } = createTokenRenew({
    id: userCreated.id,
  });
  return {
    tokenAuth,
    tokenRenew,
    id: userCreated.id,
  };
}

async function refreshTokenService(id: number) {
  const { token } = createTokenAuth({
    id: id,
  });

  return { tokenAuth: token };
}

async function checkActiveUserService(id: number) {
  const user = await getUserById({ id: id });

  if (!user) {
    throw authErrors.unauthorized;
  }

  return;
}

export {
  loginService,
  createUserService,
  refreshTokenService,
  checkActiveUserService,
};
