import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  isTemp?: boolean;
};

export const TodoItem = ({ todo, onDelete, isTemp }: Props) => {
  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <input
        data-cy="TodoStatus"
        type="checkbox"
        checked={todo.completed}
        readOnly
      />

      <span data-cy="TodoTitle">{todo.title}</span>

      {!isTemp && (
        <button data-cy="TodoDelete" onClick={() => onDelete(todo.id)}>
          ×
        </button>
      )}

      {isTemp && <div data-cy="TodoLoader" className="is-active" />}
    </div>
  );
};
