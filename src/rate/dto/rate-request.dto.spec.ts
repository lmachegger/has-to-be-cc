import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { RateRequestDto } from './rate-request.dto';

describe('CdrDto validation', () => {
  let target: ValidationPipe;

  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: RateRequestDto,
    data: '',
  };

  const defaultTestObj: RateRequestDto = {
    cdr: {
      meterStart: 0,
      timestampStart: '2021-04-05T10:04:00Z',
      meterStop: 200,
      timestampStop: '2021-04-05T11:04:00Z',
    },
    rate: { energy: 1, time: 2, transaction: 3 },
  };

  beforeEach(() => {
    target = new ValidationPipe();
  });

  describe('validation passes', () => {
    it('validation passes', async () => {
      expect(await target.transform(defaultTestObj, metadata)).toStrictEqual(
        defaultTestObj,
      );
    });
  });

  describe('validation fails', () => {
    it.only('invalid rate throws error', async () => {
      const testObj: RateRequestDto = {
        ...defaultTestObj,
        rate: { ...defaultTestObj.rate, energy: -1 },
      };
      let errorMessages;

      await target.transform(testObj, metadata).catch((err) => {
        errorMessages = err.getResponse().message;
      });

      expect(errorMessages).not.toBeNull();
      expect(errorMessages.length).not.toEqual(0);
    });

    it('invalid cdr throws error', async () => {
      const testObj: RateRequestDto = {
        ...defaultTestObj,
        cdr: { ...defaultTestObj.cdr, meterStart: -1 },
      };
      let errorMessages;

      await target.transform(testObj, metadata).catch((err) => {
        errorMessages = err.getResponse().message;
      });

      expect(errorMessages).not.toBeNull();
      expect(errorMessages.length).not.toEqual(0);
    });
  });
});
