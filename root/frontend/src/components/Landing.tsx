import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, todoState } from "../store/atom";
import Auth from "./Auth";
import List from "./List";
import { useEffect } from "react";
import axios from "axios";
import { Todos , TodosResponse} from "../interface";

export default function Landing() {
  const [login, setLogin] = useRecoilState(loginState);
  const setTodos = useSetRecoilState(todoState);

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("username")) {
      const username = localStorage.getItem("username");
      axios
        .get(`http://localhost:3000/api/v1/todos/${username}`, {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          const data  = (response.data) as TodosResponse
          console.log(data)
          setTodos(data.data as Todos [])
          setLogin(true);
        });
    }
  }, []);
  return (
    <div className="h-screen w-screen flex justify-center items-start p-14 bg-gradient-to-br from-indigo-800 from-5%  to-pink-800 to-100% font-sans">
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
  );
}
