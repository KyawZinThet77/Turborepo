import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_POSTS_PER_PAGE } from 'src/constants';

@Injectable()
export class PostService {

  
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

  async create({createPostInput, userId}: {createPostInput: CreatePostInput, userId: number}) {
   return await this.prisma.post.create({
      data: {
        ...createPostInput,
        author: {
          connect: { id: userId },
        },
        tags: {
          connectOrCreate: createPostInput.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

   async update({
    userId,
    updatePostInput,
  }: {
    userId: number;
    updatePostInput: UpdatePostInput;
  }) {
    const authorIdMatched = await this.prisma.post.findUnique({
      where: { id: updatePostInput.postId, authorId: userId },
    });

    if (!authorIdMatched) throw new UnauthorizedException();
    const { postId, ...data } = updatePostInput;
    return await this.prisma.post.update({
      where: {
        id: updatePostInput.postId,
      },
      data: {
        ...data,
        tags: {
          set: [],
          connectOrCreate: updatePostInput?.tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

   async delete({ postId, userId }: { postId: number; userId: number }) {
    const authorIdMatched = await this.prisma.post.findUnique({
      where: { id: postId, authorId: userId },
    });

    if (!authorIdMatched) throw new UnauthorizedException();

    return await this.prisma.post.delete({
      where: { id: postId, authorId: userId },
    });
  }
}
