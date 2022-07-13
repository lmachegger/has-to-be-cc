import { Injectable } from '@nestjs/common';
import { time } from 'console';
import { RateRequestDto, RateResponseDto } from 'src/dtos';

@Injectable()
export class RateService {
  applyRateToCdr(rateRequest: RateRequestDto): RateResponseDto {
    const consumedKwh = this.convertWhToKwh(
      this.calculateConsumedWh(
        rateRequest.cdr.meterStart,
        rateRequest.cdr.meterStop,
      ),
    );

    const energyPrice = this.roundToPrecision(
      this.calculateEnergyPrice(consumedKwh, rateRequest.rate.energy),
      3,
    );

    const hours = this.calculateHoursTaken(
      rateRequest.cdr.timestampStart,
      rateRequest.cdr.timestampStop,
    );

    const timePrice = this.roundToPrecision(
      this.calculateTimePrice(hours, rateRequest.rate.time),
      3,
    );

    const overall = this.roundToPrecision(
      energyPrice + timePrice + rateRequest.rate.transaction,
      2,
    );

    return {
      overall,
      components: {
        energy: energyPrice,
        time: timePrice,
        transaction: rateRequest.rate.transaction,
      },
    };
  }

  private roundToPrecision(value: number, precision: number): number {
    const multiplier = 10 ** precision;
    return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
  }

  private calculateEnergyPrice(consumedKwh: number, pricePerKwh: number) {
    return consumedKwh * pricePerKwh;
  }

  private calculateConsumedWh(meterStart: number, meterStop: number): number {
    return meterStop - meterStart;
  }

  private calculateTimePrice(hours: number, pricePerHour: number): number {
    return hours * pricePerHour;
  }

  private convertWhToKwh(wh: number): number {
    return wh / 1_000;
  }

  private calculateHoursTaken(
    timestampStart: string,
    timestampStop: string,
  ): number {
    const milliSecondsTaken =
      new Date(timestampStop).getTime() - new Date(timestampStart).getTime();

    return this.convertMilliSecondsTohours(milliSecondsTaken);
  }

  private convertMilliSecondsTohours(milliSeconds: number): number {
    return milliSeconds / (1_000 * 60 * 60);
  }
}
