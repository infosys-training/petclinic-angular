import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getVets, deleteVet } from '../../api/vetApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';
import type { Vet } from '../../types';

export default function VetListPage() {
  const fetchVets = useCallback(() => getVets(), []);
  const { data: vets, loading, error, refetch } = useApi<Vet[]>(fetchVets);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteVet(deleteId);
      refetch();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete vet');
    }
    setDeleteId(null);
  };

  return (
    <>
      <h2>Veterinarians</h2>
      <Link to="/vets/add" className="btn btn-success mb-3">
        <FaPlus className="me-1" />
        Add Veterinarian
      </Link>
      {loading && <LoadingSpinner />}
      {(error ?? actionError) && <ErrorAlert message={(error ?? actionError)!} />}
      {vets && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialties</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vets.map((vet) => (
              <tr key={vet.id}>
                <td>
                  {vet.firstName} {vet.lastName}
                </td>
                <td>{vet.specialties.map((s) => s.name).join(', ')}</td>
                <td>
                  <Link
                    to={`/vets/${vet.id}/edit`}
                    className="btn btn-sm btn-warning me-1"
                  >
                    <FaEdit />
                  </Link>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setDeleteId(vet.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ConfirmDialog
        show={deleteId !== null}
        title="Delete Veterinarian"
        message="Are you sure you want to delete this veterinarian?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
