@echo off
REM Prompt Engineering Demos - Installation Script (Windows)
REM This script automates the setup process

echo ======================================================================
echo Prompt Engineering Demos - Installation Script (Windows)
echo ======================================================================
echo.

REM Check if Python is installed
echo Checking prerequisites...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)
echo [OK] Python found

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 14 or higher.
    pause
    exit /b 1
)
echo [OK] Node.js found

REM Check if npm is installed
call npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed. Please install npm.
    pause
    exit /b 1
)
echo [OK] npm found

echo.
echo ======================================================================
echo Step 1: Setting up environment variables
echo ======================================================================
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    copy env.example .env >nul 2>&1
    if errorlevel 1 (
        echo [WARNING] Could not create .env file automatically
        echo Please copy env.example to .env manually
    ) else (
        echo [OK] Created .env file
        echo [ACTION REQUIRED] Please edit .env and add your OpenRouter API key!
    )
) else (
    echo [INFO] .env file already exists, skipping...
)

echo.
echo ======================================================================
echo Step 2: Installing Python dependencies
echo ======================================================================
echo.
echo This may take a few minutes...
echo.

echo [1/3] Installing ML Data Cleaning Demo dependencies...
pip install -q -r ml_data_cleaning_demo\requirements.txt
if errorlevel 1 (
    echo [WARNING] Some packages may have failed to install
) else (
    echo [OK] ML Data Cleaning Demo
)

echo [2/3] Installing ML Model Evaluation Demo dependencies...
pip install -q -r ml_model_eval_demo\requirements.txt
if errorlevel 1 (
    echo [WARNING] Some packages may have failed to install
) else (
    echo [OK] ML Model Evaluation Demo
)

echo [3/3] Installing Note Summarizer App dependencies...
pip install -q -r note_summarizer_app\requirements.txt
if errorlevel 1 (
    echo [WARNING] Some packages may have failed to install
) else (
    echo [OK] Note Summarizer App
)

echo.
echo ======================================================================
echo Step 3: Installing Node.js dependencies
echo ======================================================================
echo.
echo This may take a few minutes...
echo.

echo [1/3] Installing Mobile UI Generation Demo dependencies...
cd mobile_ui_generation_demo
call npm install --silent
cd ..
echo [OK] Mobile UI Generation Demo

echo [2/3] Installing Backend API Generation Demo dependencies...
cd backend_api_generation_demo
call npm install --silent
cd ..
echo [OK] Backend API Generation Demo

echo [3/3] Installing Dashboard dependencies...
cd dashboard
call npm install --silent
cd ..
echo [OK] Dashboard

echo.
echo ======================================================================
echo Installation Complete!
echo ======================================================================
echo.
echo NEXT STEPS:
echo.
echo 1. Edit .env file and add your OpenRouter API key:
echo    - Open .env in a text editor
echo    - Replace 'your_openrouter_api_key_here' with your actual key
echo.
echo 2. Start the dashboard:
echo    cd dashboard
echo    npm start
echo.
echo 3. Open your browser to: http://localhost:3000
echo.
echo.
echo For more information, see:
echo   - README.md (Main documentation)
echo   - SETUP.md (Setup guide)
echo   - QUICK_REFERENCE.md (Command reference)
echo.
echo ======================================================================
echo Happy prompt engineering!
echo ======================================================================
echo.
pause

