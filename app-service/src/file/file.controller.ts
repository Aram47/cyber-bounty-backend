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
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@UseGuards(AuthGuard)
@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async create(
    @CurrentUserId() currentUserId: number,
    @Body() fileDto: FileDto,
  ) {
    const result = await this.fileService.create(currentUserId, fileDto);
    const url = `${this.configService.get<string>('NOTIFICATION_SERVICE_HOST')}:${this.configService.get<string>('NOTIFICATION_SERVICE_PORT')}/users/${+fileDto.recipientsId}`;
    const data = (await axios.get(url)).data;
    console.log(data);
    return result;
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
