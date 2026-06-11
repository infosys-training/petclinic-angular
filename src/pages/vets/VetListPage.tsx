import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { getVets, deleteVet } from '../../api/vetApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function VetListPage() {
  const { data: vets, loading, error, refetch } = useApi(getVets);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteVet(deleteId);
      refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete vet';
      setActionError(message);
    }
    setDeleteId(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2>Veterinarians</h2>
      <ErrorAlert message={error || actionError} />
      <div className="d-flex justify-content-end mb-3">
        <Link to="/vets/add" className="btn btn-primary">
          <FaPlus className="me-1" />
          Add Vet
        </Link>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialties</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vets?.map((vet) => (
            <tr key={vet.id}>
              <td>{vet.firstName} {vet.lastName}</td>
              <td>{vet.specialties?.map((s) => s.name).join(', ') || 'none'}</td>
              <td>
                <Link to={`/vets/${vet.id}/edit`} className="btn btn-sm btn-warning me-1">
                  Edit
                </Link>
                <Button size="sm" variant="danger" onClick={() => setDeleteId(vet.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {(!vets || vets.length === 0) && (
            <tr>
              <td colSpan={3} className="text-center">No veterinarians found.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <ConfirmDialog
        show={deleteId !== null}
        message="Are you sure you want to delete this veterinarian?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
