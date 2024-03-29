import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatQuery, CatRepository, CreateCatDto, UpdateCatDto } from '../domain';
import { HttpExceptionFilter } from '../../common/exceptions/exceptions';
import { ZodValidationPipe } from '../../common/pipes';
import { createCatSchema } from '../../common/schemas';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CacheInterceptor, ErrorInterceptor, LoggingInterceptor, TimeoutInterceptor, TransformInterceptor } from '../../common/interceptors';
import { resolve } from 'path';
import { Payload } from '../../common/decorators';
import { ConfigService } from '../../config/services/config.service';

// @UseFilters(HttpExceptionFilter)
@Controller('cats')
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TimeoutInterceptor)
// @UseInterceptors(TransformInterceptor)
// @UseInterceptors(ErrorInterceptor)
// @UseInterceptors(CacheInterceptor)
export class CatsController {

    constructor(private catService: CatRepository, private readonly config: ConfigService) { }

    @Post()
    @Roles(['admin'])
    // @UseGuards(RolesGuard)
    // @UsePipes(new ZodValidationPipe(createCatSchema))
    create(@Body(ValidationPipe) createCatDto: CreateCatDto) {
        console.log(this.config.get('stage'));
        return this.catService.createCat(createCatDto)
    }

    @Get()
    async findAll(@Query() query: CatQuery, @Payload(new ValidationPipe({ validateCustomDecorators: true, })) some: string) {
        return this.catService.getCats()
    }

    @Get(':id')
    findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
        return this.catService.getCatById(id)
    }

    @Patch(':id')
    update(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number, @Body() body: UpdateCatDto) {
        return this.catService.updateCatById(id, body)
    }

    @Delete(":id")
    delete(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number) {
        return this.catService.deleteCatById(id)
    }
}
