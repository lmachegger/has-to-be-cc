import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CdrDto } from './cdr.dto';
import { RateDto } from './rate.dto';
import { ValidateNested } from 'class-validator';

export class RateRequestDto {
  @Type(() => RateDto)
  @ValidateNested({ each: true })
  @ApiProperty()
  rate: RateDto;

  @Type(() => CdrDto)
  @ValidateNested({ each: true })
  @ApiProperty()
  cdr: CdrDto;
}
