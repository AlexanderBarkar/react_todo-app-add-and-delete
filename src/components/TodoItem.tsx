import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  isTemp?: boolean;
  handleTodoDelete: () => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isTemp = false,
  handleTodoDelete,
}) => {
  return (
    <div
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''}`}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          readOnly
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {!isTemp && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={handleTodoDelete}
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${isTemp ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};