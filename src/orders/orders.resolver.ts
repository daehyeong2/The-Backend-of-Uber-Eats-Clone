import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { OrderService } from './orders.service';
import { CreateOrderInput, CreateOrderOutput } from './dtos/create-order.dto';
import { AuthUser } from '@app/auth/auth-user.decorator';
import { Role } from '@app/auth/role.decorator';
import { User } from '@app/users/entities/user.entity';
import { GetOrdersInput, GetOrdersOutput } from './dtos/get-orders.dto';

@Resolver(of => Order)
@Role(['Client'])
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(returns => CreateOrderOutput)
  createOrder(
    @AuthUser() customer: User,
    @Args('input') createOrderInput: CreateOrderInput,
  ): Promise<CreateOrderOutput> {
    return this.orderService.createOrder(customer, createOrderInput);
  }

  @Query(returns => GetOrdersOutput)
  @Role(['Any'])
  async getOrders(
    @AuthUser() user: User,
    @Args('input') getOrdersInput: GetOrdersInput,
  ): Promise<GetOrdersOutput> {
    return this.orderService.getOrders(user, getOrdersInput);
  }
}
