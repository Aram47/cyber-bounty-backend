import { IsNotEmpty, IsEmail, IsString, IsStrongPassword, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email address, unique for everyone',
    example: 'some@email.com',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description:
      'Strong password consisting of uppercase, lowercase character, at least one number and one symbol',
    example: 'StrongPassword1337$$$',
  })
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @Matches(/^(?![_\-.])[a-zA-Z0-9_.-]{3,30}(?<![_\-.])$/, {
    message:
      "Username can only contain letters, numbers, '_', '.' and '-', but cannot start or end with '_', '.' or '-'.",
  })
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  key: string;
}
