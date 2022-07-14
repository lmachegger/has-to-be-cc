import { ApiProperty } from '@nestjs/swagger';
import { Min, IsDateString } from 'class-validator';
import {
  IsGreaterOrEqualDateThan,
  IsGreaterOrEqualNumberThan,
} from '../../decorators';

export class CdrDto {
  @Min(0)
  @ApiProperty()
  meterStart: number;

  @IsDateString()
  @ApiProperty()
  timestampStart: string;

  @Min(0)
  @IsGreaterOrEqualNumberThan('meterStart')
  @ApiProperty()
  meterStop: number;

  @IsDateString()
  @IsGreaterOrEqualDateThan('timestampStart')
  @ApiProperty()
  timestampStop: string;
}
