import { Inject, Injectable } from '@nestjs/common';
import { EnvConfig } from '../domain/env-config.dto';
import path from 'path';
import dotenv from 'dotenv'
import fs from 'fs'
import { CONFIG_OPTIONS } from '../../common/constants';

@Injectable()
export class ConfigService {

    private readonly envConfig: EnvConfig

    constructor(@Inject(CONFIG_OPTIONS) private options: Record<string, any>) {
        const filePath = `${process.env.NODE_ENV || 'development'}.env`
        const envFile = path.resolve(__dirname, '../../', options.folder, filePath)
        this.envConfig = dotenv.parse(fs.readFileSync(envFile))
    }

    get(key: string): string {
        return this.envConfig[key]
    }
}
