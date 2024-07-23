import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

export interface FetchRepository {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
}

export class AxiosFetchRepository implements FetchRepository {
  private axiosInstance = axios.create();

  private async retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        console.warn(`Retrying request... attempts left: ${retries}`);
        await new Promise(res => setTimeout(res, delay));
        return this.retry(fn, retries - 1, delay);
      } else {
        throw error;
      }
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.retry(async () => {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
      return response.data;
    });
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.retry(async () => {
      const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
      return response.data;
    });
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.retry(async () => {
      const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
      return response.data;
    });
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.retry(async () => {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
      return response.data;
    });
  }
}
