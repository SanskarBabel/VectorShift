🔧 Prerequisites
Make sure you have these installed:

Node.js (v16+) — download from nodejs.org
Python (v3.8+) — download from python.org (check "Add to PATH" during install)


🚀 Step 1 — Run the Backend
Open a terminal, navigate to the backend folder and run:
bashcd backend
pip install fastapi uvicorn
python -m uvicorn main:app --reload
```

You should see:
```
INFO: Uvicorn running on http://127.0.0.1:8000
Leave this terminal open.

🚀 Step 2 — Run the Frontend
Open a second terminal, navigate to the frontend folder and run:
bashcd frontend
npm install
npm start
```

You should see:
```
Compiled successfully!
Local: http://localhost:3000
The browser should open automatically at http://localhost:3000.

✅ Step 3 — Using the App

The canvas loads with a sample Input → LLM → Output pipeline
Click any button in the top toolbar to add a new node
Drag the handles on nodes to connect them
Click "Submit Pipeline" at the bottom to analyze the pipeline
A modal will appear showing number of nodes, edges, and whether it's a DAG


⚠️ Common Issues
ProblemFixuvicorn not recognizedUse python -m uvicorn main:app --reload insteadnpm not recognizedInstall Node.js from nodejs.orgModal shows "Connection Error"Make sure the backend is running on port 8000 before clicking SubmitPort 3000 already in useReact will ask to use another port — press Y to confirm