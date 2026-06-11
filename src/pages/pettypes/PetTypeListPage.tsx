import { useState } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { FaPlus, FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { PetType } from '../../types';
import { getPetTypes, addPetType, updatePetType, deletePetType } from '../../api/petTypeApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function PetTypeListPage() {
  const { data: petTypes, loading, error, refetch } = useApi(getPetTypes);
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

  const saveEdit = async () => {
    if (editId === null || !editName.trim()) return;
    try {
      await updatePetType(editId, { name: editName.trim() });
      refetch();
      cancelEdit();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update';
      setActionError(message);
    }
  };

  const handleAdd = async () => {
    if (!newName.trim()) return;
    try {
      await addPetType({ name: newName.trim() });
      setNewName('');
      setAdding(false);
      refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add';
      setActionError(message);
    }
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await deletePetType(deleteId);
      refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete';
      setActionError(message);
    }
    setDeleteId(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2>Pet Types</h2>
      <ErrorAlert message={error || actionError} onClose={() => setActionError(null)} />
      <div className="d-flex justify-content-end mb-3">
        {!adding && (
          <Button variant="primary" onClick={() => setAdding(true)}>
            <FaPlus className="me-1" />
            Add Pet Type
          </Button>
        )}
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th style={{ width: 180 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {adding && (
            <tr>
              <td>
                <InputGroup>
                  <Form.Control
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="New pet type name"
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    autoFocus
                  />
                </InputGroup>
              </td>
              <td>
                <Button size="sm" variant="success" className="me-1" onClick={handleAdd}>
                  <FaCheck />
                </Button>
                <Button size="sm" variant="secondary" onClick={() => { setAdding(false); setNewName(''); }}>
                  <FaTimes />
                </Button>
              </td>
            </tr>
          )}
          {petTypes?.map((pt) => (
            <tr key={pt.id}>
              <td>
                {editId === pt.id ? (
                  <Form.Control
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                    autoFocus
                  />
                ) : (
                  pt.name
                )}
              </td>
              <td>
                {editId === pt.id ? (
                  <>
                    <Button size="sm" variant="success" className="me-1" onClick={saveEdit}>
                      <FaCheck />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={cancelEdit}>
                      <FaTimes />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="warning" className="me-1" onClick={() => startEdit(pt)}>
                      <FaEdit />
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => setDeleteId(pt.id)}>
                      <FaTrash />
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {(!petTypes || petTypes.length === 0) && !adding && (
            <tr>
              <td colSpan={2} className="text-center">No pet types found.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <ConfirmDialog
        show={deleteId !== null}
        message="Are you sure you want to delete this pet type?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
