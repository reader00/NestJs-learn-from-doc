export class CreateCatDto {
    name: string
    age: number
    breed: string
}

export class CatQuery {
    limit?: number
}

export class UpdateCatDto implements Partial<CreateCatDto> { }