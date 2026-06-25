import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field(()=> Int)  
  @IsNumber()
  postId!: number;

  @Field(()=> String)  
  @IsString()
  content!: string;

  @Field(()=> Int , { nullable: true })  
  authorId?: number;
}
