import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  tempTodo: Todo | null;
  onDelete: (id: number) => void;
};

export const TodoList = ({ todos, tempTodo, onDelete }: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}

      {tempTodo && <TodoItem todo={tempTodo} isTemp onDelete={() => {}} />}
    </section>
  );
};
