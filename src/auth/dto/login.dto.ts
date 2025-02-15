import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, Matches, ValidateIf, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty({
    description: 'Email address, unique for everyone',
    example: 'some@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @ValidateIf((o) => !o.username)
  @ValidateIf((o) => !o.email)
  email??: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => !o.username)
  username?: string;

  @Matches(/^(?![_\-.])[a-zA-Z0-9_.-]{3,30}(?<![_\-.])$/, {
    message:
      "Username can only contain letters, numbers, '_', '.' and '-', but cannot start or end with '_', '.' or '-'.",
  })
  @IsNotEmpty()
  @IsString()
  @ValidateIf((o) => !o.email)
  username?: string;

  @ApiProperty({
    description:
      'Strong password consisting of uppercase, lowercase character, at least one number and one symbol',
    example: 'StrongPassword1337$$$',
  })
  @IsStrongPassword()
  password: string;
}
