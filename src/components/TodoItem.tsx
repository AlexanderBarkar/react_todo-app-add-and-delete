/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  isTemp?: boolean;
  isLoading?: boolean;
  handleTodoDelete: () => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isTemp = false,
  isLoading = false,
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
          onChange={() => {}}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      {/* ❗ кнопку НЕ прячем при loading */}
      {!isTemp && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDeleteButton"
          onClick={handleTodoDelete}
        >
          ×
        </button>
      )}

      {/* ✅ loader показывается только при удалении ИЛИ temp */}
      <div
        data-cy="TodoLoader"
        className={`modal overlay ${(isLoading || isTemp) ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};