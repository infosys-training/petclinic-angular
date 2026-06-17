import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addPet } from '../../api/petApi';
import { getPetTypes } from '../../api/petTypeApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import type { PetType } from '../../types';

export default function PetAddPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fetchPetTypes = useCallback(() => getPetTypes(), []);
  const { data: petTypes, loading: typesLoading } = useApi<PetType[]>(fetchPetTypes);

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [typeId, setTypeId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedType = petTypes?.find((t) => t.id === Number(typeId));
      await addPet(Number(id), {
        name,
        birthDate: birthDate ? birthDate.toISOString().split('T')[0] : '',
        type: selectedType,
      });
      navigate(`/owners/${id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add pet');
    }
  };

  if (typesLoading) return <LoadingSpinner />;

  return (
    <>
      <h2>Add Pet</h2>
      {error && <ErrorAlert message={error} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            required
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
          >
            <option value="">Select a type</option>
            {petTypes?.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="primary">
          Save Pet
        </Button>
      </Form>
    </>
  );
}
