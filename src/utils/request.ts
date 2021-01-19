import { notification, message } from 'antd';
import { ResponseError } from 'umi-request';
import { RequestInterceptor,RequestOptionsInit,OnionMiddleware } from 'umi-request/types'
import { history, RequestConfig } from 'umi';

interface codeMessage {
  [propName:number]:string
}

const codeMessage:codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理
 * @param error 响应异常
 */

export const errorHandler = (error:ResponseError) => {
  const { response, type, message } = error;
  // console.log(type);
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (type && type === 'Timeout') {
    notification.error({
      description: message,
      message: '请求超时！',
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};

/**
 * request拦截器, 改变url 或 options.
 * { 
 *  headers: { 
 * 'Content-Type': 'application/json;charset=UTF-8','Access-Token': sessionStorage.getItem('TOKEN') 
 *  } 
 * }
 */
export const requestInterceptors :RequestInterceptor []= [
   (url:string, options:RequestOptionsInit)=> {
    // 没有http加上前缀
    // console.log(url);
    if (url.indexOf('/apihttp') !== -1) {
      url = url.slice(4);
    }
    const realOptions = {
      ...options,
      headers:{
        ...options.headers,
        'Access-Token': sessionStorage.getItem('TOKEN') as string
      }
    }
    // console.log('-----url------');
    // console.log(url);
    // console.log('-----options------');
    // console.log(realOptions);
    
    return {
      url,
      options:realOptions,
    };
  },
];

/**
 * 中间件 
 * 主要是增加了请求头的token
 */
export const middlewares:OnionMiddleware[]= [
  // async (ctx, next) => {
  //   console.log('------before ctx, next--------');
  //   console.log(ctx, next);
  //   await next();
  //   // console.log('------after ctx, next--------');
  //   // console.log(ctx, next);
  // },
]

// 提前对响应做异常处理
export const responseInterceptors = [
  async (response:Response) => {
    // console.log(useLocation(),'useLocation')
    // console.log('---request url---');
    // console.log(url);
    // console.log('---response---');
    // console.log(response);
    try {
      const contentType = response.headers.get('Content-Type');
      // console.log(contentType,response);
      if (contentType && contentType.match(/application\/json/i)) {
        // All data is saved as text
        const data = await response.clone().json();
        console.log('--data--');
        console.log(data);
        if (data.code >= 400) {
          // console.log(data);
          message.error(data.message);
          if (data.code === 401) {
            // removeAllAuths();
            setTimeout(() => {
              history.replace('/initPage');
            }, 1000);
          }
        }
      } 
      //如果响应是excl 则返回 blob
      // else if (
      //   contentType &&
      //   contentType.includes(
      //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      //   )
      // ) {
      //   return response.blob();
      // }
    } catch (e) {
      console.log('error', e);
    }
    return response;
  },
];

const request:RequestConfig = {
  prefix: '',
  timeout: 5000,
  // credentials: 'no-cors',
  errorHandler,
  errorConfig: {
    errorPage: '/exception/404',
  },
  middlewares,
  requestInterceptors,
  responseInterceptors,
}

export default request
