export class Cat {
    id: number
    name: string
    age: number
    breed: string
    createdAt: number
}

export interface CatInterface extends Cat { }