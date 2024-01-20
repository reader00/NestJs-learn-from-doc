import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsService } from './service/cats.service';
import { CatsController } from './http/cats.controller';
import { CatRepository } from './domain';
import { LoggerMiddleware } from '../Middlewares';

@Module({
  providers: [
    {
      provide: CatRepository,
      useClass: CatsService
    }
  ],
  controllers: [CatsController]
})
export class CatsModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats')
  }

}
