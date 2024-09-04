import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PaginationInput, PaginationOutput } from './pagination.dto';
import { Restaurant } from '@app/restaurants/entities/restaurant.entity';

@InputType()
export class RestaurantsInput extends PaginationInput {}

@ObjectType()
export class RestaurantsOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  results?: Restaurant[];
}
