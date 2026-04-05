import React, { useEffect, useRef, useState } from 'react';
import { getTodos, createTodo, deleteTodo } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const loadTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
      setError(null); // ✅ очищаем ошибку
    } catch {
      setError('Unable to load todos');
    }
  };

  useEffect(() => {
    loadTodos();
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = title.trim();

    if (!trimmed) {
      setError('Title should not be empty');
      return;
    }

    try {
      setIsAdding(true);

      const newTodo = await createTodo(trimmed);

      setTodos(prev => [...prev, newTodo]);
      setTitle('');
      setError(null); // ✅ очищаем ошибку
    } catch {
      setError('Unable to add a todo');
    } finally {
      setIsAdding(false);
      inputRef.current?.focus();
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);

      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null); // ✅ очищаем ошибку
    } catch {
      setError('Unable to delete a todo');
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

        {/* ✅ ВСЕГДА РЕНДЕРИМ СЕКЦИЮ */}
        <section className="todoapp__main" data-cy="TodoList">
          {todos.map(todo => (
            <div key={todo.id} data-cy="Todo">
              <span data-cy="TodoTitle">{todo.title}</span>

              <button
                type="button"
                data-cy="TodoDelete"
                onClick={() => handleDelete(todo.id)}
              >
                ×
              </button>
            </div>
          ))}
        </section>
      </div>

      <ErrorNotification
        error={error}
        onClose={() => setError(null)}
      />
    </div>
  );
};