/**
 * Dashboard Server - Express.js
 * Serves the dashboard and provides API endpoints for running demos
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Base directory for demos
const BASE_DIR = path.join(__dirname, '..');

// Demo configurations
const DEMOS = {
    ml_data_cleaning_demo: {
        name: 'ML Data Cleaning Demo',
        type: 'python',
        main: 'app.py',
        port: 5001
    },
    ml_model_eval_demo: {
        name: 'ML Model Evaluation Demo',
        type: 'python',
        main: 'evaluate.py'
    },
    mobile_ui_generation_demo: {
        name: 'Mobile UI Generation Demo',
        type: 'node',
        main: 'generate_ui.js'
    },
    backend_api_generation_demo: {
        name: 'Backend API Generation Demo',
        type: 'node',
        main: 'generate_api.js'
    },
    note_summarizer_app: {
        name: 'Note Summarizer App',
        type: 'python',
        main: 'main.py',
        port: 5002
    }
};

// Store running processes
const runningProcesses = {};

/**
 * Home route - serve dashboard
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * API Info endpoint
 */
app.get('/api/info', (req, res) => {
    res.json({
        service: 'Prompt Engineering Demos Dashboard',
        version: '1.0.0',
        demos: Object.keys(DEMOS).length,
        endpoints: {
            '/': 'Dashboard home',
            '/api/info': 'API information',
            '/api/list': 'List demo files',
            '/api/view': 'View file contents',
            '/api/save': 'Save file changes',
            '/api/run/:demo': 'Run a demo',
            '/api/status': 'Check demo statuses'
        }
    });
});

/**
 * List files in a demo directory
 */
app.get('/api/list', (req, res) => {
    const demoName = req.query.demo;
    
    if (!demoName || !DEMOS[demoName]) {
        return res.status(400).json({
            success: false,
            error: 'Invalid demo name'
        });
    }
    
    const demoPath = path.join(BASE_DIR, demoName);
    
    try {
        const files = getAllFiles(demoPath);
        res.json({
            success: true,
            demo: demoName,
            files: files
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * View file contents
 */
app.get('/api/view', (req, res) => {
    const demoName = req.query.demo;
    const fileName = req.query.file;
    
    if (!demoName || !fileName) {
        return res.status(400).json({
            success: false,
            error: 'Demo name and file name required'
        });
    }
    
    if (!DEMOS[demoName]) {
        return res.status(400).json({
            success: false,
            error: 'Invalid demo name'
        });
    }
    
    const filePath = path.join(BASE_DIR, demoName, fileName);
    
    // Security check - ensure file is within demo directory
    if (!filePath.startsWith(path.join(BASE_DIR, demoName))) {
        return res.status(403).json({
            success: false,
            error: 'Access denied'
        });
    }
    
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        res.json({
            success: true,
            content: content,
            file: fileName
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            error: `File not found: ${error.message}`
        });
    }
});

/**
 * Save file changes
 */
app.post('/api/save', (req, res) => {
    const { demo, file, content } = req.body;
    
    if (!demo || !file || content === undefined) {
        return res.status(400).json({
            success: false,
            error: 'Demo, file, and content required'
        });
    }
    
    if (!DEMOS[demo]) {
        return res.status(400).json({
            success: false,
            error: 'Invalid demo name'
        });
    }
    
    const filePath = path.join(BASE_DIR, demo, file);
    
    // Security check
    if (!filePath.startsWith(path.join(BASE_DIR, demo))) {
        return res.status(403).json({
            success: false,
            error: 'Access denied'
        });
    }
    
    try {
        fs.writeFileSync(filePath, content, 'utf-8');
        res.json({
            success: true,
            message: 'File saved successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Failed to save file: ${error.message}`
        });
    }
});

/**
 * Run a demo
 */
app.post('/api/run/:demo', async (req, res) => {
    const demoName = req.params.demo;
    
    if (!DEMOS[demoName]) {
        return res.status(400).json({
            success: false,
            error: 'Invalid demo name'
        });
    }
    
    const demo = DEMOS[demoName];
    const demoPath = path.join(BASE_DIR, demoName);
    
    try {
        let output = '';
        let errorOutput = '';
        
        // Determine command based on demo type
        let command, args;
        
        if (demo.type === 'python') {
            command = 'python';
            args = [demo.main];
        } else if (demo.type === 'node') {
            command = 'node';
            args = [demo.main];
        } else {
            throw new Error('Unknown demo type');
        }
        
        // For CLI scripts, run and wait for completion
        const childProcess = spawn(command, args, {
            cwd: demoPath,
            shell: true
        });
        
        // Collect output
        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });
        
        childProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });
        
        // Handle completion
        childProcess.on('close', (code) => {
            if (code === 0) {
                // Success
                const result = {
                    success: true,
                    message: `${demo.name} executed successfully`,
                    output: output,
                    demo: demoName
                };
                
                // Check for output files
                if (demoName === 'mobile_ui_generation_demo') {
                    result.outputFile = 'output/LoginScreen.js';
                } else if (demoName === 'backend_api_generation_demo') {
                    result.outputFile = 'routes/generated.js';
                } else if (demoName === 'ml_model_eval_demo') {
                    result.outputFile = 'evaluation_summary.txt';
                }
                
                // Don't send response if already sent
                if (!res.headersSent) {
                    res.json(result);
                }
            } else {
                // Error
                if (!res.headersSent) {
                    res.status(500).json({
                        success: false,
                        error: `Demo failed with code ${code}`,
                        output: errorOutput || output
                    });
                }
            }
        });
        
        childProcess.on('error', (error) => {
            if (!res.headersSent) {
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
        });
        
        // Set timeout for long-running processes
        setTimeout(() => {
            if (!res.headersSent) {
                res.json({
                    success: true,
                    message: `${demo.name} is running (this may take a while)`,
                    output: output,
                    demo: demoName
                });
            }
        }, 2000);
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * Check status of demos
 */
app.get('/api/status', (req, res) => {
    const statuses = {};
    
    Object.keys(DEMOS).forEach(demoName => {
        statuses[demoName] = {
            name: DEMOS[demoName].name,
            running: !!runningProcesses[demoName],
            type: DEMOS[demoName].type
        };
    });
    
    res.json({
        success: true,
        demos: statuses
    });
});

/**
 * Helper function to get all files in a directory
 */
function getAllFiles(dirPath, arrayOfFiles = [], relativePath = '') {
    try {
        const files = fs.readdirSync(dirPath);
        
        files.forEach((file) => {
            // Skip common ignore patterns
            if (file.startsWith('.') || 
                file === 'node_modules' || 
                file === '__pycache__' ||
                file === 'venv' ||
                file === 'uploads') {
                return;
            }
            
            const fullPath = path.join(dirPath, file);
            const relPath = path.join(relativePath, file);
            
            if (fs.statSync(fullPath).isDirectory()) {
                getAllFiles(fullPath, arrayOfFiles, relPath);
            } else {
                arrayOfFiles.push(relPath);
            }
        });
        
        return arrayOfFiles;
    } catch (error) {
        return arrayOfFiles;
    }
}

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

/**
 * Start server
 */
app.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🚀 Prompt Engineering Demos Dashboard');
    console.log('='.repeat(60));
    console.log(`\n✅ Server running on http://localhost:${PORT}`);
    console.log(`\n📦 Available Demos: ${Object.keys(DEMOS).length}`);
    Object.keys(DEMOS).forEach(demo => {
        console.log(`   - ${DEMOS[demo].name}`);
    });
    console.log('\n💡 Open your browser and navigate to the URL above');
    console.log('\n' + '='.repeat(60) + '\n');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down server...');
    
    // Kill all running processes
    Object.keys(runningProcesses).forEach(demo => {
        if (runningProcesses[demo]) {
            runningProcesses[demo].kill();
        }
    });
    
    process.exit(0);
});

