import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { FileDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileInfo, Prisma } from '@prisma/client';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}
  async create(autherId: number, fileDto: FileDto) {
    fileDto['autherId'] = autherId;
    await this.prisma.fileInfo.create({
      data: fileDto as FileInfo,
    });

    return 'This action adds a new file' + fileDto;
  }

  async findAll(currentUserId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: currentUserId },
        include: {
          incomingData: true,
        },
      });
      return user.incomingData;
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
      const user = await this.prisma.user.findUnique({
        where: { id: currentUserId },
      });
      const file = await user.incomingData.findFirstOrThrow({ where: { id } });
      return file;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException("File doesn't exist");
        }
      }
      throw new HttpException('Internal server error', 500);
    }
    // return `This action returns a #${id} file`;
  }

  async removeAll(currentUserId: number) {
    try {
      /* Operations which will remove files from IPFS*/
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
    // return `This action removes a file`;
  }

  async remove(currentUserId: number, id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: currentUserId },
      });
      let file = await user.outgoingData.findUnique({ where: { id } });
      if (!file) {
        file = await user.incomingData.findFirstOrThrow({ where: { id } });
      }
      /* Operations which will remove file from IPFS*/
      const res = await this.prisma.fileInfo.delete({ where: { id } });
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
