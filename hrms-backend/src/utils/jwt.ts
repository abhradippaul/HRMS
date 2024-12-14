import { sign, verify } from "jsonwebtoken";

export function createJWTToken(payload: { id: string }) {
  return sign(payload, "123");
}

export function verifyJWTToken(token: string) {
  return verify(token, "123");
}
