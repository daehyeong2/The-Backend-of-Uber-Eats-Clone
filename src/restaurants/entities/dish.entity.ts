import { CoreEntity } from '@app/common/entities/core.entity';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('DishChoiceInputType')
@ObjectType()
export class DishChoice {
  @Field(type => String)
  name: string;

  @Field(type => Number, { nullable: true, defaultValue: 0 })
  extra?: number;
}

@InputType('DishOptionInputType', { isAbstract: true })
@ObjectType()
export class DishOption {
  @Field(type => String)
  name: string;

  @Field(type => [DishChoice], { nullable: true })
  choices?: DishChoice[];

  @Field(type => Number, { nullable: true, defaultValue: 0 })
  extra?: number;
}

@InputType('DishInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Field(type => String)
  @Column()
  @IsString()
  @Length(5, 24)
  name: string;

  @Field(type => Number)
  @Column()
  @IsNumber()
  price: number;

  @Field(type => String, { nullable: true })
  @Column()
  @IsString()
  photo?: string;

  @Field(type => String)
  @Column()
  @IsString()
  @Length(5, 140)
  description: string;

  @Field(type => Restaurant, { nullable: false })
  @ManyToOne(
    type => Restaurant,
    restaurant => restaurant.menu,
    { onDelete: 'CASCADE', nullable: false },
  )
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant)
  restaurantId: number;

  @Field(type => [DishOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: DishOption[];
}
