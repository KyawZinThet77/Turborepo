import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { Like } from './entities/like.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => Like)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
   async likePost(@Context() Ctx ,@Args('postId', {type :() => Int!}) postId: number) {
    const userId = Ctx.req.user.id;
    return await this.likeService.create({postId, userId});
  }

    @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
   async unLikePost(@Context() Ctx ,@Args('postId', {type :() => Int!}) postId: number) {
    const userId = Ctx.req.user.id;
    return await this.likeService.delete({postId, userId});
  }

  @Query(()=> Int)
  async likeCountperPost(@Args('postId', {type :() => Int!}) postId: number) {
    return await this.likeService.count(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(()=> Boolean)
  async isUserLiked(@Context() Ctx ,@Args('postId', {type :() => Int!}) postId: number) {
    const userId = Ctx.req.user.id;
    return await this.likeService.isUserLiked({postId, userId});
  }
}
