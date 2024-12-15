import { sign, verify } from "jsonwebtoken";

export function createJWTToken(payload: { id: string }) {
  return sign(payload, process.env.JWT_SECRET!);
}

export function verifyJWTToken(token: string) {
  return verify(token, process.env.JWT_SECRET!);
}
