import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { DEFAULT_POSTS_PER_PAGE } from 'src/constants';

@Resolver(() => CommentEntity)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [CommentEntity])
  getPostComments(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('take', {
      type: () => Int,
      nullable: true,
      defaultValue: DEFAULT_POSTS_PER_PAGE,
    }) take: number,
     @Args('skip', {
      type: () => Int,
      nullable: true,
      defaultValue: DEFAULT_POSTS_PER_PAGE,
    }) skip : number
   
  ) {
    console.log('skip',skip);
    
    return this.commentService.getPostComments({postId, take, skip});
  }

  @Query(() => Int)
  getPostCommentCount(@Args('postId', { type: () => Int }) postId: number) {
    return this.commentService.count(postId);
  }

  // @Query(() => [CommentEntity], { name: 'comment' })
  // findAll() {
  //   return this.commentService.findAll();
  // }

  // @Query(() => CommentEntity, { name: 'comment' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.commentService.findOne(id);
  // }

  // @Mutation(() => CommentEntity)
  // updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
  //   return this.commentService.update(updateCommentInput.id, updateCommentInput);
  // }

  // @Mutation(() => CommentEntity)
  // removeComment(@Args('id', { type: () => Int }) id: number) {
  //   return this.commentService.remove(id);
  // }
}
