import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { ResultSchema } from './schemas/result.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Result', schema: ResultSchema }]),
  ],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
