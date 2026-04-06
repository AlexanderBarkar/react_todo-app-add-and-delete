export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
        setError(null);
      })
      .catch(() => setError('Unable to load todos'));
  }, []);
  useEffect(() => {
    if (!tempTodo) {
      inputRef.current?.focus();
    }
  }, [tempTodo]);
  useEffect(() => {
    if (!error) {
      return;
    }
    const timer = setTimeout(() => setError(null), 3000);
    return () => clearTimeout(timer);
  }, [error]);
  const submitTodo = (trimmedTitle: string) => {
    window.setTimeout(() => {
      createTodo(trimmedTitle)
        .then(created => {
          setTodos(prev => [...prev, created]);
          setTitle('');
        })
        .catch(() => setError('Unable to add a todo'))
        .finally(() => {
          setTempTodo(null);
          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
        });
    }, 0);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Title should not be empty');
      inputRef.current?.focus();
      return;
    }
    const temp: Todo = {
      id: 0,
      title: trimmed,
      completed: false,
    };
    setTempTodo(temp);
    submitTodo(trimmed);
  };
  const handleDelete = async (id: number) => {
    setLoadingIds(prev => [...prev, id]);
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch {
      setError('Unable to delete a todo');
    } finally {
      setLoadingIds(prev => prev.filter(todoId => todoId !== id));
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };
  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }
    if (filter === 'completed') {
      return todo.completed;
    }
    return true;
  });
  const hasCompleted = todos.some(todo => todo.completed);
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          <form onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={!!tempTodo}
            />
          </form>
        </header>
        <section className="todoapp__main" data-cy="TodoList">
          <TodoList
            todos={visibleTodos}
            loadingIds={loadingIds}
            tempTodo={tempTodo}
            onDelete={handleDelete}
          />
        </section>
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todo => !todo.completed).length} items left
            </span>
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('all')}
              >
                All
              </a>
              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('active')}
              >
                Active
              </a>
              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={!hasCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
      <ErrorNotification error={error} onClose={() => setError(null)} />
    </div>
  );
};
