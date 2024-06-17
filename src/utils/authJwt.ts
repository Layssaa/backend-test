import jwt from "jsonwebtoken";
import {
  authExpiresTimes,
} from "../constants/index";
import { SECRET } from "../config";

function createToken({
  authExpiresTimes,
  id,
}: {
  id: number;
  authExpiresTimes: number;
}) {
  const token = jwt.sign({ id, data: new Date() }, SECRET, {
    expiresIn: authExpiresTimes,
  });

  return { token };
}

function createTokenAuth(_token: { id: number }) {
  const token = createToken({
    id: _token.id,
    authExpiresTimes: authExpiresTimes.jwt_tokens_auth,
  });

  return { token };
}

function createTokenRenew(_token: { id: number }) {
  const token = jwt.sign({ _token, data: new Date() }, SECRET, {
    expiresIn: authExpiresTimes.jwt_tokens_renew,
  });

  return { token };
}

async function authenticJWT(
  _token: string
): Promise<{ auth: boolean; id: number }> {
  const decoded = (await verifyJWT(_token)) as { id: number };

  return {
    auth: true,
    ...decoded,
  };
}

async function verifyJWT(_token: string) {
  return jwt.verify(_token, SECRET);
}

export { createTokenAuth, createTokenRenew, authenticJWT };
