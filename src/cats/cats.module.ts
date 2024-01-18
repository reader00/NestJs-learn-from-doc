import { Module } from '@nestjs/common';
import { CatsService } from './service/cats.service';

@Module({
  providers: [CatsService]
})
export class CatsModule { }
