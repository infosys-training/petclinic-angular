import { useState, useCallback } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import {
  getPetTypes,
  addPetType,
  updatePetType,
  deletePetType,
} from '../../api/petTypeApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';
import type { PetType } from '../../types';

export default function PetTypeListPage() {
  const fetchPetTypes = useCallback(() => getPetTypes(), []);
  const { data: petTypes, loading, error, refetch } = useApi<PetType[]>(fetchPetTypes);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const startEdit = (pt: PetType) => {
    setEditId(pt.id);
    setEditName(pt.name);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName('');
  };

  const handleUpdate = async () => {
    if (editId === null) return;
    try {
      await updatePetType(editId, { name: editName });
      cancelEdit();
      refetch();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Failed to update pet type');
    }
  };

  const handleAdd = async () => {
    try {
      await addPetType({ name: newName });
      setNewName('');
      setAdding(false);
      refetch();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Failed to add pet type');
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deletePetType(deleteId);
      refetch();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete pet type');
    }
    setDeleteId(null);
  };

  return (
    <>
      <h2>Pet Types</h2>
      {!adding && (
        <Button
          variant="success"
          className="mb-3"
          onClick={() => setAdding(true)}
        >
          <FaPlus className="me-1" />
          Add Pet Type
        </Button>
      )}
      {loading && <LoadingSpinner />}
      {(error ?? actionError) && <ErrorAlert message={(error ?? actionError)!} />}
      {petTypes && (
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
                    placeholder="New pet type name"
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
            {petTypes.map((pt) => (
              <tr key={pt.id}>
                <td>
                  {editId === pt.id ? (
                    <Form.Control
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    pt.name
                  )}
                </td>
                <td>
                  {editId === pt.id ? (
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
                        onClick={() => startEdit(pt)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => setDeleteId(pt.id)}
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
        title="Delete Pet Type"
        message="Are you sure you want to delete this pet type?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
