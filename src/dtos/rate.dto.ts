import { ApiProperty } from '@nestjs/swagger';

export class RateDto {
  @ApiProperty()
  energy: number;

  @ApiProperty()
  time: number;

  @ApiProperty()
  transaction: number;
}
