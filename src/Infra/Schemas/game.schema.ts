
import { Game } from "src/Domain/Entities/game";
import { EntitySchema } from "typeorm";

export const GameSchema = new EntitySchema<Game>({
    name:'Game',
    tableName:'games',
    target: Game,
    columns: {
        id:{
            type:Number,
            primary:true,
            generated:true
        },
        status:{
            type: Number,
            nullable: false,
            default: 0,
        },
        updated:{
            type: "bigint",
            nullable: false,
            default: Date.now()
        },
    },
    relations:{
        user1:{
            type:'many-to-one',
            target:'User',
            nullable: false,
        },
        user2:{
            type:'many-to-one',
            target:'User',
            nullable:true,
        },
        categories:{
            type:'many-to-many',
            target:'Category',
            nullable: true,
            cascade: true
        },
        questions:{
            type:'many-to-many',
            target:'Question',
            nullable: true,
            cascade: true
        },
        selectedChoices:{
            type:'one-to-many',
            target:'SelectedChoice',
            nullable:true
        },
        suggestedCat1:{
            type:'many-to-one',
            target:'Category',
            nullable:true
        },
        suggestedCat2:{
            type:'many-to-one',
            target:'Category',
            nullable:true
        },
        suggestedCat3:{
            type:'many-to-one',
            target:'Category',
            nullable:true
        }
    }
})