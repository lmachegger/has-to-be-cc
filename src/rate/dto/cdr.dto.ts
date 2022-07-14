import { ApiProperty } from '@nestjs/swagger';
import { Min, IsDateString } from 'class-validator';
import {
  IsGreaterOrEqualDateThan,
  IsGreaterOrEqualNumberThan,
} from '../../decorators';

export class CdrDto {
  @Min(0)
  @ApiProperty({ default: 1204307 })
  meterStart: number;

  @IsDateString()
  @ApiProperty({ default: '2021-04-05T10:04:00Z' })
  timestampStart: string;

  @Min(0)
  @IsGreaterOrEqualNumberThan('meterStart')
  @ApiProperty({ default: 1215230 })
  meterStop: number;

  @IsDateString()
  @IsGreaterOrEqualDateThan('timestampStart')
  @ApiProperty({ default: '2021-04-05T11:27:00Z' })
  timestampStop: string;
}
