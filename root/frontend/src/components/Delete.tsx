import { todoState } from "../store/atom";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { Todos } from "../interface";

export default function Delete({ id }: { id: number }) {
  const setTodo = useSetRecoilState(todoState);
  const handleClick = () => {
    setTodo((prev) => {
      const indexDelete = prev.findIndex((element) => {
        return element.id === id;
      });

      let ans = prev.filter((element, index) => {
        return index != indexDelete;
      });

      axios.delete(`https://e2e-todo.onrender.com/api/v1/todos/delete/${id}`, {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      });

      return ans;
    });
   
  };

  return (
    <div onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 hover:text-red-500 hover:scale-110 hover:cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  );
}
