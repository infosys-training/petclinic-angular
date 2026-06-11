import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Owner } from '../../types';
import { getOwners, searchOwners } from '../../api/ownerApi';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

export default function OwnerListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Owner[] | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const { data: owners, loading, error } = useApi(getOwners);

  const handleSearch = useCallback(async () => {
    setSearching(true);
    setSearchError(null);
    try {
      const results = await searchOwners(searchTerm);
      setSearchResults(results);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Search failed';
      setSearchError(message);
    } finally {
      setSearching(false);
    }
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults(null);
    setSearchError(null);
  };

  const displayOwners = searchResults ?? owners ?? [];

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2>Owners</h2>
      <ErrorAlert message={error || searchError} />
      <div className="d-flex justify-content-between mb-3">
        <InputGroup style={{ maxWidth: 400 }}>
          <Form.Control
            placeholder="Search by last name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button variant="outline-secondary" onClick={handleSearch} disabled={searching}>
            <FaSearch />
          </Button>
          {searchResults && (
            <Button variant="outline-danger" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </InputGroup>
        <Link to="/owners/add" className="btn btn-primary">
          <FaPlus className="me-1" />
          Add Owner
        </Link>
      </div>
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
          {displayOwners.map((owner) => (
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
          {displayOwners.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No owners found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
