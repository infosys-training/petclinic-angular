import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import WelcomePage from './pages/WelcomePage';
import NotFoundPage from './pages/NotFoundPage';
import OwnerListPage from './pages/owners/OwnerListPage';
import OwnerAddPage from './pages/owners/OwnerAddPage';
import OwnerDetailPage from './pages/owners/OwnerDetailPage';
import OwnerEditPage from './pages/owners/OwnerEditPage';
import PetAddPage from './pages/pets/PetAddPage';
import PetEditPage from './pages/pets/PetEditPage';
import VisitAddPage from './pages/visits/VisitAddPage';
import VisitEditPage from './pages/visits/VisitEditPage';
import VetListPage from './pages/vets/VetListPage';
import VetAddPage from './pages/vets/VetAddPage';
import VetEditPage from './pages/vets/VetEditPage';
import PetTypeListPage from './pages/pettypes/PetTypeListPage';
import SpecialtyListPage from './pages/specialties/SpecialtyListPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="owners" element={<OwnerListPage />} />
        <Route path="owners/add" element={<OwnerAddPage />} />
        <Route path="owners/:id" element={<OwnerDetailPage />} />
        <Route path="owners/:id/edit" element={<OwnerEditPage />} />
        <Route path="owners/:id/pets/add" element={<PetAddPage />} />
        <Route path="owners/:id/pets/:petId/edit" element={<PetEditPage />} />
        <Route path="owners/:id/pets/:petId/visits/add" element={<VisitAddPage />} />
        <Route path="owners/:id/pets/:petId/visits/:visitId/edit" element={<VisitEditPage />} />
        <Route path="vets" element={<VetListPage />} />
        <Route path="vets/add" element={<VetAddPage />} />
        <Route path="vets/:id/edit" element={<VetEditPage />} />
        <Route path="pettypes" element={<PetTypeListPage />} />
        <Route path="specialties" element={<SpecialtyListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
