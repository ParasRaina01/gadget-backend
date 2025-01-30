# IMF Gadget Inventory API

A RESTful API for managing IMF's gadget inventory. Built with Node.js, Express, and PostgreSQL.

## Features

- JWT Authentication
- CRUD operations for gadgets
- Status filtering
- Random gadget name generation
- Mission success probability calculation
- Self-destruct simulation

## API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Gadgets
```
GET    /api/gadgets          # List all gadgets (with optional status filter)
POST   /api/gadgets          # Create a new gadget
PATCH  /api/gadgets/:id      # Update a gadget
DELETE /api/gadgets/:id      # Decommission a gadget
POST   /api/gadgets/:id/self-destruct  # Initiate self-destruct sequence
```

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```
   DATABASE_URL="your-postgresql-url"
   PORT=3000
   JWT_SECRET="your-secret-key"
   ```

4. Run migrations:
   ```bash
   npm run prisma:migrate
   ```

5. Start the server:
   ```bash
   npm run dev    # Development
   npm start      # Production
   ```

## Example Requests

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "email": "agent@imf.com",
  "password": "secret123"
}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "agent@imf.com",
  "password": "secret123"
}'
```

### Create Gadget
```bash
curl -X POST http://localhost:3000/api/gadgets \
-H "Authorization: Bearer YOUR_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "name": "Quantum Decoder"
}'
```

## Gadget Statuses
- Available
- Deployed
- Destroyed
- Decommissioned

## Live Demo
API is deployed at: https://gadget-backend-ybz5.onrender.com 