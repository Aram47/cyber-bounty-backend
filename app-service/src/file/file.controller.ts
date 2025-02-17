import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { FileDto } from './dto';
import { CurrentUserId } from '../user/decorators/current-user.decorator';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post()
  create(@CurrentUserId() currentUserId: number, @Body() fileDto: FileDto) {
    return this.fileService.create(currentUserId, fileDto);
  }

  @Get(':id')
  findOne(@CurrentUserId() currentUserId: number, @Param('id') id: string) {
    return this.fileService.findOne(currentUserId, +id);
  }

  @Get()
  findAll(@CurrentUserId() currentUserId: number) {
    return this.fileService.findAll(currentUserId);
  }

  @Delete()
  removeAll(@CurrentUserId() currentUserId: number) {
    return this.fileService.removeAll(currentUserId);
  }

  @Delete(':id')
  remove(@CurrentUserId() currentUserId: number, @Param('id') id: string) {
    return this.fileService.remove(currentUserId, +id);
  }
}
