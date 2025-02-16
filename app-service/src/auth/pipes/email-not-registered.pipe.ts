import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../../user/dto';

@Injectable()
export class EmailNotRegisteredPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}
  async transform(dto: CreateUserDto) {
    const emailRegistered = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (emailRegistered) {
      throw new BadRequestException('Email already registered.');
    }
    return dto;
  }
}