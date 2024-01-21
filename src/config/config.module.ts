import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { CONFIG_OPTIONS } from '../common/constants';

@Module({})
export class ConfigModule {

    static register(options: Record<string, any>): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options
                },
                ConfigService
            ],
            exports: [ConfigService]
        }
    }

}
