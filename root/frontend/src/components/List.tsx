import { TodoResponse, Todos } from "../interface";
import { todoState, loginState } from "../store/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import TodoItem from "./TodoItem";
import { useState } from "react";
import axios from "axios";

export default function List() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useRecoilState(todoState);
  const setLogin = useSetRecoilState(loginState);
  const getRandom = () =>
    [...Array(6)]
      .map(() => Math.floor(Math.random() * 36).toString(36))
      .join("");

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/v1/todos/add",
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
  };
  return (
    <div className="bg-white rounded min-h-96 h-fit min-w-80 p-5 flex flex-col items-center gap-5">
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
        className="w-full border flex justify-between text-xl p-2"
      >
        <input
          onChange={(e) => setInput(e.target.value)}
          required
          placeholder="Add your items"
        ></input>
        <button>+</button>
      </form>

      <div className="h-64 overflow-y-auto w-full px-4">
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
        onClick={() => {
          localStorage.clear();
          setLogin(false);
        }}
      >
        Signout
      </button>
    </div>
  );
}
