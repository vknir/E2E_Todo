
import Input from "./Input";
import {
  errorState,
  usernameState,
  passwordState,
  loginState,

} from "../store/atom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { Token } from "../interface";


export default function Signup() {
  const username = useRecoilValue(usernameState);
  const password = useRecoilValue(passwordState);
  const setError = useSetRecoilState(errorState);
  const setLogin = useSetRecoilState(loginState);
 

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem('username', username)
    
    axios
      .post("https://e2e-todo.onrender.com/api/v1/auth/signup", {
        username: username,
        password: password,
      })
      .then((response) => {
        const result = response.data as Token;
        if (result.token) {
          localStorage.setItem("token", result.token);
          setLogin(true);
        } else {
          setError({ present: true, type: "Unable to login" });
        }
  
      });
   
  };

  return (
    <div className="mt-5 w-full px-7">
      <>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-8 md:gap-5">
          <Input type="text" />
          <Input type="password" extraInput={true} />
          <button className="border transition-all duration-100 p-2 rounded shadow-md focus:shadow-none" type="submit">Sign up</button>
        </form>
        <div className="text-center text-sm mt-5">
          <p>Already have an account?</p>
          <p>Login to continue</p>
        </div>
      </>
    </div>
  );
}
