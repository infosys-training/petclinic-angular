import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { getVetById, updateVet } from '../../api/vetApi';
import { getSpecialties } from '../../api/specialtyApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import type { Vet, Specialty } from '../../types';

export default function VetEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fetchVet = useCallback(() => getVetById(Number(id)), [id]);
  const fetchSpecialties = useCallback(() => getSpecialties(), []);
  const { data: vet, loading: vetLoading, error: vetError } = useApi<Vet>(fetchVet);
  const { data: specialties, loading: specLoading } = useApi<Specialty[]>(fetchSpecialties);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (vet) {
      setFirstName(vet.firstName);
      setLastName(vet.lastName);
      setSelectedSpecialtyIds(vet.specialties.map((s) => s.id));
    }
  }, [vet]);

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => Number(opt.value));
    setSelectedSpecialtyIds(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedSpecs = specialties?.filter((s) =>
        selectedSpecialtyIds.includes(s.id),
      ) ?? [];
      await updateVet(Number(id), {
        firstName,
        lastName,
        specialties: selectedSpecs,
      });
      navigate('/vets');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update vet');
    }
  };

  if (vetLoading || specLoading) return <LoadingSpinner />;
  if (vetError) return <ErrorAlert message={vetError} />;

  return (
    <>
      <h2>Edit Veterinarian</h2>
      {error && <ErrorAlert message={error} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Specialties</Form.Label>
          <Form.Select
            multiple
            value={selectedSpecialtyIds.map(String)}
            onChange={handleSpecialtyChange}
          >
            {specialties?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" variant="primary">
          Update Veterinarian
        </Button>
      </Form>
    </>
  );
}
