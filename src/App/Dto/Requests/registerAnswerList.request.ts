import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { RegisterAnswerRequest } from './registerAnswer.request';

export class ListOfRegisterAnswersRequest {
  @ApiProperty({
    isArray: true,
    type: RegisterAnswerRequest,
  })
  @IsNotEmpty()
  answers: RegisterAnswerRequest[];
}
