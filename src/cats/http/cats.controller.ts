import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CatQuery, CatRepository, CreateCatDto, UpdateCatDto } from '../domain';
import { HttpExceptionFilter } from '../../common/exceptions/exceptions';
import { ZodValidationPipe } from '../../common/pipes';
import { createCatSchema } from '../../common/schemas';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../service/roles.guard';

// @UseFilters(HttpExceptionFilter)
@Controller('cats')
export class CatsController {

    constructor(private catService: CatRepository) { }

    @Post()
    @Roles(['admin'])
    @UseGuards(RolesGuard)
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
