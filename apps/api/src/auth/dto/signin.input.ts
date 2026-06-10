import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";

@InputType()
export class signInInput {
    @Field( () => String)
    email!:string

    @Field( () => String)
    @MinLength(2)
    password!:string
}