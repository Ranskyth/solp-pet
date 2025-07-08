import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaClient } from '@prisma/client';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { verifyToken } from './middleware/verifyToken';

@Module({
  imports: [AuthModule],
  controllers: [AppController, AuthController],
  providers: [PrismaClient, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(verifyToken).forRoutes('api/v1');
  }
}
