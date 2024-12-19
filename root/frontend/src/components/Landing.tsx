import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, todoState, loadingState } from "../store/atom";
import Auth from "./Auth";
import List from "./List";
import { useEffect } from "react";
import axios from "axios";
import { Todos, TodosResponse } from "../interface";

export default function Landing() {
  const [login, setLogin] = useRecoilState(loginState);
  const setTodos = useSetRecoilState(todoState);
  const [, setLoading] = useRecoilState(loadingState);

  useEffect(() => {
    
    if (localStorage.getItem("token") && localStorage.getItem("username")) {
      setLoading(true);
      const username = localStorage.getItem("username");
      axios
        .get(`https://e2e-todo.onrender.com/api/v1/todos/${username}`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          const data = response.data as TodosResponse;

          setTodos(data.data as Todos[]);
          setLoading(false);
          setLogin(true);
        });
    }
  }, []);
  return (
    <div
      className="min-h-screen h-fit w-screen flex justify-center items-start pt-20 sm:pt-10 
    bg-gradient-to-br from-indigo-800 from-5%  to-pink-800 to-100% font-sans
    animate-moving-gradient [background-size:300%]"
    >
      <div className="z-10">
        {login ? (
          <>
            <List />
          </>
        ) : (
          <>
            <Auth />
          </>
        )}
      </div>
    </div>
  );
}
