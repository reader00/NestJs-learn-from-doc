import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatQuery, CatRepository, CreateCatDto, UpdateCatDto } from '../domain';
import { HttpExceptionFilter } from '../../common/exceptions/exceptions';
import { ZodValidationPipe } from '../../common/pipes';
import { createCatSchema } from '../../common/schemas';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ErrorInterceptor, LoggingInterceptor, TransformInterceptor } from '../../common/interceptors';

// @UseFilters(HttpExceptionFilter)
@Controller('cats')
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ErrorInterceptor)
export class CatsController {

    constructor(private catService: CatRepository) { }

    @Post()
    @Roles(['admin'])
    // @UseGuards(RolesGuard)
    // @UsePipes(new ZodValidationPipe(createCatSchema))
    create(@Body(ValidationPipe) createCatDto: CreateCatDto) {
        return this.catService.createCat(createCatDto)
    }

    @Get()
    findAll(@Query() query: CatQuery) {
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
