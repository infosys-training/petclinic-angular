import { useCallback, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { getOwnerById, deleteOwner } from '../../api/ownerApi';
import { deletePet } from '../../api/petApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function OwnerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const ownerId = Number(id);
  const fetchOwner = useCallback(() => getOwnerById(ownerId), [ownerId]);
  const { data: owner, loading, error } = useApi(fetchOwner);
  const [showDeleteOwner, setShowDeleteOwner] = useState(false);
  const [deletePetId, setDeletePetId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleDeleteOwner = async () => {
    try {
      await deleteOwner(ownerId);
      navigate('/owners');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete owner';
      setActionError(message);
    }
    setShowDeleteOwner(false);
  };

  const handleDeletePet = async () => {
    if (deletePetId === null) return;
    try {
      await deletePet(deletePetId);
      window.location.reload();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete pet';
      setActionError(message);
    }
    setDeletePetId(null);
  };

  if (loading) return <LoadingSpinner />;
  if (!owner) return <ErrorAlert message={error || 'Owner not found'} />;

  return (
    <div>
      <h2>Owner Information</h2>
      <ErrorAlert message={actionError} onClose={() => setActionError(null)} />
      <Table bordered>
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
          Edit Owner
        </Link>
        <Button variant="danger" onClick={() => setShowDeleteOwner(true)}>
          Delete Owner
        </Button>
        <Link to={`/owners/${owner.id}/pets/add`} className="btn btn-success ms-2">
          Add Pet
        </Link>
      </div>

      <h3>Pets and Visits</h3>
      {owner.pets && owner.pets.length > 0 ? (
        owner.pets.map((pet) => (
          <div key={pet.id} className="card mb-3">
            <div className="card-header d-flex justify-content-between align-items-center">
              <strong>{pet.name}</strong>
              <div>
                <Link to={`/owners/${owner.id}/pets/${pet.id}/edit`} className="btn btn-sm btn-warning me-1">
                  Edit Pet
                </Link>
                <Button size="sm" variant="danger" onClick={() => setDeletePetId(pet.id)}>
                  Delete Pet
                </Button>
              </div>
            </div>
            <div className="card-body">
              <p>
                <strong>Birth Date:</strong> {pet.birthDate} &nbsp;
                <strong>Type:</strong> {pet.type?.name}
              </p>
              <Link
                to={`/owners/${owner.id}/pets/${pet.id}/visits/add`}
                className="btn btn-sm btn-primary mb-2"
              >
                Add Visit
              </Link>
              {pet.visits && pet.visits.length > 0 ? (
                <Table size="sm" striped bordered>
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
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-muted">No visits recorded.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">No pets registered.</p>
      )}

      <ConfirmDialog
        show={showDeleteOwner}
        message={`Are you sure you want to delete ${owner.firstName} ${owner.lastName}?`}
        onConfirm={handleDeleteOwner}
        onCancel={() => setShowDeleteOwner(false)}
      />
      <ConfirmDialog
        show={deletePetId !== null}
        message="Are you sure you want to delete this pet?"
        onConfirm={handleDeletePet}
        onCancel={() => setDeletePetId(null)}
      />
    </div>
  );
}
