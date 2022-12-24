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
            nullable: false
        },
        password:{
            type: String,
            nullable: false
        },
        email:{
            type: String,
            unique: true,
            nullable: false
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
    }
})