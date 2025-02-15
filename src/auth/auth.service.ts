import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto';
import { CreateUserDto } from 'src/user/dto';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(@Body() dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: dto as User,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordCorrect = await this.passwordService.compare(
      dto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid password');
    }

    const token: string = this.jwtService.sign({ email: dto.email });
    return { user, token };
  }

  async register(@Body() dto: CreateUserDto) {
    dto.password = await this.passwordService.hash(dto.password);
    const res = await this.userService.create(dto);
    return res;
  }
}
