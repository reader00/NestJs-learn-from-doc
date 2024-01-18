import { Module } from '@nestjs/common';
import { CatsService } from './service/cats.service';
import { CatsController } from './http/cats.controller';

@Module({
  providers: [CatsService],
  controllers: [CatsController]
})
export class CatsModule { }
