import { TodoResponse, Todos, TodosResponse } from "../interface";
import { todoState, loginState } from "../store/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import TodoItem from "./TodoItem";
import {  useEffect, useState } from "react";
import axios from "axios";

export default function List() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useRecoilState(todoState);
  const setLogin = useSetRecoilState(loginState);
  const getRandom = () =>
    [...Array(6)]
      .map(() => Math.floor(Math.random() * 36).toString(36))
      .join("");

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
    
              setTodo(data.data as Todos[]);
              setLogin(true);
            }, (reject)=>{
              console.log(reject)
            });
        }
      }, []);

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    axios
      .post(
        "https://e2e-todo.onrender.com/api/v1/todos/add",
        {
          todo: input,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        const todoInfo = (res.data as TodoResponse).response;
        setTodo((prev) => {
          return [
            ...prev,
            { id: todoInfo.id, userId: todoInfo.userId, todo: input },
          ];
        });
      });
      setInput('')
    };
  return (
    <div className="bg-white rounded min-h-96 h-fit min-w-80 md:min-w-96 p-6 flex flex-col items-center gap-5">
      <div className="flex items-center text-center">
        <p className="text-3xl font-bold text-blue-950">Make-a-List</p>
      </div>
      <p className="text-lg">
        Hey{" "}
        <span className="font-medium">
          {localStorage.getItem("username") + ", "}
        </span>
        here's your list :-
      </p>
      <form
        onSubmit={handleClick}
        className="w-full border rounded border-black flex justify-between text-xl p-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value.trim())}
          required
          placeholder="Add your items"
          className="outline-none"
       ></input>
        <button>+</button>
      </form>

      <div className="h-44 overflow-y-auto w-full px-4">
        {todo.map((item, index) => {
          return (
            <TodoItem
              key={getRandom()}
              id={item.id}
              content={item.todo}
              index={index}
            />
          );
        })}
      </div>

      <button
        className="border-red-300 border p-2 rounded-lg hover:scale-110 hover:bg-red-500 hover:text-white transition-all ease-linear duration-100"
        onClick={() => {
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          setLogin(false);
        }}
      >
        Signout
      </button>
    </div>
  );
}
