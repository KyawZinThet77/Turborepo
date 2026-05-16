import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { signInInput } from './dto/signin.input';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor (private prisma:PrismaService , private jwtService: JwtService) {}
    
    async validateUser({email, password }: signInInput) {
        const user = await this.prisma.user.findUnique({
          where: { email },
        });
        
     if (!user) throw new UnauthorizedException('User not found');
     const userPassword = user.password || '';

     const isPasswordValid = await verify(userPassword, password); 

     if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

     return user;
    }

    async generateToken(userId: number) {
      const payload:AuthJwtPayload = {sub: userId}
      const accessToken = await this.jwtService.signAsync( payload );
      return {accessToken};
    }

    async login (user : User){
      const {accessToken } = await this.generateToken(user.id)
      return {
        id : user.id,
        name : user.name,
        avatar : user.avatar,
        accessToken
      }
    }

}
