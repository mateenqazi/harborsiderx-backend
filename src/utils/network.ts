import axios, { AxiosRequestHeaders } from 'axios';
import http from 'http';

export class Network {
  baseUrl = '';
  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  public async get(path: string, headers?: AxiosRequestHeaders, options?: any) {
    const response = await axios.get(this.baseUrl + path, {
      headers,
      httpAgent: new http.Agent({ keepAlive: true }),
      ...options,
    });

    return response;
  }
}
