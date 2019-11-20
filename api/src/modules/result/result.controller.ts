import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';

import { Logger } from '@logger/logger.base';
import { CONTROLLERS } from '@constants/constants';

import { Result } from './interfaces/result.interface';
import { ResultService } from './result.service';
import {
  BaseResultDto,
  ResultIDDto,
} from './dto';

@Controller(CONTROLLERS.RESULT)
export class ResultController extends Logger {
  constructor(private readonly resultService: ResultService) {
    super();
  }

  @Post()
  async create(
    @Body() baseResultDto: BaseResultDto,
  ) {
    const result = await this.resultService.findByRepo(baseResultDto.repositoryName);
    if (result) {
      throw new NotAcceptableException({
        error: 'Repository Name already exists',
      });
    }
    return this.resultService.create(baseResultDto);
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('size') size = 10): Promise<Result[]> {
    let skip = (page - 1) * size;
    this.logger.info('Fetching Result');
    return this.resultService.findAll(size, skip);
  }

  @Get('/count')
  async findCount(){
    return this.resultService.findCount();
  }

  @Get(':id')
  async findById(@Param() param: ResultIDDto): Promise<Result> {
    const result = await this.resultService.findById(param.id);

    if (result) {
      return result;
    }

    throw new NotFoundException();
  }

}
