import { CoreOutput } from '@app/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import {
  PaginationInput,
  PaginationOutput,
} from '@app/common/dtos/pagination.dto';

@InputType()
export class SearchRestaurantInput extends PaginationInput {
  @Field(type => String)
  query: string;
}

@ObjectType()
export class SearchRestaurantOutput extends PaginationOutput {
  @Field(type => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];
}
