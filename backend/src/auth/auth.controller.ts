/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PrismaClient } from '@prisma/client';
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Res } from '@nestjs/common';
import jwt from "jsonwebtoken"
import { Response } from 'express';
import { SECRET_TOKEN } from 'src/config/config';

@Controller('auth')
export class AuthController {
    private readonly _prisma: PrismaClient
    public constructor(public prisma:PrismaClient){
        this._prisma = prisma
    }

    @Post('/login')
    async Login(@Body() body:any, @Res() res: Response):Promise<any>{
        
        const {email, password} = body
        

        const user = await this._prisma.user.findUnique({where:{email}})
    
        if(!user){
            return res.status(401).json({erro: "email ou senha"})
        }


        const userPassword = user?.password === password


        if(!userPassword){
            return res.status(401).json({erro: "email ou senha"})
        }
        try{
            const token = jwt.sign({ id: user?.id, name: user?.nome }, String(SECRET_TOKEN), {expiresIn:"3h"})
            
            return res.status(201).json({token:token})
        }catch(err){
            console.log(err)
            return res.status(401).json({erro: "tokens"})
        }
    }
}
