/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_TOKEN } from 'src/config/config';

@Injectable()
export class verifyToken implements NestMiddleware{
    use(req: Request, res: Response, next: (error?: any) => void) {
        const token = req.headers.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).json({error:"token invalido"})
        }
        try{
            verify(token, String(SECRET_TOKEN))
            next()
        }catch{
            return res.status(401).json({error:"token invalido"})
        }
    }

}