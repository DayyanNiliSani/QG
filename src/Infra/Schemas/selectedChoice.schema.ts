
import { SelectedChoice } from "src/Domain/Entities/selectedChoice";
import { EntitySchema } from "typeorm";

export const SelectedChoiceSchema = new EntitySchema<SelectedChoice>({
    name:'SelectedChoice',
    tableName:'selectedChoices',
    target: SelectedChoice,
    columns: {
        id:{
            type:Number,
            primary:true,
            generated:true
        },
        selectedChoice:{
            type:Number,
            nullable: true,
        },
    },
    relations:{   
        question:{
            target:'Question',
            type:'many-to-one',
            nullable:false
        },
        user:{
            target:'User',
            type:'many-to-one',
            nullable:false
        },
        game:{
            target:'Game',
            type:'many-to-one',
            nullable:false
        }
     }
})