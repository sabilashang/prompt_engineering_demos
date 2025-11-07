@echo off
REM Start All Servers for Prompt Engineering Session
REM This script starts all demo servers and the session content

echo ======================================================================
echo Starting All Servers for Prompt Engineering Session
echo ======================================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 14 or higher.
    pause
    exit /b 1
)

echo [OK] Prerequisites checked
echo.

REM Change to project root
cd /d "%~dp0"

echo ======================================================================
echo Starting Dashboard (Port 3000)
echo ======================================================================
start "Dashboard" cmd /k "cd dashboard && npm start"
timeout /t 3 /nobreak >nul

echo ======================================================================
echo Starting ML Data Cleaning Demo (Port 5001)
echo ======================================================================
start "ML Data Cleaning" cmd /k "cd ml_data_cleaning_demo && python app.py"
timeout /t 2 /nobreak >nul

echo ======================================================================
echo Starting ML Model Evaluation Demo (Port 5003)
echo ======================================================================
start "ML Model Evaluation" cmd /k "cd ml_model_eval_demo && python app.py"
timeout /t 2 /nobreak >nul

echo ======================================================================
echo Starting Note Summarizer App (Port 5002)
echo ======================================================================
start "Note Summarizer" cmd /k "cd note_summarizer_app && python main.py"
timeout /t 2 /nobreak >nul

echo ======================================================================
echo Starting Mobile UI Generation Demo (Port 5004)
echo ======================================================================
start "Mobile UI Generation" cmd /k "cd mobile_ui_generation_demo && node server.js"
timeout /t 2 /nobreak >nul

echo ======================================================================
echo Starting Backend API Generation Demo (Port 5005)
echo ======================================================================
start "Backend API Generation" cmd /k "cd backend_api_generation_demo && node server.js"
timeout /t 2 /nobreak >nul

echo ======================================================================
echo Starting Session Content Server (Port 8000)
echo ======================================================================
start "Session Content" cmd /k "cd session_content && python -m http.server 8000"
timeout /t 2 /nobreak >nul

echo.
echo ======================================================================
echo All Servers Started!
echo ======================================================================
echo.
echo Services running on:
echo   - Dashboard:           http://localhost:3000
echo   - ML Data Cleaning:   http://localhost:5001
echo   - ML Model Evaluation: http://localhost:5003
echo   - Note Summarizer:    http://localhost:5002
echo   - Mobile UI Gen:      http://localhost:5004
echo   - Backend API Gen:    http://localhost:5005
echo   - Session Content:    http://localhost:8000
echo.
echo Opening Session Content in browser...
echo.
timeout /t 5 /nobreak >nul
start http://localhost:8000

echo.
echo ======================================================================
echo All servers are running in separate windows.
echo Close the windows to stop the servers.
echo ======================================================================
echo.
pause

