import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Dish } from '../entities/dish.entity';
import { CoreOutput } from '@app/common/dtos/output.dto';

@InputType()
export class CreateDishInput extends PickType(Dish, [
  'name',
  'price',
  'photo',
  'description',
  'options',
]) {
  @Field(type => Number)
  restaurantId: number;
}

@ObjectType()
export class CreateDishOutput extends CoreOutput {}
