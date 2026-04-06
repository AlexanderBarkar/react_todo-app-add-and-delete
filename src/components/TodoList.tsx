import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  loadingIds: number[];
  onDelete: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  loadingIds,
  onDelete,
}) => {
  return (
    <>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isTemp={loadingIds?.includes(todo.id)}
          handleTodoDelete={() => onDelete(todo.id)}
        />
      ))}
    </>
  );
};