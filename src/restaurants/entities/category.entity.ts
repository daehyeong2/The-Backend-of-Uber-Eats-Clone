import { CoreEntity } from '@app/common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Field(type => String)
  @Column()
  @IsString()
  @Length(5, 10)
  name: string;

  @Field(type => String)
  @IsString()
  @Column()
  icon: string;

  @Field(type => [Restaurant])
  @OneToMany(
    type => Restaurant,
    restaurant => restaurant.category,
    { onDelete: 'SET NULL' },
  )
  restaurants: Restaurant[];
}
