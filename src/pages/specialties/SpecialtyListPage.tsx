import { useState } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { FaPlus, FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { Specialty } from '../../types';
import { getSpecialties, addSpecialty, updateSpecialty, deleteSpecialty } from '../../api/specialtyApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function SpecialtyListPage() {
  const { data: specialties, loading, error, refetch } = useApi(getSpecialties);
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

  const saveEdit = async () => {
    if (editId === null || !editName.trim()) return;
    try {
      await updateSpecialty(editId, { name: editName.trim() });
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
      await addSpecialty({ name: newName.trim() });
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
      await deleteSpecialty(deleteId);
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
      <h2>Specialties</h2>
      <ErrorAlert message={error || actionError} onClose={() => setActionError(null)} />
      <div className="d-flex justify-content-end mb-3">
        {!adding && (
          <Button variant="primary" onClick={() => setAdding(true)}>
            <FaPlus className="me-1" />
            Add Specialty
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
                    placeholder="New specialty name"
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
          {specialties?.map((s) => (
            <tr key={s.id}>
              <td>
                {editId === s.id ? (
                  <Form.Control
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                    autoFocus
                  />
                ) : (
                  s.name
                )}
              </td>
              <td>
                {editId === s.id ? (
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
                    <Button size="sm" variant="warning" className="me-1" onClick={() => startEdit(s)}>
                      <FaEdit />
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => setDeleteId(s.id)}>
                      <FaTrash />
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {(!specialties || specialties.length === 0) && !adding && (
            <tr>
              <td colSpan={2} className="text-center">No specialties found.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <ConfirmDialog
        show={deleteId !== null}
        message="Are you sure you want to delete this specialty?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
