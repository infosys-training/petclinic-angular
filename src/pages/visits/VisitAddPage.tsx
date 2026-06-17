import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addVisit } from '../../api/visitApi';
import ErrorAlert from '../../components/ErrorAlert';

export default function VisitAddPage() {
  const { id, petId } = useParams<{ id: string; petId: string }>();
  const navigate = useNavigate();

  const [date, setDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addVisit(Number(id), Number(petId), {
        date: date ? date.toISOString().split('T')[0] : '',
        description,
      });
      navigate(`/owners/${id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add visit');
    }
  };

  return (
    <>
      <h2>Add Visit</h2>
      {error && <ErrorAlert message={error} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <div>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              className="form-control"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Save Visit
        </Button>
      </Form>
    </>
  );
}
