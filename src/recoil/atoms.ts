import { atom } from "recoil";

interface List {
  key(key: any): unknown;
  id : string, 
  text : string ,
  completed : boolean
}

export const ListAtom = atom<List[]>({
    key:'ListAtom',
    default:[],
})