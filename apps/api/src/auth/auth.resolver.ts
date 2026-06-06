import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { signInInput } from './dto/signin.input';
import { AuthPayload } from './entities/auth-payload.entity';
import { SignInInput } from 'src/user/dto/sign-in.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  
  @Mutation(() => AuthPayload)
  async signIn(@Args("signInInput") signInInput: SignInInput) {

    const user = await this.authService.validateUser(signInInput);
    return await this.authService.login(user)
  }
}
