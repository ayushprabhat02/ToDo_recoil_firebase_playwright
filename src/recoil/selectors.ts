import { selector } from "recoil";
import { ListAtom } from "./atoms";

export const taskCompletedSelector = selector({
    key:'taskCompletedSelector',
    get : ({get})=>{
       const list =  get(ListAtom)
       const finalList =  list.filter(item => item.completed)
       return finalList 
    }
})

export const taskPendingSelector = selector({
    key:'taskPendingSelector',
    get : ({get})=>{
       const list =  get(ListAtom)
       const finalList =  list.filter(item => !item.completed)
       return finalList 
    }
})

