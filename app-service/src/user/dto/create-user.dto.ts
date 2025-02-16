import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
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
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    description:
      "Username can only contain letters, numbers, '_', '.' and '-', but cannot start or end with '_', '.' or '-'.",
    example: 'awesome_user1337',
  })
  @Matches(/^(?![_\-.])[a-zA-Z0-9_.-]{3,30}(?<![_\-.])$/, {
    message:
      "Username can only contain letters, numbers, '_', '.' and '-', but cannot start or end with '_', '.' or '-'.",
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Public rsa key is required for each user',
    example:
      'ssh-ed26559 AAAAC3NzaC1lZDIIRd5CK1LDOjMI6B1bA7ZJBqbaUEA7vvz4LzObjNJL8M michael_jackson@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  key: string;
}
