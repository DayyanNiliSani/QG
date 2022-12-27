import { Game } from "./game"
import { Question } from "./question"
import { User } from "./user"

export class SelectedChoice{
    id:number
    user:User
    game:Game
    question:Question
    selectedChoice:number
}