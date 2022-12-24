import { AuthController } from './Auth/auth.controller'
import { CategoryController } from './Category/category.controller'
import {PingController} from './Ping/ping.controller'
import { QuestionController } from './Question/question.controller'
import {UserController} from './User/user.controller'

export const Controllers = [PingController, UserController,
     AuthController, CategoryController, QuestionController]