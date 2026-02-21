🚀 VectorShift Frontend Technical Assessment
📌 Overview

This project implements a visual pipeline builder using React and FastAPI.

The application allows users to create node-based workflows, connect them via edges, and validate the pipeline structure through backend analysis.

The assessment focuses on:

Component abstraction

Dynamic UI behavior

Interface styling

Backend graph validation

✅ Implemented Features

✔ Reusable Node Abstraction using a BaseNode component
✔ Multiple Node Types

Input

Output

LLM

Text

Math

Logger

Delay

Condition

API Call

✔ Unified & Consistent UI Styling
✔ Auto-Resizing Text Node
✔ Dynamic Variable Handle Generation using {{variable}} syntax
✔ Frontend → Backend Integration
✔ Pipeline Validation via DAG (Directed Acyclic Graph) Detection

🛠 Tech Stack

Frontend

React

React Flow

Backend

Python

FastAPI

▶️ Getting Started
1️⃣ Run Frontend
cd frontend
npm install
npm start

Frontend runs at:

👉 http://localhost:3000

2️⃣ Run Backend
cd backend
uvicorn main:app --reload

Backend API runs at:

👉 http://localhost:8000

🔍 Pipeline Validation

When a pipeline is submitted:

The frontend sends nodes and edges to the backend.

The backend performs graph analysis.

Backend Responsibilities

Calculates number of nodes

Calculates number of edges

Checks if the graph forms a Directed Acyclic Graph (DAG)

Example Response
{
  "num_nodes": 5,
  "num_edges": 6,
  "is_dag": true
}
🎯 Design Principles

This implementation emphasizes:

Component Reusability

Minimal Code Duplication

Dynamic UI Behavior

Clear Separation of Concerns

Maintainable Structure

✨ Key Highlights

✔ Clean node abstraction architecture
✔ Scalable node system
✔ Dynamic handle generation
✔ Smooth frontend-backend interaction
✔ Graph-based validation logic
