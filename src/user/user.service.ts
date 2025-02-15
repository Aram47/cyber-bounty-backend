import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.prisma.user.create({ data: createUserDto });
      return newUser;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('User already registered');
        }
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  async findOne({
    username,
    email,
  }: {
    username?: string;
    email?: string;
  }): Promise<User> {
    const query: any = {};
    if (username) {
      query['username'] = username;
    } else if (email) {
      query['email'] = email;
    }

    try {
      const res = await this.prisma.user.findFirstOrThrow({
        where: query as User,
      });
      // console.log(id, res['id']);

      // if (id == res['id']) {
      //   throw new BadRequestException("You can't send document to yourself");
      // }
      return res;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException("User doesn't exist");
        }
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (updateUserDto.username) user.username = updateUserDto.username;
    if (updateUserDto.password) {
      const saltrounds = 10;
      user.password = await bcrypt.hash(updateUserDto.password, saltrounds);
    }
    if (updateUserDto.key) user.key = updateUserDto.key;

    return user;
  }

  async remove(id: number) {
    try {
      const res = await this.prisma.user.delete({ where: { id } });
      return res;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException("User doesn't exist");
        }
      }
      throw new HttpException('Internal server error', 500);
    }
  }
}
