import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post, Query, UseFilters } from '@nestjs/common';
import { CatQuery, CatRepository, CreateCatDto, UpdateCatDto } from '../domain';
import { HttpExceptionFilter } from '../../common/exceptions';

@UseFilters(HttpExceptionFilter)
@Controller('cats')
export class CatsController {

    constructor(private catService: CatRepository) { }

    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        return this.catService.createCat(createCatDto)
    }

    @Get()
    findAll(@Query() query: CatQuery) {
        return this.catService.getCats()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.catService.getCatById(id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCatDto) {
        return this.catService.updateCatById(id, body)
    }

    @Delete(":id")
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.catService.deleteCatById(id)
    }
}
