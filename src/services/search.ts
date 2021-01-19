import { request } from 'umi';

export async function query(params: {
  pageNo: number;
  pageSize: number;
  searchKey?: string;
}) {
  return request('/api/search', {
    method: 'POST',
    data: params,
  });
}
