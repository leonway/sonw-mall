import { Index, Path,ArrayAction } from './types'
import { getPathValue, deepAssignValue } from './helper';

const addItem = ([...arr], index:number, item:any) => {
  if (typeof index !== 'number' || index >= arr.length) {
    arr.push(item);
  } else {
    arr.splice(index, 0, item);
  }
  return arr;
};

// index可以为整数或对象，为对象时index必须含有key和value个属性
const delItem = (arr:never[], index:Index) => {
  if (typeof index !== 'object') {
    return arr.filter((item, i) => i !== index);
  }
  const { key, value } = index;
  return arr.filter(item => item[key] !== value);
};

// index可以为整数或对象，为对象时index必须含有key和value个属性
const updateOne = ([...arr], index:Index, item:any) => {
  if (typeof index === 'object') {
    const { key, value } = index;
    index = arr.findIndex(obj => obj[key] === value);
  } else if (typeof index !== 'number' || index >= arr.length) {
    index = arr.length - 1;
  }
  if (index !== -1) {
    arr[index] = Object.assign({}, arr[index], item);
  }
  return arr;
};

const updateAll = (arr:never[], index:Index, payload:any) => {
  return arr.map(item => Object.assign({}, item, payload));
};
interface AnyObj {
  [propName:string]:any,
}
const assignArray = (state:AnyObj, { path, index, payload }:ArrayAction, callback:Function) => {
  if (path) {
    const value = callback(getPathValue(state, path), index, payload);
    return deepAssignValue(state, value, path);
  } else {
    return state;
  }
};

const addArrayItem = (state:AnyObj, action:ArrayAction) => {
  return assignArray(state, action, addItem);
};

const delArrayItem = (state:AnyObj, action:ArrayAction) => {
  return assignArray(state, action, delItem);
};

const updateArray = (state:AnyObj, action:ArrayAction) => {
  if (action.index === -1) {
    return assignArray(state, action, updateAll);
  } else {
    return assignArray(state, action, updateOne);
  }
};

export { addArrayItem, delArrayItem, updateArray };
