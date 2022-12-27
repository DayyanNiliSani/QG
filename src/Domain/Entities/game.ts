import { SamePlayerError } from "../Common/Exception/samePlayer"
import { Category } from "./category"
import { Question } from "./question"
import { SelectedChoice } from "./selectedChoice"
import { User } from "./user"

export class Game{
    id: number
    user1: User
    user2: User | undefined
    updated: number
    status: GameStatus
    suggestedCat1:Category | undefined
    suggestedCat2:Category | undefined
    suggestedCat3:Category | undefined
    categories: Category[]
    questions: Question[]
    selectedChoices: SelectedChoice[]   

    joinPlayer2(user2Id:number):boolean{
        if(this.user1.id == user2Id) return false
        this.user2 = new User()
        this.user2.id = user2Id
        this.updated = Date.now()
        return true
    }

    setSuggestedCategories(cats:Category[]){
        this.suggestedCat1 = cats[0]
        this.suggestedCat2 = cats[1]
        this.suggestedCat3 = cats[2]
        this.updated = Date.now()
        this.status += 1
    }

    isItTurnOfPlayer(userId:number):boolean{
        var player1Turn = true
        if(this.status == GameStatus.User1AnsweredQues1
            || this.status == GameStatus.User2AnsweredQues1
            || this.status == GameStatus.Cat2Selected
            || this.status == GameStatus.User1AnsweredQues3
            || this.status == GameStatus.User2AnsweredQues3
            || this.status == GameStatus.Cat4Selected)
            player1Turn = false
        return player1Turn && (userId == this.user1.id)
    }
}

export enum GameStatus{
    Started, 
    Cat1Selected,
    User1AnsweredQues1,
    User2AnsweredQues1,
    Cat2Selected,
    User2AnsweredQues2,
    User1AnsweredQues2,
    Cat3Selected,
    User1AnsweredQues3,
    User2AnsweredQues3,
    Cat4Selected,
    User2AnsweredQues4,
    User1AnsweredQues4,
    Ended
}