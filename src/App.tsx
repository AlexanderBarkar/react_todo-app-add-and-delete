import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { getTodos, createTodo, deleteTodo } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // ✅ ПЕРЕНЕСЛИ СЮДА
  const loadTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
      setError(null);
    } catch {
      setError('Unable to load todos');
    }
  };

  useEffect(() => {
    loadTodos();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = title.trim();

    if (!trimmed) {
      setError('Title should not be empty');
      return;
    }

    const newTempTodo: Todo = {
      id: 0,
      title: trimmed,
      completed: false,
    };

    setTempTodo(newTempTodo);
    setIsAdding(true);

    try {
      const created = await createTodo(trimmed);
      setTodos(prev => [...prev, created]);
      setTitle('');
      setError(null);
    } catch {
      setError('Unable to add a todo');
    } finally {
      setTempTodo(null);
      setIsAdding(false);
      inputRef.current?.focus();
    }
  };

  const handleDelete = async (id: number) => {
    setLoadingIds(prev => [...prev, id]);

    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null);
    } catch {
      setError('Unable to delete a todo');
    } finally {
      setLoadingIds(prev => prev.filter(todoId => todoId !== id));
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={isAdding}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {todos.map(todo => {
            const isLoading = loadingIds.includes(todo.id);

            return (
              <div
                key={todo.id}
                data-cy="Todo"
                className={classNames('todo', {
                  completed: todo.completed,
                })}
              >
                <span data-cy="TodoTitle">{todo.title}</span>

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
                  type="button"
                  data-cy="TodoDelete"
                  onClick={() => handleDelete(todo.id)}
                >
                  ×
                </button>
              </div>
            );
          })}

          {tempTodo && (
            <div data-cy="Todo" className="todo">
              <span data-cy="TodoTitle">{tempTodo.title}</span>

              <div
                data-cy="TodoLoader"
                className={classNames('modal', 'overlay', {
                  'is-active': true,
                })}
              >
                <div className="modal-background has-background-white-ter" />
                <div className="loader" />
              </div>
            </div>
          )}
        </section>
      </div>

      <ErrorNotification
        error={error}
        onClose={() => setError(null)}
      />
    </div>
  );
};