import { api, type RouterOutputs } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Todo = RouterOutputs["todo"]["getAll"][0];

const TodoList = () => {
  const { data: sessionData } = useSession();

  const [newTodo, setNewTodo] = useState<string | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string | null>(null);

  const [updatedTodo, setUpdatedTodo] = useState<string | null>(null);

  const { data: todos, refetch: refetchTodos } = api.todo.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  const createTodo = api.todo.create.useMutation({
    onSuccess: () => {
      void refetchTodos();
    },
  });

  const toggleTodo = api.todo.toggle.useMutation({
    onSuccess: ({ id, done }) => {
      done;
      refetchTodos();
    },
  });

  const deleteTodo = api.todo.delete.useMutation({
    onSuccess: ({ id }) => {
      void refetchTodos();
    },
  });

  const editToggle = api.todo.toggleEdit.useMutation({
    onSuccess: ({ id, editing }) => {
      editing;
      refetchTodos();
    },
  });

  const updateTitle = api.todo.edit.useMutation({
    onSuccess: ({ id }) => {
      void refetchTodos();
    },
  });

  return (
    <div>
      <div className="mt-12 flex items-center justify-center gap-x-5">
        <input
          type="text"
          className="input-bordered input "
          placeholder="Create new todo"
          onChange={(e) => setNewTodo(e.currentTarget.value)}
          value={newTodo ?? ""}
        />
        <button
          className="btn-primary btn"
          onClick={(e) => {
            createTodo.mutate({
              title: newTodo ?? "",
            });
            setNewTodo("");
          }}
          disabled={
            newTodo?.trim() === "" || newTodo === null || newTodo === undefined
          }
        >
          Add New Todo
        </button>
      </div>
      <div className="mt-12 flex items-center justify-center">
        <ul className="flex flex-col gap-y-5">
          {todos?.map((todo: Todo) => {
            return (
              <div className="flex gap-y-5 text-2xl">
                <li
                  key={todo.id}
                  className={`${
                    todo.done
                      ? "items-center line-through"
                      : "items-center text-center"
                  }`}
                >
                  {todo.editing ? (
                    <input
                      type="text"
                      placeholder={todo.title}
                      className="input-bordered input"
                      onChange={(e) => setUpdatedTitle(e.currentTarget.value)}
                      value={updatedTitle ?? ""}
                    />
                  ) : (
                    todo.title
                  )}
                </li>
                <input
                  type="checkbox"
                  checked={todo.done}
                  id={todo.id}
                  name="done"
                  className=""
                  onChange={(e) => {
                    toggleTodo.mutate({ id: todo.id, done: e.target.checked });
                  }}
                />
                <button
                  className="btn-warning btn"
                  onClick={() => deleteTodo.mutate({ id: todo.id })}
                >
                  Delete
                </button>
                <button
                  className="btn-accent btn"
                  onClick={() => {
                    editToggle.mutate({
                      id: todo.id,
                      editing: !todo.editing,
                    });
                    todo.editing &&
                      updateTitle.mutate({
                        id: todo.id,
                        title: updatedTitle ?? "",
                      });
                    setUpdatedTitle("");
                  }}
                >
                  {todo.editing ? "Save" : "Edit"}
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
