import { Game } from "src/Domain/Entities/game";
import { SelectedChoice } from "src/Domain/Entities/selectedChoice";
import { ReadCategoryDto, mapModelToDto as mapCategoryModelToDto } from "../Category/category.dto";
import { ReadQuestionDto, mapModelToDto as mapQuestionModelToDto } from "../Question/question.dto";
import { ReadUserDto, mapModelToDto as mapUserModelToDto } from "../User/user.dto";

export interface ReadGameDto{
    id:number,
    status: number
    updated: number
    user1: ReadUserDto
    user2: ReadUserDto | undefined
    categories: ReadCategoryDto[]
    questions: ReadQuestionDto[]
    suggestedCat1: ReadCategoryDto | undefined
    suggestedCat2: ReadCategoryDto | undefined
    suggestedCat3: ReadCategoryDto | undefined
    selectedChoices: ReadSelectedChoiceDto[] 
}

export interface ReadSelectedChoiceDto{
    id:number
    userId: number
    questionId: number
    selectedChoice: number
}

export function mapSelectedChoiceModelToDto(model: SelectedChoice):ReadSelectedChoiceDto{
    return {
        id: model.id,
        userId: model.user.id,
        questionId: model.question.id,
        selectedChoice: model.selectedChoice
    }
}

export function mapModelToDto(model:Game):ReadGameDto{
    return {
        id: model.id,
        status: model.status,
        updated: model.updated,
        user1: mapUserModelToDto(model.user1),
        user2: model.user2 ? mapUserModelToDto(model.user2) : undefined,
        suggestedCat1: model.suggestedCat1 ? mapCategoryModelToDto(model.suggestedCat1) : undefined,
        suggestedCat2: model.suggestedCat2 ? mapCategoryModelToDto(model.suggestedCat2) : undefined,
        suggestedCat3: model.suggestedCat3 ? mapCategoryModelToDto(model.suggestedCat3) : undefined,
        categories : model.categories ? model.categories.map(c => mapCategoryModelToDto(c)) : undefined,
        questions : model.questions ? model.questions.map(q => mapQuestionModelToDto(q)) : undefined,
        selectedChoices: model.selectedChoices ? model.selectedChoices.map(c => mapSelectedChoiceModelToDto(c)) : undefined
    }
}