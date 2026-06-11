import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Specialty } from '../../types';
import { getVetById, updateVet } from '../../api/vetApi';
import { getSpecialties } from '../../api/specialtyApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

export default function VetEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vetId = Number(id);

  const fetchVet = useCallback(() => getVetById(vetId), [vetId]);
  const { data: vet, loading: vetLoading } = useApi(fetchVet);
  const { data: specialties, loading: specsLoading } = useApi(getSpecialties);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedSpecs, setSelectedSpecs] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (vet) {
      setFirstName(vet.firstName);
      setLastName(vet.lastName);
      setSelectedSpecs(vet.specialties?.map((s) => s.id) ?? []);
    }
  }, [vet]);

  const handleSpecChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.selectedOptions;
    const values: number[] = [];
    for (let i = 0; i < options.length; i++) {
      values.push(Number(options[i].value));
    }
    setSelectedSpecs(values);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const specs: Specialty[] = specialties
        ? specialties.filter((s: Specialty) => selectedSpecs.includes(s.id))
        : [];
      await updateVet(vetId, { firstName, lastName, specialties: specs });
      navigate('/vets');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update vet';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (vetLoading || specsLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2>Edit Veterinarian</h2>
      <ErrorAlert message={error} />
      <Form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Specialties</Form.Label>
          <Form.Select
            multiple
            value={selectedSpecs.map(String)}
            onChange={handleSpecChange}
          >
            {specialties?.map((s: Specialty) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </Form.Select>
          <Form.Text className="text-muted">Hold Ctrl/Cmd to select multiple.</Form.Text>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Update Vet'}
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate('/vets')}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}
