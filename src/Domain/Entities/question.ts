import { Category } from "./category"
import { User } from "./user"

export class Question{
    id:number
    question:string
    answer1:string
    answer2:string
    answer3:string
    answer4:string
    correctAnswer:number
    author: User
    category: Category
    isConfirmed: boolean

    confirm(){
        this.isConfirmed = true
    }

    isAuthor(authorId:number): boolean {
        return this.author.id == authorId
    }
}