import { useState, useCallback } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import {
  getSpecialties,
  addSpecialty,
  updateSpecialty,
  deleteSpecialty,
} from '../../api/specialtyApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';
import type { Specialty } from '../../types';

export default function SpecialtyListPage() {
  const fetchSpecialties = useCallback(() => getSpecialties(), []);
  const { data: specialties, loading, error, refetch } =
    useApi<Specialty[]>(fetchSpecialties);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const startEdit = (s: Specialty) => {
    setEditId(s.id);
    setEditName(s.name);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName('');
  };

  const handleUpdate = async () => {
    if (editId === null) return;
    try {
      await updateSpecialty(editId, { name: editName });
      cancelEdit();
      refetch();
    } catch (err: unknown) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to update specialty',
      );
    }
  };

  const handleAdd = async () => {
    try {
      await addSpecialty({ name: newName });
      setNewName('');
      setAdding(false);
      refetch();
    } catch (err: unknown) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to add specialty',
      );
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deleteSpecialty(deleteId);
      refetch();
    } catch (err: unknown) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to delete specialty',
      );
    }
    setDeleteId(null);
  };

  return (
    <>
      <h2>Specialties</h2>
      {!adding && (
        <Button
          variant="success"
          className="mb-3"
          onClick={() => setAdding(true)}
        >
          <FaPlus className="me-1" />
          Add Specialty
        </Button>
      )}
      {loading && <LoadingSpinner />}
      {(error ?? actionError) && <ErrorAlert message={(error ?? actionError)!} />}
      {specialties && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adding && (
              <tr>
                <td>
                  <Form.Control
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="New specialty name"
                  />
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="success"
                    className="me-1"
                    onClick={handleAdd}
                  >
                    <FaSave />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setAdding(false);
                      setNewName('');
                    }}
                  >
                    <FaTimes />
                  </Button>
                </td>
              </tr>
            )}
            {specialties.map((s) => (
              <tr key={s.id}>
                <td>
                  {editId === s.id ? (
                    <Form.Control
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    s.name
                  )}
                </td>
                <td>
                  {editId === s.id ? (
                    <>
                      <Button
                        size="sm"
                        variant="success"
                        className="me-1"
                        onClick={handleUpdate}
                      >
                        <FaSave />
                      </Button>
                      <Button size="sm" variant="secondary" onClick={cancelEdit}>
                        <FaTimes />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-1"
                        onClick={() => startEdit(s)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => setDeleteId(s.id)}
                      >
                        <FaTrash />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <ConfirmDialog
        show={deleteId !== null}
        title="Delete Specialty"
        message="Are you sure you want to delete this specialty?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
