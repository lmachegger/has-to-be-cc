import { Injectable } from '@nestjs/common';
import { RateDto, RateRequestDto, RateResponseDto } from './dto';
import {
  calculateTimeDifferenceInMilliSeconds,
  convertMilliSecondsTohours,
  convertWhToKwh,
  roundToPrecision,
  sumArray,
} from '../utils';

@Injectable()
export class RateService {
  applyRateToCdr(rateRequest: RateRequestDto): RateResponseDto {
    const energy = roundToPrecision(
      this.calculateEnergyPrice(
        rateRequest.cdr.meterStart,
        rateRequest.cdr.meterStop,
        rateRequest.rate.energy,
      ),
      3,
    );

    const time = roundToPrecision(
      this.calculateTimePrice(
        rateRequest.cdr.timestampStart,
        rateRequest.cdr.timestampStop,
        rateRequest.rate.time,
      ),
      3,
    );

    const components: RateDto = {
      energy,
      time,
      transaction: rateRequest.rate.transaction,
    };

    const overall = roundToPrecision(sumArray(Object.values(components)), 2);

    return {
      overall,
      components,
    };
  }

  private calculateEnergyPrice(
    meterStart: number,
    meterStop: number,
    pricePerKwh: number,
  ) {
    const consumedKwh = convertWhToKwh(meterStop - meterStart);
    return consumedKwh * pricePerKwh;
  }

  private calculateTimePrice(
    timestampStart: string,
    timestampStop: string,
    pricePerHour: number,
  ): number {
    const hours = this.calculateDurationInHours(timestampStart, timestampStop);
    return hours * pricePerHour;
  }

  private calculateDurationInHours(
    timestampStart: string,
    timestampStop: string,
  ): number {
    const duration = calculateTimeDifferenceInMilliSeconds(
      new Date(timestampStart),
      new Date(timestampStop),
    );

    return convertMilliSecondsTohours(duration);
  }
}
