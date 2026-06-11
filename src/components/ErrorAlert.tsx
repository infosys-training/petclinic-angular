import { Alert } from 'react-bootstrap';

interface ErrorAlertProps {
  message: string | null;
  onClose?: () => void;
}

export default function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  if (!message) return null;
  return (
    <Alert variant="danger" dismissible onClose={onClose}>
      {message}
    </Alert>
  );
}
