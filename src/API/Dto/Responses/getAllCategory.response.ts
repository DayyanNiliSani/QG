import { ReadCategoryDto } from "src/Infra/Repositories/Category/category.dto";

export interface GetAllCategoryResponse {
    categories: ReadCategoryDto[]
}