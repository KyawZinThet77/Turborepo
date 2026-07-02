import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { isNullableType } from 'graphql';

@InputType()
export class CreatePostInput {
  @IsString()
 @Field(() => String)
  title!: string;

  @IsString()
  @IsOptional()
 @Field(() => String)
  tags!: string[];

  @IsString()
  @Field(() => String)
  content!: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  thumbnail?: string;

  @IsBoolean()
  @Field(() => Boolean, { defaultValue: false })
  published!: boolean
  
}
