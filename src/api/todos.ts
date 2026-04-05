import { Todo } from '../types/Todo';

export const getTodos = (): Promise<Todo[]> => {
  return fetch('/todos?userId=1').then(res => {
    if (!res.ok) {
      throw new Error();
    }

    return res.json();
  });
};