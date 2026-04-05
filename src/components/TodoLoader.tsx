type Props = {
  isLoading: boolean;
};

export const TodoLoader = ({ isLoading }: Props) => {
  return (
    <div data-cy="TodoLoader">
      {isLoading && 'Loading...'}
    </div>
  );
};