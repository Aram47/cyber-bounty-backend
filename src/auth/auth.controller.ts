import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    delete user.password;
    return {
      message: `Welcome back, ${user.username}`,
      user,
    };
  }

  @Post('register')
  async register(@Body(EmailNotRegisteredPipe) dto: RegisterDto) {
    return await this.authService.register(dto);
  }
}
