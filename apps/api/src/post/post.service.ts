import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_POSTS_PER_PAGE } from 'src/constants';

@Injectable()
export class PostService {
  // create(createPostInput: CreatePostInput) {
  //   return 'This action adds a new post';
  // }
  constructor(private prisma: PrismaService) {}

  async findAll({
    skip = 0,
    take = DEFAULT_POSTS_PER_PAGE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.post.findMany({ skip, take });
  }

  async count(){
    return await this.prisma.post.count();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} post`;
  // }

  // update(id: number, updatePostInput: UpdatePostInput) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
