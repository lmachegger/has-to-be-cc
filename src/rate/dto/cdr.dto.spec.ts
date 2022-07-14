import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { CdrDto } from './cdr.dto';

describe('CdrDto validation', () => {
  let target: ValidationPipe;

  const metadata: ArgumentMetadata = {
    type: 'body',
    metatype: CdrDto,
    data: '',
  };

  const defaultTestObj: CdrDto = {
    meterStart: 0,
    timestampStart: '2021-04-05T10:04:00Z',
    meterStop: 200,
    timestampStop: '2021-04-05T11:04:00Z',
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
    it('meterStart < 0 throws error', async () => {
      const testObj: CdrDto = { ...defaultTestObj, meterStart: -1 };
      const expectedErrorMessage = 'meterStart must not be less than 0';
      let errorMessages;

      await target.transform(testObj, metadata).catch((err) => {
        errorMessages = err.getResponse().message;
      });

      expect(errorMessages).toContain(expectedErrorMessage);
    });

    it('meterStop < 0 throws error', async () => {
      const testObj: CdrDto = { ...defaultTestObj, meterStop: -1 };
      const expectedErrorMessage = 'meterStop must not be less than 0';
      let errorMessages;

      await target.transform(testObj, metadata).catch((err) => {
        errorMessages = err.getResponse().message;
      });

      expect(errorMessages).toContain(expectedErrorMessage);
    });

    it('meterStart > meterStop throws error', async () => {
      const testObj: CdrDto = {
        ...defaultTestObj,
        meterStart: 2,
        meterStop: 1,
      };
      const expectedErrorMessage =
        'meterStop must be greater or equal than meterStart';
      let errorMessages;

      await target.transform(testObj, metadata).catch((err) => {
        errorMessages = err.getResponse().message;
      });

      expect(errorMessages).toContain(expectedErrorMessage);
    });

    it('timestampStart as invalid date throws error', async () => {
      const testObj: CdrDto = {
        ...defaultTestObj,
        timestampStart: 'invalid date',
      };
      const expectedErrorMessage =
        'timestampStart must be a valid ISO 8601 date string';
      let errorMessages;

      await target.transform(testObj, metadata).catch((err) => {
        errorMessages = err.getResponse().message;
      });

      expect(errorMessages).toContain(expectedErrorMessage);
    });

    it('timestampStop as invalid date throws error', async () => {
      const testObj: CdrDto = {
        ...defaultTestObj,
        timestampStop: 'invalid date',
      };
      const expectedErrorMessage =
        'timestampStop must be a valid ISO 8601 date string';
      let errorMessages;

      await target.transform(testObj, metadata).catch((err) => {
        errorMessages = err.getResponse().message;
      });

      expect(errorMessages).toContain(expectedErrorMessage);
    });

    it('timestampStop > timestampStart throws error', async () => {
      const testObj: CdrDto = {
        ...defaultTestObj,
        timestampStart: '2021-04-05T11:05:00Z',
      };
      const expectedErrorMessage =
        'timestampStop must be greater or equal than timestampStart';
      let errorMessages;

      await target.transform(testObj, metadata).catch((err) => {
        errorMessages = err.getResponse().message;
      });

      expect(errorMessages).toContain(expectedErrorMessage);
    });
  });
});
