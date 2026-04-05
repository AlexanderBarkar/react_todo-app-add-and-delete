import React from 'react';

type Props = {
  error: string | null;
  onClose: () => void;
};

export const ErrorNotification: React.FC<Props> = ({
  error,
  onClose,
}) => {
  if (!error) {
    return null;
  }

  return (
    <div
      data-cy="ErrorNotification"
      className="notification is-danger is-light has-text-weight-normal"
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onClose}
      />

      {error}
    </div>
  );
};