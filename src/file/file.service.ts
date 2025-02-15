import { Injectable } from '@nestjs/common';
import { FileDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileInfo, Prisma } from '@prisma/client';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}
  async create(fileDto: FileDto) {
    fileDto['autherId'] = 'xer';
    await this.prisma.fileInfo.create({
      data: fileDto as FileInfo,
    });
    return 'This action adds a new file' + fileDto;
  }

  findAll() {
    return `This action returns all file`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  removeAll() {
    return `This action removes a file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
