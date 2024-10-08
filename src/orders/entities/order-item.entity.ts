import { CoreEntity } from '@app/common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Dish } from '../../restaurants/entities/dish.entity';

@InputType('OrderItemOptionInputType')
@ObjectType()
export class OrderItemOption {
  @Field(type => String)
  name: string;

  @Field(type => String, { nullable: true })
  choice?: string;
}

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  @Field(type => Dish)
  @ManyToOne(type => Dish, { onDelete: 'CASCADE', eager: true })
  dish: Dish;

  @Field(type => [OrderItemOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: OrderItemOption[];
}
