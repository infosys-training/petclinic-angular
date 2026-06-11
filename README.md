# Spring PetClinic — React Frontend

A React 19 frontend for the [Spring PetClinic REST](https://github.com/spring-petclinic/spring-petclinic-rest) backend.

> **Note:** The original Angular 16 version is preserved on the `main` branch.

## Tech Stack

- **React 19** with TypeScript
- **Vite** — build tool and dev server
- **React Router v7** — client-side routing
- **Bootstrap 5** via `react-bootstrap` — UI components
- **Axios** — HTTP client
- **react-datepicker** — date picker component
- **react-icons** — icon library

## Prerequisites

- Node.js 20+
- npm 10+
- The Spring PetClinic REST backend running at `http://localhost:9966/petclinic/api/`

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:4200/petclinic)
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:9966/petclinic/api/` | Backend REST API base URL |

Create a `.env.local` file to override defaults.

## Docker

```bash
# Build the image
docker build -t petclinic-react:latest .

# Run
docker run --rm -p 8080:8080 petclinic-react:latest
```

The app will be available at `http://localhost:8080/petclinic/`.

## Project Structure

```
src/
├── api/          # Axios HTTP client and API service modules
├── components/   # Shared UI components (Layout, ErrorAlert, etc.)
├── hooks/        # Custom React hooks (useApi)
├── pages/        # Route-level page components
│   ├── owners/
│   ├── pets/
│   ├── visits/
│   ├── vets/
│   ├── pettypes/
│   └── specialties/
├── types/        # TypeScript interfaces
├── App.tsx       # Root component with routes
└── main.tsx      # Entry point
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run tests with Vitest |

## License

Apache License 2.0 — see the original [spring-petclinic-angular](https://github.com/spring-petclinic/spring-petclinic-angular) project.
