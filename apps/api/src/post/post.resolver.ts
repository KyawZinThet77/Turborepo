import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  Float,
} from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { DEFAULT_POSTS_PER_PAGE } from 'src/constants';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  findAll(
    @Context() context,
    @Args('skip', { type: () => Float, nullable: true }) skip?: number,
    @Args('take', { type: () => Float, nullable: true }) take?: number,
  ) {
    const user = context.req.user; // Access the authenticated user from the request
    return this.postService.findAll({ skip, take });
  }

  @Query(() => Int, { name: 'postCount' })
  count() {
    return this.postService.count();
  }

  @Query(() => Post)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

   @UseGuards(JwtAuthGuard)
  @Query(() => [Post], { name: 'getPostsByUser' })
  getPostsByUser(
    @Context() context,
    @Args('skip', { type: () => Float, nullable: true }) skip?: number,
    @Args('take', { type: () => Float, nullable: true }) take?: number,
  ) {
    const userId = context.req.user.id; // Access the authenticated user from the request
    return this.postService.findByUser({ skip : skip?? 0, take : take ?? DEFAULT_POSTS_PER_PAGE,userId });
  }

  @UseGuards(JwtAuthGuard)
  @Query(()=> Int)
  userPostCount(@Context() context) {
    const userId = context.req.user.id; // Access the authenticated user from the request
    return this.postService.countByUser(userId);
  }
}


