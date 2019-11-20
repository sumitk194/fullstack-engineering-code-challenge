import { IsMongoId } from 'class-validator';

export class ResultIDDto {
  @IsMongoId({
    message: 'Enter a valid ID',
  })
  readonly id: string;
}

