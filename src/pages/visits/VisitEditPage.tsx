import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getVisitById, updateVisit } from '../../api/visitApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import type { Visit } from '../../types';

export default function VisitEditPage() {
  const { id, visitId } = useParams<{ id: string; visitId: string }>();
  const navigate = useNavigate();
  const fetchVisit = useCallback(() => getVisitById(Number(visitId)), [visitId]);
  const { data: visit, loading, error: fetchError } = useApi<Visit>(fetchVisit);

  const [date, setDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (visit) {
      setDate(visit.date ? new Date(visit.date) : null);
      setDescription(visit.description);
    }
  }, [visit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateVisit(Number(visitId), {
        date: date ? date.toISOString().split('T')[0] : '',
        description,
      });
      navigate(`/owners/${id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update visit');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (fetchError) return <ErrorAlert message={fetchError} />;

  return (
    <>
      <h2>Edit Visit</h2>
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
          Update Visit
        </Button>
      </Form>
    </>
  );
}
