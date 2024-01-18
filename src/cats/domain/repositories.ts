import { Cat } from "./interfaces";

export class CatRepository {
    getCats: () => Cat[]
    getCatById: () => Cat
    createCat: () => Cat
    updateCatById: () => Cat
    deleteCatById: () => Cat
}