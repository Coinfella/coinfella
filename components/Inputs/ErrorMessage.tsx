interface ErrorMessageProps {
  message: string | null | undefined;
  showError: boolean;
}
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  showError,
  message,
}) => {
  return (
    <>
      {showError && (
        <span className="mt-2 text-left text-red-400">{message}</span>
      )}
    </>
  );
};
