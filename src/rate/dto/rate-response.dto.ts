import { ApiProperty } from '@nestjs/swagger';
import { RateDto } from './rate.dto';

export class RateResponseDto {
  @ApiProperty()
  overall: number;

  @ApiProperty()
  components: RateDto;
}
