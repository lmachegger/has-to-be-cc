import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class RateDto {
  @Min(0)
  @ApiProperty()
  energy: number;

  @Min(0)
  @ApiProperty()
  time: number;

  @Min(0)
  @ApiProperty()
  transaction: number;
}
