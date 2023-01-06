import { Question } from 'src/Domain/Entities/question';
import { ReadCategoryDto } from '../Category/category.dto';
import { ReadUserDto } from '../User/user.dto';
import { mapModelToDto as userMapper } from '../User/user.dto';
import { mapModelToDto as categoryMapper } from '../Category/category.dto';

export interface CreateQuestionDto {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: number;
  authorId: number;
  categoryId: number;
}

export interface UpdateQuestionDto extends CreateQuestionDto {}

export interface ReadQuestionDto {
  id: number;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  correctAnswer: number;
  isConfirmed: boolean;
  author: ReadUserDto;
  category: ReadCategoryDto;
}

export function mapModelToDto(model: Question): ReadQuestionDto {
  return {
    id: model.id,
    question: model.question,
    answer1: model.answer1,
    answer2: model.answer2,
    answer3: model.answer3,
    answer4: model.answer4,
    correctAnswer: model.correctAnswer,
    isConfirmed: model.isConfirmed,
    author: model.author ? userMapper(model.author) : null,
    category: model.category ? categoryMapper(model.category) : null,
  };
}
