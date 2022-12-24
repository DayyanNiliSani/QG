import { ReadQuestionDto } from "src/Infra/Repositories/Question/question.dto";

export interface GetQuestionResponse{
    questions: ReadQuestionDto[]
}