import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PetType } from '../../types';
import { addPet } from '../../api/petApi';
import { getPetTypes } from '../../api/petTypeApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

export default function PetAddPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ownerId = Number(id);
  const { data: petTypes, loading: typesLoading } = useApi(getPetTypes);

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [typeId, setTypeId] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate || typeId === '') return;
    setSubmitting(true);
    setError(null);
    try {
      const selectedType = petTypes?.find((t: PetType) => t.id === Number(typeId));
      await addPet(ownerId, {
        name,
        birthDate: birthDate.toISOString().split('T')[0],
        type: selectedType,
      });
      navigate(`/owners/${ownerId}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add pet';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (typesLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2>Add Pet</h2>
      <ErrorAlert message={error} />
      <Form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Birth Date</Form.Label>
          <div>
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              className="form-control"
              dateFormat="yyyy-MM-dd"
              required
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select
            value={typeId}
            onChange={(e) => setTypeId(Number(e.target.value))}
            required
          >
            <option value="">Select a type</option>
            {petTypes?.map((t: PetType) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Add Pet'}
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate(`/owners/${ownerId}`)}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}
