import { getDvaApp } from 'umi';
// import { login, reload, getResource } from '@/services/login';
// import { showError, showSuccess } from '@/utils/common';
// import { message, notification } from 'antd';
// import { getQueryVariable } from '@/utils/utils';
// import {
//   getMenuData,
//   getLocalData,
//   setLocalData,
//   removeAllAuths,
// } from '@/utils/authority';
import requestUtil from '@/utils/request';
// import qs from 'qs';
// import { IsPC } from '@/utils/utils';

// // 项目初始化配置
export async function getInitialState() {
  setTimeout(() => {
    const dva = getDvaApp();
    console.log(dva);
  }, 0);
  return {};
}

// 请求接口配置
export const request = requestUtil;
