#!/bin/bash
# Start All Servers for Prompt Engineering Session
# This script starts all demo servers and the session content

echo "======================================================================"
echo "Starting All Servers for Prompt Engineering Session"
echo "======================================================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed. Please install Node.js 14 or higher."
    exit 1
fi

echo "[OK] Prerequisites checked"
echo ""

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "======================================================================"
echo "Starting Dashboard (Port 3000)"
echo "======================================================================"
cd dashboard
npm start > /dev/null 2>&1 &
DASHBOARD_PID=$!
cd ..
sleep 2

echo "======================================================================"
echo "Starting ML Data Cleaning Demo (Port 5001)"
echo "======================================================================"
cd ml_data_cleaning_demo
python3 app.py > /dev/null 2>&1 &
CLEANING_PID=$!
cd ..
sleep 2

echo "======================================================================"
echo "Starting ML Model Evaluation Demo (Port 5003)"
echo "======================================================================"
cd ml_model_eval_demo
python3 app.py > /dev/null 2>&1 &
EVAL_PID=$!
cd ..
sleep 2

echo "======================================================================"
echo "Starting Note Summarizer App (Port 5002)"
echo "======================================================================"
cd note_summarizer_app
python3 main.py > /dev/null 2>&1 &
SUMMARIZER_PID=$!
cd ..
sleep 2

echo "======================================================================"
echo "Starting Mobile UI Generation Demo (Port 5004)"
echo "======================================================================"
cd mobile_ui_generation_demo
node server.js > /dev/null 2>&1 &
UI_PID=$!
cd ..
sleep 2

echo "======================================================================"
echo "Starting Backend API Generation Demo (Port 5005)"
echo "======================================================================"
cd backend_api_generation_demo
node server.js > /dev/null 2>&1 &
API_PID=$!
cd ..
sleep 2

echo "======================================================================"
echo "Starting Session Content Server (Port 8000)"
echo "======================================================================"
cd session_content
python3 -m http.server 8000 > /dev/null 2>&1 &
SESSION_PID=$!
cd ..
sleep 2

echo ""
echo "======================================================================"
echo "All Servers Started!"
echo "======================================================================"
echo ""
echo "Services running on:"
echo "  - Dashboard:           http://localhost:3000"
echo "  - ML Data Cleaning:   http://localhost:5001"
echo "  - ML Model Evaluation: http://localhost:5003"
echo "  - Note Summarizer:    http://localhost:5002"
echo "  - Mobile UI Gen:      http://localhost:5004"
echo "  - Backend API Gen:    http://localhost:5005"
echo "  - Session Content:    http://localhost:8000"
echo ""
echo "Opening Session Content in browser..."
echo ""

# Open browser (platform-specific)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    open http://localhost:8000
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open http://localhost:8000 2>/dev/null || sensible-browser http://localhost:8000 2>/dev/null
else
    echo "Please open http://localhost:8000 in your browser"
fi

echo ""
echo "======================================================================"
echo "All servers are running in the background."
echo "Press Ctrl+C to stop all servers."
echo "======================================================================"
echo ""

# Wait for interrupt
trap "kill $DASHBOARD_PID $CLEANING_PID $EVAL_PID $SUMMARIZER_PID $UI_PID $API_PID $SESSION_PID 2>/dev/null; exit" INT TERM

wait

