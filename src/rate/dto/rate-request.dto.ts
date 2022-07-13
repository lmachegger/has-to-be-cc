import { ApiProperty } from '@nestjs/swagger';
import { CdrDto } from './cdr.dto';
import { RateDto } from './rate.dto';

export class RateRequestDto {
  @ApiProperty()
  rate: RateDto;

  @ApiProperty()
  cdr: CdrDto;
}
