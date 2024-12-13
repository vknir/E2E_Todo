import Input from "./Input";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  usernameState,
  passwordState,
  errorState,
  loginState,
  loadingState
} from "../store/atom";
import { Token } from "../interface";
import axios from "axios";

export default function Login() {
  const username = useRecoilValue(usernameState);
  const password = useRecoilValue(passwordState);
  const setError = useSetRecoilState(errorState);
  const setLogin = useSetRecoilState(loginState);
  const setLoading = useSetRecoilState(loadingState)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem('username', username)
    axios
      .post(`http://localhost:3000/api/v1/auth/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        const result: Token = response.data as Token;
        if (result.token ) {
          localStorage.setItem("token", result.token);
          
          setLogin(true)
        } else {
          setError({
            present: true,
            type: "Unable to login please try again!",
          });
        }
      });
     
    };
    
  return (
    <div className="mt-5 w-full px-7">
      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
        <Input type="text" />
        <Input type="password" />
        <button type="submit">Login</button>
      </form>
      <div className="text-center text-sm mt-5">
        <p>Don't hane an account?</p>
        <p>Signup to continue</p>
      </div>
    </div>
  );
}
