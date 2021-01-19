import { request } from 'umi';

export interface LoginParams {
  name: string;
  password: string;
}

export async function fakeLogin(params: LoginParams): Promise<any> {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}
