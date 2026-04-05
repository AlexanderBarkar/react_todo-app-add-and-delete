import { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoLoader } from './components/TodoLoader';
import { ErrorNotification } from './components/ErrorNotification';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <input data-cy="NewTodoField" />

      <TodoLoader isLoading={isLoading} />

      <ErrorNotification
        error={error}
        onClose={() => setError(null)}
      />

      <TodoList todos={todos} />
    </div>
  );
};