import { TodoContent } from "../interface";
import Delete from "./Delete";

export default function TodoItem({ content, index, id }: TodoContent) {
  return (
    <div className="flex justify-between w-full my-2">
      <div>
        <p>
          {index + 1 + "."} <span className="text-lg ml-1">{content}</span>
        </p>
      </div>
      <Delete id={id}/>
    </div>
  );
}
