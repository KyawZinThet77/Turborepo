import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { DEFAULT_POSTS_PER_PAGE } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}
  create(createCommentInput: CreateCommentInput) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comment`;
  }

  async getPostComments({
    postId,
    skip = 0,
    take = DEFAULT_POSTS_PER_PAGE,
  }: {
    postId: number;
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.comment.findMany({
      where: { postId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
    });
  }

  async count (postId: number) {
    return await this.prisma.comment.count({ where: { postId } });
  }
}
