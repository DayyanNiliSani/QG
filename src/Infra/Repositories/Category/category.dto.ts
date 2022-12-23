import { Category } from "src/Domain/Entities/category"

export interface CreateCategoryDto{
    title:string
}

export interface UpdateCategoryDto extends CreateCategoryDto{}

export interface ReadCategoryDto extends CreateCategoryDto{
    id:number
}

export function mapModelToDto(model:Category):ReadCategoryDto{
    return {
        id: model.id,
        title: model.title
    }
}