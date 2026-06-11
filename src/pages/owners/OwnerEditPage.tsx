import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { getOwnerById, updateOwner } from '../../api/ownerApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

export default function OwnerEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ownerId = Number(id);
  const fetchOwner = useCallback(() => getOwnerById(ownerId), [ownerId]);
  const { data: owner, loading, error } = useApi(fetchOwner);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    telephone: '',
  });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (owner) {
      setForm({
        firstName: owner.firstName,
        lastName: owner.lastName,
        address: owner.address,
        city: owner.city,
        telephone: owner.telephone,
      });
    }
  }, [owner]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      await updateOwner(ownerId, form);
      navigate(`/owners/${ownerId}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update owner';
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2>Edit Owner</h2>
      <ErrorAlert message={error || submitError} />
      <Form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control name="firstName" value={form.firstName} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control name="lastName" value={form.lastName} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control name="address" value={form.address} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control name="city" value={form.city} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Telephone</Form.Label>
          <Form.Control name="telephone" value={form.telephone} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Update Owner'}
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate(`/owners/${ownerId}`)}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}
