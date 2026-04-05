import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  return <li data-cy="Todo">{todo.title}</li>;
};