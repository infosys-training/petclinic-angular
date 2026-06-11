import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Specialty } from '../../types';
import { addVet } from '../../api/vetApi';
import { getSpecialties } from '../../api/specialtyApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

export default function VetAddPage() {
  const navigate = useNavigate();
  const { data: specialties, loading: specsLoading } = useApi(getSpecialties);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedSpecs, setSelectedSpecs] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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
      await addVet({ firstName, lastName, specialties: specs });
      navigate('/vets');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add vet';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (specsLoading) return <LoadingSpinner />;

  return (
    <div>
      <h2>Add Veterinarian</h2>
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
          {submitting ? 'Saving...' : 'Add Vet'}
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate('/vets')}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}
