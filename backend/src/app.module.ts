import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { TodoModule } from './api/todo/todo.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }