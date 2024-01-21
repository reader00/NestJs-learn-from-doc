import { Injectable } from '@nestjs/common';
import { EnvConfig } from '../dto/env-config.dto';
import path from 'path';
import dotenv from 'dotenv'
import fs from 'fs'

@Injectable()
export class ConfigService {

    private readonly envConfig: EnvConfig

    constructor() {
        const option = { folder: './config' }

        const filePath = `${process.env.NODE_ENV || 'development'}.env`
        const envFile = path.resolve(__dirname, '../../', option.folder, filePath)
        this.envConfig = dotenv.parse(fs.readFileSync(envFile))
    }

    get(key: string): string {
        return this.envConfig[key]
    }
}
