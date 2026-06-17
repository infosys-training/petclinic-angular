import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { addVet } from '../../api/vetApi';
import { getSpecialties } from '../../api/specialtyApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import type { Specialty } from '../../types';

export default function VetAddPage() {
  const navigate = useNavigate();
  const fetchSpecialties = useCallback(() => getSpecialties(), []);
  const { data: specialties, loading: specLoading } = useApi<Specialty[]>(fetchSpecialties);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedSpecialtyIds, setSelectedSpecialtyIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

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
      await addVet({ firstName, lastName, specialties: selectedSpecs });
      navigate('/vets');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add vet');
    }
  };

  if (specLoading) return <LoadingSpinner />;

  return (
    <>
      <h2>Add Veterinarian</h2>
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
          Save Veterinarian
        </Button>
      </Form>
    </>
  );
}
