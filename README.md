# Spring PetClinic — React 19 Frontend

React 19 + Vite + TypeScript frontend for the [Spring PetClinic REST](https://github.com/spring-petclinic/spring-petclinic-rest) backend.

> **Note:** The original Angular 16 version is available on the `main` branch.

## Tech Stack

- **React 19** with TypeScript (strict mode)
- **Vite 6** for dev server & production builds
- **React Router v7** for client-side routing
- **Bootstrap 5** via `react-bootstrap` for UI components
- **Axios** for HTTP communication with the REST API
- **react-datepicker** for date fields
- **react-icons** for iconography
- **ESLint 9** (flat config) + **Prettier** for code quality

## Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10
- The [Spring PetClinic REST](https://github.com/spring-petclinic/spring-petclinic-rest) backend running on `http://localhost:9966`

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4200/petclinic)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint

# Format
npm run format

# Run tests
npm run test
```

## Docker

```bash
# Build
docker build -t spring-petclinic-react:latest .

# Run
docker run --rm -p 8080:8080 spring-petclinic-react:latest
```

The app is served at `http://localhost:8080/petclinic/`.

## Project Structure

```
src/
├── api/            # Axios HTTP client & API service modules
├── components/     # Shared components (Layout, ErrorAlert, LoadingSpinner, ConfirmDialog)
├── hooks/          # Custom hooks (useApi)
├── pages/          # Page components organized by domain
│   ├── owners/     # Owner CRUD pages
│   ├── pets/       # Pet add/edit pages
│   ├── visits/     # Visit add/edit pages
│   ├── vets/       # Vet CRUD pages
│   ├── pettypes/   # Pet type inline-editable list
│   └── specialties/# Specialty inline-editable list
├── types/          # TypeScript interfaces
├── App.tsx         # Router configuration
└── main.tsx        # Entry point
```

## Screens (15 total)

| # | Screen | Route |
|---|--------|-------|
| 1 | Welcome | `/` |
| 2 | Owner List | `/owners` |
| 3 | Add Owner | `/owners/add` |
| 4 | Owner Detail | `/owners/:id` |
| 5 | Edit Owner | `/owners/:id/edit` |
| 6 | Add Pet | `/owners/:id/pets/add` |
| 7 | Edit Pet | `/owners/:id/pets/:petId/edit` |
| 8 | Add Visit | `/owners/:id/pets/:petId/visits/add` |
| 9 | Edit Visit | `/owners/:id/pets/:petId/visits/:visitId/edit` |
| 10 | Vet List | `/vets` |
| 11 | Add Vet | `/vets/add` |
| 12 | Edit Vet | `/vets/:id/edit` |
| 13 | Pet Types | `/pettypes` |
| 14 | Specialties | `/specialties` |
| 15 | 404 | `*` |
