import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class RateDto {
  @Min(0)
  @ApiProperty({ default: 0.3 })
  energy: number;

  @Min(0)
  @ApiProperty({ default: 2 })
  time: number;

  @Min(0)
  @ApiProperty({ default: 1 })
  transaction: number;
}
