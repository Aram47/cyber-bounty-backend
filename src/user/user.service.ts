import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
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

  async findOne({ username, email }: { username?: string; email?: string }) {
    const query: any = {};
    if (username) query.username = username;
    if (email) query.email = email;

    return await this.prisma.user.findFirst({
      where: {
        username,
        email,
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    
    if (updateUserDto.username) user.username = updateUserDto.username; 
    if (updateUserDto.password) user.password = await bcrypt.hash(updateUserDto.password);
    if (updateUserDto.key) user.key = updateUserDto.key; 
    

    return user;
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
