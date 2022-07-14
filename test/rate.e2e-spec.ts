import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { RateRequestDto, RateResponseDto } from 'src/rate/dto';
import { AppModule } from './../src/app.module';
import { RateService } from '../src/rate/rate.service';

describe('RateController (e2e)', () => {
  let app: INestApplication;

  const defaultRequestBody: RateRequestDto = {
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

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/rate (POST)', () => {
    it('applies rates correctly', () => {
      const expectedResponse: RateResponseDto = {
        overall: 7.04,
        components: {
          energy: 3.277,
          time: 2.767,
          transaction: 1,
        },
      };

      return request(app.getHttpServer())
        .post('/rate')
        .send(defaultRequestBody)
        .expect(200)
        .expect(expectedResponse);
    });

    it('Request body validation works', () => {
      const invalidRequestBody: RateRequestDto = {
        ...defaultRequestBody,
        cdr: { ...defaultRequestBody.cdr, meterStart: -1 },
      };

      const expectedResponse = {
        statusCode: 400,
        message: ['cdr.meterStart must not be less than 0'],
        error: 'Bad Request',
      };

      return request(app.getHttpServer())
        .post('/rate')
        .send(invalidRequestBody)
        .expect(400)
        .expect(expectedResponse);
    });
  });
});
