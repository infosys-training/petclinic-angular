import { FaPaw } from 'react-icons/fa';

export default function WelcomePage() {
  return (
    <div className="text-center">
      <h1>
        <FaPaw className="me-2" />
        Welcome to PetClinic
      </h1>
      <p className="lead mt-3">
        A sample application demonstrating a React 19 frontend for the Spring PetClinic REST API.
      </p>
      <hr />
      <p>
        Use the navigation bar above to manage owners, pets, visits, veterinarians, pet types, and specialties.
      </p>
    </div>
  );
}
