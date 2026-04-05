import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getTodos, deleteTodo } from './api/todos';

type Todo = {
  id: number;
  title: string;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError('Unable to load todos'));
  }, []);

  const handleDelete = async (id: number) => {
    setLoadingIds(prev => [...prev, id]);

    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch {
      setError('Unable to delete a todo');
    } finally {
      setLoadingIds(prev => prev.filter(todoId => todoId !== id));
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">Todo App</h1>

      {todos.map(todo => {
        const isLoading = loadingIds.includes(todo.id);

        return (
          <div key={todo.id} data-cy="Todo" className="todo">
            <span data-cy="TodoTitle">{todo.title}</span>

            {/* 🔥 Loader как у ментора */}
            <div
              data-cy="TodoLoader"
              className={classNames('modal', 'overlay', {
                'is-active': isLoading,
              })}
            >
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>

            <button
              data-cy="TodoDelete"
              onClick={() => handleDelete(todo.id)}
            >
              ×
            </button>
          </div>
        );
      })}

      {error && (
        <div data-cy="ErrorNotification">
          {error}
        </div>
      )}
    </div>
  );
};