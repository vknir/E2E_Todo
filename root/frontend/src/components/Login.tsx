import Input from "./Input";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  usernameState,
  passwordState,
  errorState,
  loginState,
  todoState,
  loadingState,
} from "../store/atom";
import { Todos, TodosResponse, Token } from "../interface";
import axios from "axios";
import { useEffect } from "react";
import Loading from "./Loading";

export default function Login() {
  const username = useRecoilValue(usernameState);
  const password = useRecoilValue(passwordState);
  const setError = useSetRecoilState(errorState);
  const setLogin = useSetRecoilState(loginState);
  const setTodos = useSetRecoilState(todoState);
  const [loading, setLoading] = useRecoilState(loadingState);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("username")) {
      const username = localStorage.getItem("username");
      setLoading(true);
      axios
        .get(`https://e2e-todo.onrender.com/api/v1/todos/${username}`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        })
        .then(
          (response) => {
            const data = response.data as TodosResponse;

            setTodos(data.data as Todos[]);
            setLogin(true);
          },
          (reject) => {
            console.log(reject);
          }
        );
      setLogin(false);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    localStorage.setItem("username", username);

    setLoading(true);
    axios
      .post(`https://e2e-todo.onrender.com/api/v1/auth/login`, {
        username: username,
        password: password,
      })
      .then((response) => {
        const result: Token = response.data as Token;
        if (result.token) {
          localStorage.setItem("token", result.token);

          setLogin(true);
        } else {
          setError({
            present: true,
            type: "Unable to login please try again!",
          });
        }
        setLoading(false);
      });
    
  };

  return (
    <div className="mt-5 w-full px-7">
      {
        loading ? <Loading/>:
        <>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">
            <Input type="text" />
            <Input type="password" />
            <button
              className="border transition-all duration-100 p-2 rounded shadow-md focus:shadow-none "
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="text-center text-sm mt-5">
            <p>Don't hane an account?</p>
            <p>Signup to continue</p>
          </div>
        </>
      }
    </div>
  );
}
