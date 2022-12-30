import { Question } from "src/Domain/Entities/question";
import { EntitySchema } from "typeorm";

export const QuestionSchema = new EntitySchema<Question>({
    name:'Question',
    tableName:'questions',
    target: Question,
    columns: {
        id:{
            type:Number,
            primary:true,
            generated:true
        },
        question:{
            type: String,
            nullable: false
        },
        answer1:{
            type: String,
            nullable: false
        },
        answer2:{
            type: String,
            nullable: false
        },
        answer3:{
            type: String,
            nullable: false
        },
        answer4:{
            type: String,
            nullable: false
        },
        correctAnswer:{
            type: Number,
            default: 1,
        },
        isConfirmed: {
            type: Boolean,
            default: false
        }
    },
    relations:{
        category:{
            type:'many-to-one',
            target:'Category',
            cascade: true,
            inverseSide:'Question',
            nullable: false
        },
        author:{
            type:'many-to-one',
            target:'User',
            cascade: true,
            inverseSide:'Question',
            nullable: false,
        },
    },
})