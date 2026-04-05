type Props = {
  isLoading: boolean;
};

export const TodoLoader = ({ isLoading }: Props) => {
  if (!isLoading) {
    return null;
  }

  return <div data-cy="TodoLoader" className="is-active" />;
};
