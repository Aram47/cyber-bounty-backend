import { IsEmail, IsString, IsStrongPassword, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address, unique for everyone',
    example: 'some@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'Strong password consisting of uppercase, lowercase character, at least one number and one symbol',
    example: 'StrongPassword1337$$$',
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @Matches(/^(?![_\-.])[a-zA-Z0-9_.-]{3,30}(?<![_\-.])$/, {
    message:
      "Username can only contain letters, numbers, '_', '.' and '-', but cannot start or end with '_', '.' or '-'.",
  })
  @IsString()
  username: string;

  @IsString()
  key: string;
}
