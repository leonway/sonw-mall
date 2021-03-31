import { request } from 'umi';

export async function getDefaultReceivingInfo(): Promise<any> {
  return request('/api/getDefaultReceivingInfo');
}
