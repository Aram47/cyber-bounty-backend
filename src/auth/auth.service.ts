import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly jwtSwervice: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(@Body() dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
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

    const token: string = this.jwtSwervice.sign({ email: dto.email });
    return { user, token };
  }

  async register(@Body() dto: RegisterDto) {
    dto.password = await this.passwordService.hash(dto.password);
    const res = await this.userService.create(dto);
    return res;
  }
}
