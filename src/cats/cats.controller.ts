import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CatQuery, CreateCatDto, UpdateCatDto } from './domain';

@Controller('cats')
export class CatsController {

    @Post()
    create(@Body() createCatDto: CreateCatDto) {
        return "New cat added"
    }

    @Get()
    findAll(@Query() query: CatQuery) {
        return `All the cats returned${query.limit ? ' (limit: ' + query.limit + ')' : ''}.`
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id) {
        return `Cat with id ${id} returned`
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCatDto) {
        return 'Cat updated'
    }

    @Delete(":id")
    delete(@Param('id', ParseIntPipe) id: number) {
        return 'Cats deleted'
    }
}
