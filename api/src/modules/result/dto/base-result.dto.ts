import { 
  IsArray,
  IsNotEmpty, 
  IsString ,
  IsIn,
  IsUrl,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import{
  findings,
} from '../interfaces/finding.interface';

import { SCAN_STATUSES } from '../constants';

export class BaseResultDto {
  @ApiModelProperty()
  @IsIn(SCAN_STATUSES)
  @IsNotEmpty({
    message: 'status is required.',
  })
  readonly status: string;    

  @ApiModelProperty()
  @IsUrl()
  @IsNotEmpty({
    message: 'repositoryName is required.',
  })
  readonly repositoryName: string;

  @ApiModelProperty()
  @IsArray({
    message: 'findings must be an array.',
  })
  readonly findings: findings;

  @ApiModelProperty()
  readonly queuedAt: Date;

  @ApiModelProperty()
  readonly scanningAt: Date;

  @ApiModelProperty()
  readonly finishedAt: Date;
}
