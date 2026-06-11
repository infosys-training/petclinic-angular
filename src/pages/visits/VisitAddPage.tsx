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
  const ownerId = Number(id);
  const numericPetId = Number(petId);

  const [date, setDate] = useState<Date | null>(new Date());
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    setSubmitting(true);
    setError(null);
    try {
      await addVisit(ownerId, numericPetId, {
        date: date.toISOString().split('T')[0],
        description,
      });
      navigate(`/owners/${ownerId}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add visit';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Add Visit</h2>
      <ErrorAlert message={error} />
      <Form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Add Visit'}
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate(`/owners/${ownerId}`)}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}
