import { Effect } from 'umi';
import dvaModelExtend from 'dva-model-extend';
import baseModel from '@/stateTools/baseModel';
import { queryCurrent, queryDetail } from '@/services/user';
import { fakeLogin } from '@/services/login';
import { Toast } from 'antd-mobile';

interface CurrentUser {
  name?: string;
  icon?: string;
  userid?: string;
}

interface DetailUser {
  name: string;
  icon: string;
  userid: string;
  email: string;
  phone: string;
  address: string;
  signature?: string;
  title?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  country: string;
}

export interface UserModelState {
  currentUser: CurrentUser;
  detail: DetailUser | { name: string; icon: string };
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    [propName: string]: Effect;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {},
    detail: {
      name: '',
      icon: '',
    },
  },
  effects: {
    *fetchCurrent(_, { call, put }) {
      const res = yield call(queryCurrent);

      yield put({ type: 'assign', payload: res, path: 'currentUser' });
    },
    *login({ payload }, { call, put }) {
      const res = yield call(fakeLogin, payload);
      if (res.status === 1) {
        yield put({ type: 'assign', payload: res, path: 'currentUser' });
      } else {
        Toast.fail(res.msg || '系统开小差，请稍后再试~');
      }
    },
    *queryDetail(_, { call, put }) {
      const res = yield call(queryDetail);

      yield put({ type: 'assign', payload: res, path: 'detail' });
    },
    *logout(_, { put }) {
      yield put({
        type: 'assign',
        payload: {
          currentUser: {},
          detail: { name: '', icon: '' },
        },
      });
    },
  },
};

export default dvaModelExtend(baseModel, UserModel);
