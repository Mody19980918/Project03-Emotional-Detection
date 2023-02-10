import { Request } from 'express';
import { Bearer } from 'permit';
import * as jwt from 'jwt-simple';
import { env } from 'src/env';
import { UnauthorizedException } from '@nestjs/common';

let bearer = new Bearer({ query: 'access_token' });

export interface JWTPayload {
  id: number;
  admin: boolean;
}

export function decodeBearerToken(headers: Request['headers']) {
  try {
    console.log('decodeBearerToken:', headers);
    let req = {} as Request;
    req.headers = headers;
    let token = bearer.check(req);
    let payload: JWTPayload = jwt.decode(token, env.JWT_SECRET);
    return payload;
  } catch (error) {
    throw new UnauthorizedException(String(error));
  }
}

export function encodeJWT(payload: JWTPayload) {
  return jwt.encode(payload, env.JWT_SECRET);
}
