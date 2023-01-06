import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateQuestionDto,
  mapModelToDto,
  ReadQuestionDto,
  UpdateQuestionDto,
} from 'src/Infra/Repositories/Question/question.dto';
import { QuestionRepo } from 'src/Infra/Repositories/Question/question.repository';

@Injectable()
export class QuestionService {
  constructor(private questionRepo: QuestionRepo) {}

  async create(dto: CreateQuestionDto): Promise<ReadQuestionDto> {
    return mapModelToDto(await this.questionRepo.create(dto));
  }

  async update(id: number, dto: UpdateQuestionDto): Promise<ReadQuestionDto> {
    return mapModelToDto(await this.questionRepo.update(id, dto));
  }

  async getAll(skip: number, take: number): Promise<ReadQuestionDto[]> {
    return (await this.questionRepo.getAll(skip, take)).map((q) => mapModelToDto(q));
  }

  async getCategoryQuestions(categoryId: number, skip: number, take: number): Promise<ReadQuestionDto[]> {
    return (await this.questionRepo.getCategoryQuestions(categoryId, skip, take)).map((q) => mapModelToDto(q));
  }

  async getUserQuestions(userId: number, skip, take: number): Promise<ReadQuestionDto[]> {
    return (await this.questionRepo.getUserQuestions(userId, skip, take)).map((q) => mapModelToDto(q));
  }

  async delete(id: number, authorId: number, isAdmin: boolean): Promise<void> {
    const question = await this.questionRepo.find(id);
    if (!question) return;
    if (isAdmin) return await this.questionRepo.delete(question);
    if (question.isAuthor(authorId)) return await this.questionRepo.delete(question);
  }

  async confirmQuestion(id: number): Promise<ReadQuestionDto> {
    const question = await this.questionRepo.find(id);
    if (!question) throw new NotFoundException();
    question.confirm();
    this.questionRepo.saveChanges(question);
    return mapModelToDto(question);
  }
}
