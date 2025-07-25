# automation-project-app
React + Node.js Todo App with Cypress and Test automation

Includes automated tests for:
- UI (using Cypress)
- API (using Jest + Supertest)
---
## Project Structure

Automation-project-app/
├── my-test-project-frontend/ # React frontend
├── my-test-project-backend/ # Node.js backend API
├── TestPlan.pdf # Test Plan

---
## Set up and execution

### Prerequisites
- Node.js (v16+ recommended)
- npm (comes with Node.js)

### 1. Start Backend Server
cd backend
npm install       # Install dependencies
node server.js    # Start the server (runs at http://localhost:5000)

### 2. Start Frontend App

Open a new terminal
cd frontend
npm install       # Install dependencies
npm start         # Runs at http://localhost:3000

### 3. Run Tests

## API Tests
cd backend
npm test

## UI Tests
cd frontend
npx cypress open

