import { Category } from 'src/Domain/Entities/category';
import { EntitySchema } from 'typeorm';

export const CategorySchema = new EntitySchema<Category>({
  name: 'Category',
  tableName: 'categories',
  target: Category,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    title: {
      type: String,
      nullable: false,
    },
  },
});
