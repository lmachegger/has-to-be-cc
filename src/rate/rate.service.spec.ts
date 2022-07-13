import { RateRequestDto, RateResponseDto } from 'src/dtos';
import { RateService } from './rate.service';

describe('RateService', () => {
  let rateService: RateService;

  beforeEach(() => {
    rateService = new RateService();
  });
  it('works', () => {
    const input: RateRequestDto = {
      rate: {
        energy: 0.3,
        time: 2,
        transaction: 1,
      },
      cdr: {
        meterStart: 1204307,
        timestampStart: '2021-04-05T10:04:00Z',
        meterStop: 1215230,
        timestampStop: '2021-04-05T11:27:00Z',
      },
    };

    const expectedOutput: RateResponseDto = {
      overall: 7.04,
      components: {
        energy: 3.277,
        time: 2.767,
        transaction: 1,
      },
    };

    expect(rateService.applyRateToCdr(input)).toStrictEqual(expectedOutput);
  });
});
