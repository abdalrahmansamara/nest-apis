/* eslint-disable @typescript-eslint/no-unsafe-assignment, new-cap, sonarjs/new-cap, sonarjs/no-hardcoded-credentials */
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { Express } from 'express';
import supertest from 'supertest';

import { middleware } from '../../src/app.middleware';
import { AppModule } from '../../src/app.module';

// jest.mock('@nestjs/typeorm', () => {
//   const originalModule = jest.requireActual('@nestjs/typeorm');

//   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//   return {
//     ...originalModule, // Keep the original module methods intact
//     TypeOrmModule: {
//       forRoot: jest.fn().mockReturnValue({}), // Mock forRoot method
//       forRootAsync: jest.fn().mockReturnValue({}),
//       forFeature: jest.fn().mockReturnValue({}), // Mock forFeature method
//     },
//     getRepositoryToken: jest.fn().mockReturnValue('mockedRepositoryToken'),
//   };
// });

let app: INestApplication<Express> | undefined;
let request: supertest.Agent;

beforeAll(async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleRef.createNestApplication();
  // https://docs.nestjs.com/fundamentals/lifecycle-events
  // Error: passport.initialize() middleware not in use
  middleware(app);
  await app.init();

  // https://github.com/visionmedia/supertest/issues/46#issuecomment-58534736
  request = new supertest.agent(app.getHttpServer());
});

test('POST: /login', async () => {
  const { status, body } = await request.post('/login').send({ username: 'user', password: 'crypto' });

  expect([200, 201]).toContain(status);
  expect(body).toHaveProperty('username', 'user');
});

test('GET: /check', async () => {
  const { body } = await request.get('/check').expect(200);

  expect(body).toHaveProperty('userId', 'd6d3b4ba-f89f-4bef-bfb1-64e1177794b1');
});

test('GET: /logout', async () => {
  await request.get('/logout').expect(302);
  await request.get('/check').expect(403);
});

afterAll(async () => {
  await app?.close();
});
