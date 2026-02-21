🚀 VectorShift Frontend Technical Assessment
✨ Overview

This project implements a visual pipeline builder using React and FastAPI.

The application allows users to create node-based workflows, connect them through edges, and validate pipeline structure via backend analysis.

The assessment focuses on:

• Component abstraction
• Dynamic UI behavior
• Interface styling
• Backend graph validation

🧩 Implemented Features

✅ Reusable node abstraction using a BaseNode component
✅ Multiple node types (Input, Output, LLM, Text, Math, Logger, Delay, Condition, API Call)
✅ Unified and consistent UI styling
✅ Auto-resizing Text node
✅ Dynamic variable handle generation using {{variable}} syntax
✅ Frontend → Backend integration
✅ Pipeline validation via DAG (Directed Acyclic Graph) detection

🛠 Tech Stack

Frontend
React • React Flow

Backend
Python • FastAPI

▶️ How to Run the Project
Frontend
cd frontend
npm install
npm start

Application → http://localhost:3000

Backend
cd backend
uvicorn main:app --reload

API → http://localhost:8000

🔎 Pipeline Validation

When submitting a pipeline, the frontend sends the nodes and edges to the backend.

The backend:

• Calculates the number of nodes
• Calculates the number of edges
• Checks whether the graph forms a Directed Acyclic Graph (DAG)

📡 Backend Response Format
{
  "num_nodes": 5,
  "num_edges": 6,
  "is_dag": true
}
🎯 Key Design Considerations

This implementation emphasizes:

• Component reusability
• Minimal code duplication
• Dynamic UI behavior
• Clear separation of concerns
• Maintainable structure
