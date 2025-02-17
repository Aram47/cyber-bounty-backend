import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto';
import { CreateUserDto } from 'src/user/dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(@Body() dto: LoginDto) {
    const toFind = {};
    if (dto.email) {
      toFind['email'] = dto.email;
    } else {
      toFind['username'] = dto.username;
    }

    const user = await this.prisma.user.findUnique({
      where: toFind as User,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { id: user.id, email: user.email };
    const token: string = await this.jwtService.signAsync(payload);
    return { user, token };
  }

  async register(@Body() dto: CreateUserDto) {
    const saltrounds = 10;
    dto.password = await bcrypt.hash(dto.password, saltrounds);
    const res = await this.userService.create(dto);
    return res;
  }
}
