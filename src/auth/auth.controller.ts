import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { CreateUserDto } from 'src/user/dto';
import { Response } from 'express';
import { EmailNotRegisteredPipe } from './pipes/email-not-registered.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, token } = await this.authService.login(dto);
    response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      signed: true,
    });

    delete user.password;
    return {
      message: `Welcome back, ${user.username} jan`,
      user,
    };
  }

  @Post('register')
  async register(@Body(EmailNotRegisteredPipe) dto: CreateUserDto) {
    return await this.authService.register(dto);
  }
}
