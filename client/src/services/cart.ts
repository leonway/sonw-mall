import { request } from 'umi';

export async function query(): Promise<any> {
  return request('/api/getCart');
}
