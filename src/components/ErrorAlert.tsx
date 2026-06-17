import { useState } from 'react';
import { Alert } from 'react-bootstrap';

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Alert variant="danger" dismissible onClose={() => setShow(false)}>
      {message}
    </Alert>
  );
}
