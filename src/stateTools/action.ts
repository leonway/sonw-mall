import { Path } from './types'
interface Type {
  [propName:string]:string
}
const TYPE:Type = {
  CREATE: 'create',
  ASSIGN: 'assign',
  ADD: 'add',
  DEL: 'del',
  UPDATE: 'update',
};

const toStringPrefix = (typePrefix:never[]) => {
  return typePrefix.reduce((prefix, current, index) => {
    if (index === 0) {
      prefix += `${current}/`;
    } else {
      prefix += `${current}_`;
    }
    return prefix;
  }, '');
};

// typePrefix必须是数组，用于构造action type的前缀，确保type的唯一性
const createActionType = (typePrefix:never[]) => {
  const prefix = toStringPrefix(typePrefix);
  return Object.keys(TYPE).reduce((obj:Type, key) => {
    obj[key] = prefix + TYPE[key];
    return obj;
  }, {});
};

class Action {

  TYPE:Type
  prefix:string
  PARENT?:{}

  constructor(typePrefix:never[], hasParent = true) {
    this.TYPE = createActionType(typePrefix);
    this.prefix = toStringPrefix(typePrefix);
    if (hasParent) {
      this.PARENT = createActionType(typePrefix.slice(0, -1));
    }
  }

  static createActionType = createActionType;

  create(type:string, payload:any, path:Path, index:never[]) {
    return { type: this.prefix + type, payload, path, index };
  }
  
}

export { Action };
