type Props = {
  error: string | null;
  onClose: () => void;
};

export const ErrorNotification = ({ error, onClose }: Props) => {
  return (
    <div data-cy="ErrorNotification" className={error ? '' : 'hidden'}>
      {error && (
        <>
          {error}
          <button data-cy="HideErrorButton" onClick={onClose}>
            ×
          </button>
        </>
      )}
    </div>
  );
};
