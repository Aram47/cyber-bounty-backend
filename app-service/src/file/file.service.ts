import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { FileDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileInfo, Prisma } from '@prisma/client';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}
  async create(autherId: number, fileDto: FileDto) {
    try {
      if (autherId === fileDto.recipientsId) {
        throw new BadRequestException('You cannot query yourself.');
      }
      fileDto['authorId'] = autherId;
      await this.prisma.fileInfo.create({
        data: fileDto as FileInfo,
      });
      return fileDto;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Cannot send file');
        }
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  async findAll(currentUserId: number) {
    try {
      const res = await this.prisma.fileInfo.findMany({
        where: { recipientsId: currentUserId },
      });
      await this.prisma.fileInfo.deleteMany({
        where: { recipientsId: currentUserId },
      });
      return res;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('No file to import');
        }
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  async findOne(currentUserId: number, id: number) {
    try {
      const file = await this.prisma.fileInfo.findFirstOrThrow({
        where: { id, recipientsId: currentUserId },
      });
      return file;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException("File doesn't exist");
        }
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  async removeAll(currentUserId: number) {
    try {
      const res = await this.prisma.fileInfo.deleteMany({
        where: { authorId: currentUserId },
      });
      return res;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException("File doesn't exist");
        }
      }
      throw new HttpException('Internal server error', 500);
    }
  }

  async remove(currentUserId: number, id: number) {
    try {
      const res = await this.prisma.fileInfo.delete({
        where: {
          authorId: currentUserId,
          id,
        },
      });
      return res;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException("File doesn't exist");
        }
      }
      throw new HttpException('Internal server error', 500);
    }
  }
}
