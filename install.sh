#!/bin/bash

# Prompt Engineering Demos - Installation Script
# This script automates the setup process

echo "======================================================================"
echo "🚀 Prompt Engineering Demos - Installation Script"
echo "======================================================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Python is installed
echo "Checking prerequisites..."
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python is not installed. Please install Python 3.8 or higher.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Python found${NC}"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 14 or higher.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Node.js found${NC}"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ npm found${NC}"
fi

echo ""
echo "======================================================================"
echo "📋 Step 1: Setting up environment variables"
echo "======================================================================"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp env.example .env
    echo -e "${GREEN}✅ Created .env file${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env and add your OpenRouter API key!${NC}"
else
    echo -e "${YELLOW}⚠️  .env file already exists, skipping...${NC}"
fi

echo ""
echo "======================================================================"
echo "🐍 Step 2: Installing Python dependencies"
echo "======================================================================"

# Determine Python command
if command -v python3 &> /dev/null; then
    PYTHON_CMD=python3
    PIP_CMD=pip3
else
    PYTHON_CMD=python
    PIP_CMD=pip
fi

# Install Python dependencies for each demo
echo "Installing ML Data Cleaning Demo dependencies..."
$PIP_CMD install -r ml_data_cleaning_demo/requirements.txt
echo -e "${GREEN}✅ ML Data Cleaning Demo${NC}"

echo "Installing ML Model Evaluation Demo dependencies..."
$PIP_CMD install -r ml_model_eval_demo/requirements.txt
echo -e "${GREEN}✅ ML Model Evaluation Demo${NC}"

echo "Installing Note Summarizer App dependencies..."
$PIP_CMD install -r note_summarizer_app/requirements.txt
echo -e "${GREEN}✅ Note Summarizer App${NC}"

echo ""
echo "======================================================================"
echo "📦 Step 3: Installing Node.js dependencies"
echo "======================================================================"

# Install Node dependencies for each demo
echo "Installing Mobile UI Generation Demo dependencies..."
cd mobile_ui_generation_demo && npm install && cd ..
echo -e "${GREEN}✅ Mobile UI Generation Demo${NC}"

echo "Installing Backend API Generation Demo dependencies..."
cd backend_api_generation_demo && npm install && cd ..
echo -e "${GREEN}✅ Backend API Generation Demo${NC}"

echo "Installing Dashboard dependencies..."
cd dashboard && npm install && cd ..
echo -e "${GREEN}✅ Dashboard${NC}"

echo ""
echo "======================================================================"
echo "✅ Installation Complete!"
echo "======================================================================"
echo ""
echo "Next steps:"
echo "1. Edit .env file and add your OpenRouter API key"
echo "2. Run: cd dashboard && npm start"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For more information, see:"
echo "  - README.md (Main documentation)"
echo "  - SETUP.md (Setup guide)"
echo "  - QUICK_REFERENCE.md (Command reference)"
echo ""
echo "======================================================================"
echo "🎉 Happy prompt engineering!"
echo "======================================================================"

