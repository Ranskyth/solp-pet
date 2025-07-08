/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Response } from 'express';
@Controller('api/v1')
export class AppController {
  constructor(public prisma: PrismaClient) { }

  @Post('/dono')
  async createDono(@Body() body: any, @Res() res: Response): Promise<any> {
    try {
      const { nome, animal, telefone } = body;

      console.log(nome, telefone, animal)


      const db = await this.prisma.dono.create({
        data: { nome, telefone, animal },
      });

      return { mensagem: `Dono criado com sucesso com o id : ${db.id}` };
    } catch (error) {
      res.status(400)
      return {
        mensagem: "error ao fazer o cadastro",
        error: error
      }
    }
  }
  @Get('/pet/dono/:id')
  GetAll(@Param() param: any) {
    const { id } = param
    const db = this.prisma.dono.findUnique({ where: { id }, select: { animal: true, id: true, nome: true, telefone: true } })

    return db
  }
  @Get()
  Main() {
    return {
      mensagem: 'Bem-Vindo!',
    };
  }

  @Delete('/dono/:id')
  async DeleteDono(@Param() params: any) {
    const { id } = params;

    const Data = await this.prisma.dono.delete({ where: { id } });

    return {
      mensagem: `Deletado o Dono com ID : ${Data.id}`,
    };
  }


  @Get('/pet/dono')
  async getAnimal(@Query() query: any) {
    try {
      let { pages, nome, tipo } = query as { pages: number, nome: string, tipo:"Gato"|"Cachorro"|""}

      const limit = 16
      
      const animaisOnDonos = await this.prisma.animal.findMany({ orderBy: { nome: "asc" }, where: { nome: { contains: nome, mode:"insensitive" },...(tipo !== "" && { tipo })}, skip: pages == 1 ? 0 : pages * 16 - 16, take: limit, select: { nome: true, tipo: true, raca: true, nascimento: true, dono: { select: { id: true, nome: true, telefone: true } } } });
      
      const qtPages = (await this.prisma.animal.findMany({where:{...(tipo !== "" && { tipo })}})).length
      
      
      return { "cadastros": animaisOnDonos, "pages": Math.ceil(qtPages / limit) }

    } catch (error) {
      return { error }
    }
  }

  @Put('/dono/:id')
  async UptadeDono(@Param() param: any, @Body() body: any) {
    const { id } = param;
    const { animal, nome, telefone } = body;
    const db = await this.prisma.dono.update({
      where: { id },
      data: { animal, nome, telefone },
    });

    return {
      mensagem: `dono com id : ${db.id} atualizado com sucesso`,
    };
  }
}
