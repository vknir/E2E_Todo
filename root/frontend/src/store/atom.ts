import { atom, atomFamily, selector, selectorFamily } from "recoil";
import axios from "axios";
import { Todos } from "../interface";

export const loadingState = atom({
  key: "loading state",
  default: false,
});

export const loginState =atom({
    key:'loginStateAtom',
    default:false
})

export const showSignUpState =atom({
  key:'showSignUpState',
  default:true
})

export const usernameState =atom({
  key:'usernameState',
  default:''
})

export const passwordState =atom({
  key:'passwordState',
  default:''
})

export const confirmPasswordState=atom({
  key:'confirmpasswordstate',
  default:''
})

export const errorState= atom({
  key:'errorState',
  default: {
    present:false,
    type:''
  }
})

export const todoState = atom({
  key:'todosState',
  default: [] as Todos[]
})

export const todoFamilyState = atomFamily({
  key: "todo item family state ",
  default: selectorFamily({
    key: "todoItemSelectorFamily",
    get: () => async () => {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem('username')
      const response = await axios.get(`http://localhost:3000/api/v1/todos/${username}`, {
        headers: {
          authorization: token,
        },
      });
      console.log(response)
      if(response)
          return response
    },
  }),
});


