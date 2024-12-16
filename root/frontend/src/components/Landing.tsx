import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, todoState, loadingState } from "../store/atom";
import Auth from "./Auth";
import List from "./List";
import Loading from "./Loading";
import { useEffect } from "react";
import axios from "axios";
import { Todos, TodosResponse } from "../interface";

export default function Landing() {
  const [login, setLogin] = useRecoilState(loginState);
  const setTodos = useSetRecoilState(todoState);
  const [loading] = useRecoilState(loadingState);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("username")) {
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
          setLogin(true);
        }, (reject)=>{
          console.log(reject)
        });
    }
  }, []);
  return (
    <div
      className="min-h-screen h-fit w-screen flex justify-center items-start p-10 
    bg-gradient-to-br from-indigo-800 from-5%  to-pink-800 to-100% font-sans
    animate-moving-gradient [background-size:300%]"
    >
      {
        loading ? <Loading/>:
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
      }
    </div>
  );
}
