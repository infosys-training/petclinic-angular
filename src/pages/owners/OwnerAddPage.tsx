import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { addOwner } from '../../api/ownerApi';
import ErrorAlert from '../../components/ErrorAlert';

export default function OwnerAddPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    telephone: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await addOwner(form);
      navigate('/owners');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add owner';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Add Owner</h2>
      <ErrorAlert message={error} />
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
          {submitting ? 'Saving...' : 'Add Owner'}
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate('/owners')}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}
