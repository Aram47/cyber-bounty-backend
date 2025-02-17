import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { CreateUserDto } from 'src/user/dto';
import { Response } from 'express';
import { EmailNotRegisteredPipe } from './pipes/email-not-registered.pipe';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({ summary: 'Log in' })
  @ApiCreatedResponse({
    description: 'ok if credentials are valid',
  })
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user, token } = await this.authService.login(dto);

    delete user.password;
    return {
      message: `Welcome back, ${user.username} jan`,
      user,
      token,
    };
  }

  @ApiOperation({ summary: 'Register' })
  @ApiCreatedResponse({})
  @ApiBadRequestResponse({
    description: 'User already registered',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Post('register')
  async register(@Body(EmailNotRegisteredPipe) dto: CreateUserDto) {
    return await this.authService.register(dto);
  }
}
