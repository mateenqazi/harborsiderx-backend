import { AxiosInstance } from 'axios';
import { initTestServer } from './util/setup';
import { cleanupServer } from './util/cleanup';

let axiosClient: AxiosInstance;

beforeAll(async () => {
  axiosClient = await initTestServer();
});

afterAll(async () => {
  await cleanupServer();
});

describe('/', () => {
  describe('GET', () => {
    test('When request sent to base URL, then should respond with 404', async () => {
      const { status } = await axiosClient.get('/');

      expect(status).toBe(404);
    });
  });
});
