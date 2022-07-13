import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RateRequestDto, RateResponseDto } from './dto';
import { RateService } from './rate.service';

@Controller('/rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  @HttpCode(200)
  calculateRate(@Body() requestDto: RateRequestDto): RateResponseDto {
    return this.rateService.applyRateToCdr(requestDto);
  }
}
