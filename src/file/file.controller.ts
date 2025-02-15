import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { FileService } from './file.service';
import { FileDto } from './dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@Body() fileDto: FileDto) {
    return this.fileService.create(fileDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Delete()
  removeAll() {
    return this.fileService.removeAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
