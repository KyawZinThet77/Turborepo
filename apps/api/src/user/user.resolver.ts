import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthPayload } from 'src/auth/entities/auth-payload.entity';
import { SignInInput } from './dto/sign-in.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async CreateUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);

}

@Mutation(() => AuthPayload)
async signIn(
  @Args('signInInput') signInInput: SignInInput,
) {
  return this.authService.login(signInInput);
}
}