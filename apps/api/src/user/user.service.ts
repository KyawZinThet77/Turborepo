import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash ,verify } from 'argon2';
import { SignInInput } from './dto/sign-in.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private prisma:PrismaService, private jwtService: JwtService) {}
 async create(createUserInput: CreateUserInput) {
  try {
    const { password, ...rest } = createUserInput;
    const hashedPassword = await hash(password);

    return await this.prisma.user.create({
      data: {
        password: hashedPassword,
        ...rest,
      },
    });
  } catch (error) {
  

    throw new ConflictException('Something went wrong');;
  }
}

 async signIn(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInInput.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    
  const passwordMatch = await verify(
    user.password || "",
    signInInput.password,
  );

  if (!passwordMatch) {
    throw new UnauthorizedException('Invalid credentials');
  }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      accessToken,
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
