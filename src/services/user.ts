import { request } from 'umi';

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryDetail(): Promise<any> {
  return request('/api/getUserDetail');
}
