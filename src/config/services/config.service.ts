import { Inject, Injectable } from '@nestjs/common';
import { EnvConfig } from '../domain/env-config.dto';
import path from 'path';
import dotenv from 'dotenv'
import fs from 'fs'
import { CONFIG_OPTIONS } from '../../common/constants';
import { MODULE_OPTIONS_TOKEN } from '../config.module-definition';
import { ConfigModuleOptions } from '../domain';

@Injectable()
export class ConfigService {

    private readonly envConfig: EnvConfig

    constructor(@Inject(MODULE_OPTIONS_TOKEN) private options: ConfigModuleOptions) {
        const filePath = `${process.env.NODE_ENV || 'development'}.env`
        const envFile = path.resolve(__dirname, '../../', options.folder, filePath)
        this.envConfig = dotenv.parse(fs.readFileSync(envFile))
    }

    get(key: string): string {
        return this.envConfig[key]
    }
}
