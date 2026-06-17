import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Table, Form, Button, InputGroup } from 'react-bootstrap';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { getOwners, searchOwners } from '../../api/ownerApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import type { Owner } from '../../types';

export default function OwnerListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const fetchOwners = useCallback(
    () => (submittedSearch ? searchOwners(submittedSearch) : getOwners()),
    [submittedSearch],
  );
  const { data: owners, loading, error } = useApi<Owner[]>(fetchOwners);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSearch(searchTerm);
  };

  return (
    <>
      <h2>Owners</h2>
      <Form onSubmit={handleSearch} className="mb-3">
        <InputGroup>
          <Form.Control
            placeholder="Search by last name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" variant="primary">
            <FaSearch className="me-1" />
            Search
          </Button>
        </InputGroup>
      </Form>
      <Link to="/owners/add" className="btn btn-success mb-3">
        <FaPlus className="me-1" />
        Add Owner
      </Link>
      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}
      {owners && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Telephone</th>
              <th>Pets</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner) => (
              <tr key={owner.id}>
                <td>
                  <Link to={`/owners/${owner.id}`}>
                    {owner.firstName} {owner.lastName}
                  </Link>
                </td>
                <td>{owner.address}</td>
                <td>{owner.city}</td>
                <td>{owner.telephone}</td>
                <td>{owner.pets?.map((p) => p.name).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
