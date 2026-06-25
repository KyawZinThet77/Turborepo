import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}
  async create({ postId, userId }: { postId: number; userId: number }) {
    try {
      const like = await this.prisma.like.create({
        data: { postId, userId },
      });

      return !!like;
    } catch (error) {
      throw new BadRequestException('Failed to create like');
    }
  }

  async delete({ postId, userId }: { postId: number; userId: number }) {
    try {
      await this.prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      return true;
    } catch (error) {
      throw new BadRequestException('Failed to remove like');
    }
  }

  async count(postId: number) {
    return await this.prisma.like.count({ where: { postId } });
  }

  async isUserLiked({ postId, userId }: { postId: number; userId: number }) {
    try {
      const like = await this.prisma.like.findFirst({
        where: {
          userId,
          postId,
        },
      });

      return !!like;
    } catch (error) {
      throw new BadRequestException('Failed to remove like');
    }
  }
}
