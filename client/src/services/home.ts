import { request } from 'umi';

export async function queryRecommend(): Promise<any> {
  return request('/api/getRecommend');
}
