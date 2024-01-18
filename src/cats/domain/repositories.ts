import { Cat } from "./interfaces";

export abstract class CatRepository {
    abstract getCats(): Cat[]
    abstract getCatById(): Cat
    abstract createCat(): Cat
    abstract updateCatById(): Cat
    abstract deleteCatById(): Cat
}