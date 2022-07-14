import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { RateDto } from './rate.dto';

describe('CdrDto validation', () => {
  let target: ValidationPipe;

  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: RateDto,
    data: '',
  };

  const defaultTestObj: RateDto = {
    energy: 1,
    time: 2,
    transaction: 3,
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
    it('energy < 0 throws error', async () => {
      const testObj: RateDto = { ...defaultTestObj, energy: -1 };
      const expectedErrorMessage = 'energy must not be less than 0';
      let errorMessages;

      await target.transform(testObj, metadata).catch((err) => {
        errorMessages = err.getResponse().message;
      });

      expect(errorMessages).toContain(expectedErrorMessage);
    });

    it('time < 0 throws error', async () => {
      const testObj: RateDto = { ...defaultTestObj, time: -1 };
      const expectedErrorMessage = 'time must not be less than 0';
      let errorMessages;

      await target.transform(testObj, metadata).catch((err) => {
        errorMessages = err.getResponse().message;
      });

      expect(errorMessages).toContain(expectedErrorMessage);
    });

    it('transaction < 0 throws error', async () => {
      const testObj: RateDto = { ...defaultTestObj, transaction: -1 };
      const expectedErrorMessage = 'transaction must not be less than 0';
      let errorMessages;

      await target.transform(testObj, metadata).catch((err) => {
        errorMessages = err.getResponse().message;
      });

      expect(errorMessages).toContain(expectedErrorMessage);
    });
  });
});
