export type Path = string|any[]|undefined

export interface ObjAction {
  type?:string,
  payload?:any,
  path?:Path
}

export interface ArrayAction {
  type?:string,
  payload?:any,
  path?:Path,
  index?:string|string[]|number
}
export type Reducer = (state:any,action:ObjAction) => {} 

export interface Reduces {
  [propName:string]:Reducer
}

export type Index = number|{key:string,value:any}
