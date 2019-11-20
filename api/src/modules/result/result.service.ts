import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Result } from './interfaces/result.interface';
import {
  BaseResultDto,
} from './dto';
import {
  SCAN_STATUS_IN_PROGRESS,
  SCAN_STATUS_QUEUED,
} from './constants';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel('Result') protected readonly model: Model<Result>,
  ) {}

  async create(baseResultDto: BaseResultDto): Promise<Result> {
    const result = new this.model(baseResultDto);
    switch (result.status) {
      case SCAN_STATUS_QUEUED:
        result.queuedAt = Date.now();
        break;
      
      case SCAN_STATUS_IN_PROGRESS:
        result.scanningAt = Date.now();
        break;
      
      default:
        result.finishedAt = Date.now();
    }

    result.totalFindings = result.findings.length;
    return await result.save();
  }

  async findAll(limit,skip): Promise<Result[]> {
    return await this.model
      .find({}, {
        repositoryName: 1,
        status: 1,
        queuedAt: 1,
        scanningAt: 1,
        finishedAt: 1,
        totalFindings: 1,   
      })
      .limit(limit)
      .skip(skip)
      .sort({
        "updatedAt": -1,
      })
      .exec();
  }

  async findById(id: string): Promise<Result> {
    return await this.model.findById(id).exec();
  }

  async findByRepo(repositoryName: string): Promise<Result> {
    return await this.model.findOne({
      repositoryName,
    }).exec();
  }

  async findCount(): Promise<Result> {
    return await this.model.countDocuments().exec();
  }
}
