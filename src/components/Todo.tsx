import { api, RouterOutputs } from '../utils/api';

type Todo = RouterOutputs["todo"]["getAll"][0]
type ToggleTodo = RouterOutputs["todo"]["toggle"]

interface TodoProps {
  todo: Todo,
  toggleTodo: ToggleTodo;
}

// export const Todo = (todo: TodoProps) => {

   

//   return (
//     <div className="flex gap-y-5 text-2xl">
//       <li
//         key={todo.id}
//         className={`${
//           todo.done ? "items-center line-through" : "items-center text-center"
//         }`}
//       >
//         {todo.title}
//       </li>
//       <input
//         type="checkbox"
//         checked={todo.done}
//         id={todo.id}
//         name="done"
//         className=""
//         onChange={(e) => {
//           toggleTodo.mutate({ id: todo.id, done: e.target.checked });
//         }}
//       />
//       <button
//         className="btn-warning btn"
//         onClick={() => deleteTodo.mutate({ id: todo.id })}
//       >
//         Delete
//       </button>
//     </div>
//   );
// }