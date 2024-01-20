import { IsNumber, IsOptional, IsString } from "class-validator"

export class CreateCatDto {
    @IsString()
    name: string

    @IsNumber()
    age: number

    @IsString()
    breed: string
}

export class CatQuery {
    @IsOptional()
    limit?: number
}

export class UpdateCatDto implements Partial<CreateCatDto> { }