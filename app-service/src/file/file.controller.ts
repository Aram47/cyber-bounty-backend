import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileDto } from './dto';
import { CurrentUserId } from '../user/decorators/current-user.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@CurrentUserId() currentUserId: number, @Body() fileDto: FileDto) {
    return this.fileService.create(currentUserId, fileDto);
  }

  @Get(':id')
  async findOne(
    @CurrentUserId() currentUserId: number,
    @Param('id') id: string,
  ) {
    const res = await this.fileService.findOne(currentUserId, +id);
    await this.fileService.remove(currentUserId, +id);
    return res;
  }

  @ApiOperation({ summary: 'Get all file requests' })
  @Get()
  async findAll(@CurrentUserId() currentUserId: number) {
    const res = await this.fileService.findAll(currentUserId);
    await this.fileService.removeAll(currentUserId);
    return res;
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
