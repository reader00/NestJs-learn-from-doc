import { SetMetadata, UseGuards, UseInterceptors, applyDecorators } from '@nestjs/common'
import { Roles } from './'
import { LoggingInterceptor, TimeoutInterceptor } from '../interceptors'

export function PostCat(...roles: string[]) {

    return applyDecorators(
        SetMetadata('roles', roles),
        UseInterceptors(TimeoutInterceptor, LoggingInterceptor),
    )

}