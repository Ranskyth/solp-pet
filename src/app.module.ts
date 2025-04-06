import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaClient],
})
export class AppModule {}
