import { useCallback, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Table, Button, Card } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getOwnerById, deleteOwner } from '../../api/ownerApi';
import { deletePet } from '../../api/petApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';
import type { Owner } from '../../types';

export default function OwnerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fetchOwner = useCallback(() => getOwnerById(Number(id)), [id]);
  const { data: owner, loading, error } = useApi<Owner>(fetchOwner);
  const [showDeleteOwner, setShowDeleteOwner] = useState(false);
  const [deletePetId, setDeletePetId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleDeleteOwner = async () => {
    try {
      await deleteOwner(Number(id));
      navigate('/owners');
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete owner');
    }
    setShowDeleteOwner(false);
  };

  const handleDeletePet = async () => {
    if (deletePetId === null) return;
    try {
      await deletePet(deletePetId);
      navigate(0);
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete pet');
    }
    setDeletePetId(null);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;
  if (!owner) return null;

  return (
    <>
      <h2>Owner Information</h2>
      {actionError && <ErrorAlert message={actionError} />}
      <Table bordered className="mb-3">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{owner.firstName} {owner.lastName}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{owner.address}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{owner.city}</td>
          </tr>
          <tr>
            <th>Telephone</th>
            <td>{owner.telephone}</td>
          </tr>
        </tbody>
      </Table>

      <div className="mb-3">
        <Link to={`/owners/${owner.id}/edit`} className="btn btn-warning me-2">
          <FaEdit className="me-1" />
          Edit Owner
        </Link>
        <Button variant="danger" onClick={() => setShowDeleteOwner(true)}>
          <FaTrash className="me-1" />
          Delete Owner
        </Button>
        <Link to={`/owners/${owner.id}/pets/add`} className="btn btn-success ms-2">
          <FaPlus className="me-1" />
          Add Pet
        </Link>
      </div>

      <h3>Pets and Visits</h3>
      {owner.pets?.map((pet) => (
        <Card key={pet.id} className="mb-3">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <strong>{pet.name}</strong>
            <div>
              <Link
                to={`/owners/${owner.id}/pets/${pet.id}/edit`}
                className="btn btn-sm btn-warning me-1"
              >
                <FaEdit />
              </Link>
              <Button
                size="sm"
                variant="danger"
                onClick={() => setDeletePetId(pet.id)}
              >
                <FaTrash />
              </Button>
            </div>
          </Card.Header>
          <Card.Body>
            <p>
              <strong>Birth Date:</strong> {pet.birthDate}
              {' | '}
              <strong>Type:</strong> {pet.type?.name}
            </p>
            <Link
              to={`/owners/${owner.id}/pets/${pet.id}/visits/add`}
              className="btn btn-sm btn-success mb-2"
            >
              <FaPlus className="me-1" />
              Add Visit
            </Link>
            {pet.visits && pet.visits.length > 0 && (
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pet.visits.map((visit) => (
                    <tr key={visit.id}>
                      <td>{visit.date}</td>
                      <td>{visit.description}</td>
                      <td>
                        <Link
                          to={`/owners/${owner.id}/pets/${pet.id}/visits/${visit.id}/edit`}
                          className="btn btn-sm btn-warning"
                        >
                          <FaEdit />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      ))}

      <ConfirmDialog
        show={showDeleteOwner}
        title="Delete Owner"
        message={`Are you sure you want to delete ${owner.firstName} ${owner.lastName}?`}
        onConfirm={handleDeleteOwner}
        onCancel={() => setShowDeleteOwner(false)}
      />
      <ConfirmDialog
        show={deletePetId !== null}
        title="Delete Pet"
        message="Are you sure you want to delete this pet?"
        onConfirm={handleDeletePet}
        onCancel={() => setDeletePetId(null)}
      />
    </>
  );
}
