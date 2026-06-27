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

  async count() {
    return await this.prisma.post.count();
  }

  async findOne(id: number) {
    return await this.prisma.post.findUnique({
      where: { id },
      include: { author: true, tags: true },
    });
  }
  findByUser({
    skip = 0,
    take = DEFAULT_POSTS_PER_PAGE,
    userId,
  }: {
    skip?: number;
    take?: number;
    userId: number;
  }) {
    return this.prisma.post.findMany({
      where: { author: { id: userId } },
      select: {
        id: true,
        content: true,
        createdAt: true,
        published: true,
        slug: true,
        title: true,
        thumbnail: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      skip,
      take,
    });
  }

  async countByUser(userId: number) {
    return await this.prisma.post.count({ where: { author: { id: userId } } });
  }
}
