export const ErrorNotification = ({ error, onClose }: Props) => {
  if (!error) {
    return null;
  }

  return (
    <div data-cy="ErrorNotification">
      {error}
      <button data-cy="HideErrorButton" onClick={onClose}>
        ×
      </button>
    </div>
  );
};