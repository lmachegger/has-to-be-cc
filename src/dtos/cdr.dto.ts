import { ApiProperty } from '@nestjs/swagger';

export class CdrDto {
  @ApiProperty()
  meterStart: number;

  @ApiProperty()
  timestampStart: string;

  @ApiProperty()
  meterStop: number;

  @ApiProperty()
  timestampStop: string;
}
