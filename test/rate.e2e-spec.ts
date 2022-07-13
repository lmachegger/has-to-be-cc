import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { RateRequestDto, RateResponseDto } from 'src/rate/dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/rate (POST)', () => {
    const requestBody: RateRequestDto = {
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
      .send(requestBody)
      .expect(200)
      .expect(expectedResponse);
  });
});
