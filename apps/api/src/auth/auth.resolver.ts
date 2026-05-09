import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { signInInput } from './dto/signin.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  
  @Mutation(() => String)
  async signIn(@Args("SignInInput") signInInput: signInInput) {

    const user = await this.authService.validateUser(signInInput);
    return `Welcome ${user.name}`;
  }
}
