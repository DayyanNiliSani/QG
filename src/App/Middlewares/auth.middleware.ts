import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as config from 'config'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let token = "";
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next();
    }

    try {
        const decoded: any = jwt.verify(token, config.get("jwt.password"));
        req.headers['X-user-id'] = decoded.id
        req.headers['X-user-isAdmin'] = decoded.isAdmin
        req.headers['X-user-username'] = decoded.username
    } catch (err) {
        throw new UnauthorizedException()
    }finally{
        return next();
    }
  }
}