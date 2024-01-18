import { CreateCatDto, UpdateCatDto } from "./dto";
import { Cat } from "./interfaces";

export abstract class CatRepository {
    abstract getCats(): Cat[]
    abstract getCatById(id: number): Cat | []
    abstract createCat(cat: CreateCatDto): Cat
    abstract updateCatById(id: number, cat: UpdateCatDto): Cat
    abstract deleteCatById(id: number): Cat
}