import { User } from "src/Domain/Entities/user";
import { EntitySchema } from "typeorm";

export const UserSchema = new EntitySchema<User>({
    name:'User',
    tableName:'users',
    target: User,
    columns: {
        id:{
            type:Number,
            primary:true,
            generated:true
        },
        username:{
            type: String,
        },
        password:{
            type: String
        },
        email:{
            type: String,
            unique: true
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
    }
})