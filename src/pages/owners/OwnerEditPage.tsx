import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { getOwnerById, updateOwner } from '../../api/ownerApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import type { Owner } from '../../types';

export default function OwnerEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fetchOwner = useCallback(() => getOwnerById(Number(id)), [id]);
  const { data: owner, loading, error: fetchError } = useApi<Owner>(fetchOwner);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (owner) {
      setFirstName(owner.firstName);
      setLastName(owner.lastName);
      setAddress(owner.address);
      setCity(owner.city);
      setTelephone(owner.telephone);
    }
  }, [owner]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateOwner(Number(id), { firstName, lastName, address, city, telephone });
      navigate(`/owners/${id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update owner');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (fetchError) return <ErrorAlert message={fetchError} />;

  return (
    <>
      <h2>Edit Owner</h2>
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
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Telephone</Form.Label>
          <Form.Control
            required
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Update Owner
        </Button>
      </Form>
    </>
  );
}
