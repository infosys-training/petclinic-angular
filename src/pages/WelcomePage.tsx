import { FaPaw } from 'react-icons/fa';

export default function WelcomePage() {
  return (
    <div className="text-center mt-5">
      <h1>
        <FaPaw className="me-2" />
        Welcome to PetClinic
      </h1>
      <p className="lead mt-3">
        A Spring-based application for managing a veterinary clinic.
      </p>
    </div>
  );
}
