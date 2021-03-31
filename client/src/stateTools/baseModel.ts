import { Reduces } from './types'
import { deepAssignObj } from './helper';
import { addArrayItem, delArrayItem, updateArray } from '@/stateTools/array';
// 以下四个为常用的四个状态修改工具方法 使用说明查看 deepAssignObj addArrayItem delArrayItem updateArray注释
const reducers:Reduces = {
  assign:(state, { path, payload })=>{
    return deepAssignObj(state, payload, path);
  },
  add(state, action){
    return addArrayItem(state, action);
  },
  del(state, action){
    return delArrayItem(state, action);
  },
  update(state, action) {
    return updateArray(state, action);
  },
}
export default {
  reducers
};
