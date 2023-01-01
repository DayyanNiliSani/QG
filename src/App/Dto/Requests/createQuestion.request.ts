import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateQuestionRequest{
    @ApiProperty()
    @IsNotEmpty()
    question:string

    @ApiProperty()
    @IsNotEmpty()
    answer1:string
    
    @ApiProperty()
    @IsNotEmpty()
    answer2:string
    
    @ApiProperty()
    @IsNotEmpty()
    answer3:string
    
    @ApiProperty()
    @IsNotEmpty()
    answer4:string

    @ApiProperty()
    @IsNotEmpty()
    correctAnswer:number

    @ApiProperty()
    @IsNotEmpty()
    authorId: number

    @ApiProperty()
    @IsNotEmpty()
    categoryId: number
}