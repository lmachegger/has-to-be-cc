import { Body, Controller, Post } from '@nestjs/common';
import { RateRequestDto, RateResponseDto } from './dto';
import { RateService } from './rate.service';

@Controller('/rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  calculateRate(@Body() requestDto: RateRequestDto): RateResponseDto {
    return this.rateService.applyRateToCdr(requestDto);
  }
}
