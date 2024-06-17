import bcrypt from "bcrypt";

async function encryptData(_token: string, _email: string) {
  const saltRounds = 10;
  const token = _token + _email;
  const { hash, salt } = await madeHashPassword(token, saltRounds);
  return { hash, salt };
}

async function madeHashPassword(_token: string, _saltRounds: number) {
  const salt = await bcrypt.genSalt(_saltRounds);
  const hash = await bcrypt.hash(_token, salt);
  return { hash, salt };
}

async function authenticateUser(_token: string, _email: string, _hash: string) {
  const passwordVerify = _token + _email;
  return await bcrypt.compare(passwordVerify, _hash);
}

export { encryptData, authenticateUser };
