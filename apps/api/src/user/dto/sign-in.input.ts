import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class SignInInput {

  @Field( () => String)
  password!:string

  @Field( () => String)
  @IsEmail()
  email!:string

  @Field( () => String, { nullable: true }) 
  bio?:string;

  @Field( () => String, { nullable: true }) 
  avatar?:string;
}
