import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/Domain/Entities/question';
import { QuestionService } from 'src/Service/Services/question.service';
import { Repository } from 'typeorm';
import { Seed } from '../seed.abstract';

@Injectable()
export class QuestionSeed extends Seed {
  constructor(
    @InjectRepository(Question) private questionRepo: Repository<Question>,
    private questionService: QuestionService,
  ) {
    super();
  }

  override async seed() {
    const checkIfAnythingExists = (await this.questionRepo.count()) != 0;
    if (checkIfAnythingExists) {
      Logger.warn("couldn't seed the question");
      return;
    }
    //Sport Questions
    {
      await this.questionRepo.save({
        question: 'Who is the goat of football?',
        answer1: 'Aqam Mbappe',
        answer2: 'Ronaldo',
        answer3: 'Messi',
        answer4: 'Maradona',
        correctAnswer: 3,
        isConfirmed: true,
        author: {
          id: 4,
        },
        category: {
          id: 1,
        },
        cascade: false,
      });

      await this.questionRepo.save({
        question: 'The Winner of FIFA World Cup 2022',
        answer1: 'Portugal',
        answer2: 'Spain',
        answer3: 'Argentina',
        answer4: 'France',
        correctAnswer: 3,
        isConfirmed: true,
        author: {
          id: 4,
        },
        category: {
          id: 1,
        },
      });

      await this.questionRepo.save({
        question: 'For which club Messi Played more?',
        answer1: 'Real Madrid',
        answer2: 'Barcelona',
        answer3: 'Chelsea',
        answer4: 'Milan',
        correctAnswer: 2,
        isConfirmed: true,
        author: {
          id: 2,
        },
        category: {
          id: 1,
        },
      });

      await this.questionRepo.save({
        question: 'Which team is not located at London',
        answer1: 'Chelsea',
        answer2: 'Arsenal',
        answer3: 'Tottenham',
        answer4: 'Everton',
        correctAnswer: 4,
        isConfirmed: true,
        author: {
          id: 2,
        },
        category: {
          id: 1,
        },
      });

      await this.questionRepo.save({
        question: 'Who is the manager of Man City club',
        answer1: 'Pep',
        answer2: 'Klopp',
        answer3: 'Angeloti',
        answer4: 'Wenger',
        correctAnswer: 1,
        isConfirmed: true,
        author: {
          id: 4,
        },
        category: {
          id: 1,
        },
      });
    }

    //Music Questions
    {
      await this.questionRepo.save({
        question: 'Who is the most streamed iranian singer in youtube?',
        answer1: 'Mohsen Yegane',
        answer2: 'Mohsen Chavoshi',
        answer3: 'Gogosh',
        answer4: 'Moeen',
        correctAnswer: 1,
        isConfirmed: true,
        author: {
          id: 3,
        },
        category: {
          id: 2,
        },
      });

      await this.questionRepo.save({
        question: 'Mohsen Yegane most played song in youtube?',
        answer1: 'Hobab',
        answer2: 'Divar',
        answer3: 'Behet ghol midam',
        answer4: 'Kavir',
        correctAnswer: 3,
        isConfirmed: true,
        author: {
          id: 4,
        },
        category: {
          id: 2,
        },
      });

      await this.questionRepo.save({
        question: 'which song is singed by Mohammad Alizade?',
        answer1: 'Ghame donyast',
        answer2: 'Chehel Daraje',
        answer3: 'Del bi to gham zade',
        answer4: 'Kari kardi',
        correctAnswer: 4,
        isConfirmed: true,
        author: {
          id: 2,
        },
        category: {
          id: 2,
        },
      });

      await this.questionRepo.save({
        question: 'Which one of this artist is not a pop star',
        answer1: 'Mohsen Yegane',
        answer2: 'Shajarian',
        answer3: 'Gogosh',
        answer4: 'Moeen',
        correctAnswer: 2,
        isConfirmed: true,
        author: {
          id: 4,
        },
        category: {
          id: 2,
        },
      });

      await this.questionRepo.save({
        question: 'Father of Persian Rap?',
        answer1: 'Hichkas',
        answer2: 'Yas',
        answer3: 'Bahram',
        answer4: 'Tataloo',
        correctAnswer: 1,
        isConfirmed: true,
        author: {
          id: 3,
        },
        category: {
          id: 2,
        },
      });
    }

    //culture Questions
    {
      await this.questionRepo.save({
        question: 'Dayyan Meaning ?',
        answer1: 'The one who gift others a lot',
        answer2: 'Vicious',
        answer3: 'Ugly',
        answer4: 'One man army',
        correctAnswer: 1,
        isConfirmed: true,
        author: {
          id: 2,
        },
        category: {
          id: 3,
        },
      });

      await this.questionRepo.save({
        question: 'Shahrzad Origin ?',
        answer1: 'Daughter of a famous king',
        answer2: 'A Beautiful girl in A thousand an one night story',
        answer3: 'A famous viking warrior',
        answer4: 'Name of a great scientist',
        correctAnswer: 2,
        isConfirmed: true,
        author: {
          id: 2,
        },
        category: {
          id: 3,
        },
      });

      await this.questionRepo.save({
        question: 'MrBilit?',
        answer1: 'Best Startup',
        answer2: 'Smile and travel',
        answer3: 'Assja',
        answer4: 'Shitty startup',
        correctAnswer: 4,
        isConfirmed: true,
        author: {
          id: 3,
        },
        category: {
          id: 3,
        },
      });

      await this.questionRepo.save({
        question: 'Where is Isfahan?',
        answer1: 'Iran',
        answer2: 'Colombia',
        answer3: 'Netherlands',
        answer4: 'France',
        correctAnswer: 1,
        isConfirmed: true,
        author: {
          id: 2,
        },
        category: {
          id: 3,
        },
      });

      await this.questionRepo.save({
        question: 'Which one is different?',
        answer1: 'China',
        answer2: 'UK',
        answer3: 'Asia',
        answer4: 'USA',
        correctAnswer: 3,
        isConfirmed: true,
        author: {
          id: 4,
        },
        category: {
          id: 3,
        },
      });
    }

    //cinema Questions
    {
      await this.questionRepo.save({
        question: 'Best film of all time based on IMDB?',
        answer1: 'The Shawshank redemption',
        answer2: 'Shutter Island',
        answer3: 'The good, the bad, the ugly',
        answer4: 'Baby driver',
        correctAnswer: 1,
        isConfirmed: true,
        author: {
          id: 2,
        },
        category: {
          id: 4,
        },
      });

      await this.questionRepo.save({
        question: 'which one is romantic?',
        answer1: 'Captain America',
        answer2: 'Guardians of galaxy',
        answer3: 'The notebook',
        answer4: 'A million dollar baby',
        correctAnswer: 3,
        isConfirmed: true,
        author: {
          id: 4,
        },
        category: {
          id: 4,
        },
      });

      await this.questionRepo.save({
        question: 'Choose the anime?',
        answer1: 'Last Samurai',
        answer2: 'Shutter Island',
        answer3: 'Death note',
        answer4: 'Baby driver',
        correctAnswer: 3,
        isConfirmed: true,
        author: {
          id: 4,
        },
        category: {
          id: 4,
        },
      });

      await this.questionRepo.save({
        question: 'Which one is not serial?',
        answer1: 'The Walking dead',
        answer2: 'Vikings',
        answer3: 'Breaking bad',
        answer4: 'Baby driver',
        correctAnswer: 4,
        isConfirmed: true,
        author: {
          id: 2,
        },
        category: {
          id: 4,
        },
      });

      await this.questionRepo.save({
        question: 'Choose the serial ',
        answer1: 'The Shawshank redemption',
        answer2: 'Rick and Morty',
        answer3: 'The good, the bad, the ugly',
        answer4: 'Baby driver',
        correctAnswer: 2,
        isConfirmed: true,
        author: {
          id: 4,
        },
        category: {
          id: 4,
        },
      });
    }

    //game Questions
    {
      await this.questionRepo.save({
        question: 'The Best Game of the year 2022',
        answer1: 'Elden ring',
        answer2: 'NFS',
        answer3: 'Valorant',
        answer4: 'COD',
        correctAnswer: 1,
        isConfirmed: true,
        author: {
          id: 3,
        },
        category: {
          id: 5,
        },
      });

      await this.questionRepo.save({
        question: 'Which game is not produced by Fromsoftware',
        answer1: 'Elden ring',
        answer2: 'Dark souls',
        answer3: 'Sekiro Shadow Dies Twice',
        answer4: 'COD',
        correctAnswer: 4,
        isConfirmed: true,
        author: {
          id: 4,
        },
        category: {
          id: 5,
        },
      });

      await this.questionRepo.save({
        question: 'The Best Game of the year 2013',
        answer1: 'Witcher 2',
        answer2: 'Witcher 3',
        answer3: 'Max Payne',
        answer4: 'COD',
        correctAnswer: 2,
        isConfirmed: true,
        author: {
          id: 2,
        },
        category: {
          id: 5,
        },
      });

      await this.questionRepo.save({
        question: 'Which one is not single player',
        answer1: 'Valorant',
        answer2: 'Crysis',
        answer3: 'Sifu',
        answer4: 'Hades',
        correctAnswer: 1,
        isConfirmed: true,
        author: {
          id: 4,
        },
        category: {
          id: 5,
        },
      });

      await this.questionRepo.save({
        question: 'Company with the reputation of making difficult games',
        answer1: 'Ubisoft',
        answer2: 'Activition',
        answer3: 'FromSoftware',
        answer4: 'NaughtyDog',
        correctAnswer: 3,
        isConfirmed: true,
        author: {
          id: 2,
        },
        category: {
          id: 5,
        },
      });
    }

    Logger.log('Question seed completed');
  }
}
