import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { signInInput } from './dto/signin.input';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
    constructor (private prisma:PrismaService) {}
    
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
}
