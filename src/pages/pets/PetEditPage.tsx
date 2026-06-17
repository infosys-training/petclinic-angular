import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getPetById, updatePet } from '../../api/petApi';
import { getPetTypes } from '../../api/petTypeApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import type { Pet, PetType } from '../../types';

export default function PetEditPage() {
  const { id, petId } = useParams<{ id: string; petId: string }>();
  const navigate = useNavigate();
  const fetchPet = useCallback(() => getPetById(Number(petId)), [petId]);
  const fetchPetTypes = useCallback(() => getPetTypes(), []);
  const { data: pet, loading: petLoading, error: petError } = useApi<Pet>(fetchPet);
  const { data: petTypes, loading: typesLoading } = useApi<PetType[]>(fetchPetTypes);

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [typeId, setTypeId] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pet) {
      setName(pet.name);
      setBirthDate(pet.birthDate ? new Date(pet.birthDate) : null);
      setTypeId(String(pet.type?.id ?? ''));
    }
  }, [pet]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedType = petTypes?.find((t) => t.id === Number(typeId));
      await updatePet(Number(petId), {
        name,
        birthDate: birthDate ? birthDate.toISOString().split('T')[0] : '',
        type: selectedType,
        ownerId: Number(id),
      });
      navigate(`/owners/${id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update pet');
    }
  };

  if (petLoading || typesLoading) return <LoadingSpinner />;
  if (petError) return <ErrorAlert message={petError} />;

  return (
    <>
      <h2>Edit Pet</h2>
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
          Update Pet
        </Button>
      </Form>
    </>
  );
}
