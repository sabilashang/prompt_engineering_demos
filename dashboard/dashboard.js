/**
 * Dashboard JavaScript - Prompt Engineering Demos
 * Interactive dashboard for managing and running demos
 */

// Global state
let currentFile = null;
let currentDemo = null;

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    setupEventListeners();
    checkDemoStatuses();
    showToast('Dashboard loaded successfully!', 'success');
});

/**
 * Dark Mode Toggle
 */
function initDarkMode() {
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').textContent = '☀️';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    document.getElementById('darkModeToggle').textContent = isDark ? '☀️' : '🌙';
    showToast(`${isDark ? 'Dark' : 'Light'} mode enabled`, 'info');
}

/**
 * Event Listeners
 */
function setupEventListeners() {
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    document.getElementById('refreshBtn').addEventListener('click', () => {
        checkDemoStatuses();
        showToast('Refreshed demo statuses', 'info');
    });
}

/**
 * Run Demo
 */
async function runDemo(demoName) {
    showToast(`Starting ${demoName}...`, 'info');
    
    const statusIndicator = document.getElementById(`status-${demoName}`);
    const terminalSection = document.getElementById('terminal');
    const terminalOutput = document.getElementById('terminalOutput');
    
    // Show terminal
    terminalSection.style.display = 'block';
    terminalOutput.textContent = `Running ${demoName}...\n\n`;
    
    // Update status
    statusIndicator.classList.add('running');
    statusIndicator.parentElement.querySelector('.status-text').textContent = 'Running';
    
    try {
        const response = await fetch(`/api/run/${demoName}`, {
            method: 'POST'
        });
        
        const data = await response.json();
        
        if (data.success) {
            terminalOutput.textContent += data.output || 'Demo executed successfully!\n';
            terminalOutput.textContent += '\n' + '-'.repeat(60) + '\n';
            terminalOutput.textContent += 'Output: ' + (data.message || 'Completed') + '\n';
            
            if (data.outputFile) {
                terminalOutput.textContent += `\nOutput saved to: ${data.outputFile}\n`;
            }
            
            showToast(`${demoName} executed successfully!`, 'success');
            
            // Reset status after delay
            setTimeout(() => {
                statusIndicator.classList.remove('running');
                statusIndicator.parentElement.querySelector('.status-text').textContent = 'Not Running';
            }, 3000);
        } else {
            throw new Error(data.error || 'Unknown error');
        }
    } catch (error) {
        terminalOutput.textContent += `\n❌ Error: ${error.message}\n`;
        statusIndicator.classList.remove('running');
        statusIndicator.classList.add('error');
        statusIndicator.parentElement.querySelector('.status-text').textContent = 'Error';
        showToast(`Error running ${demoName}: ${error.message}`, 'error');
        
        setTimeout(() => {
            statusIndicator.classList.remove('error');
            statusIndicator.parentElement.querySelector('.status-text').textContent = 'Not Running';
        }, 5000);
    }
    
    // Scroll terminal into view
    terminalSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Open Demo (for web apps)
 */
function openDemo(demoName) {
    const ports = {
        'ml_data_cleaning_demo': 5001,
        'note_summarizer_app': 5002
    };
    
    const port = ports[demoName];
    
    if (port) {
        showToast(`Opening ${demoName} in new tab...`, 'info');
        window.open(`http://localhost:${port}`, '_blank');
    } else {
        runDemo(demoName);
    }
}

/**
 * View Code
 */
async function viewCode(demoName, fileName) {
    currentDemo = demoName;
    currentFile = fileName;
    
    const modal = document.getElementById('codeModal');
    const modalTitle = document.getElementById('modalTitle');
    const fileNameSpan = document.getElementById('fileName');
    const codeEditor = document.getElementById('codeEditor');
    const lineCount = document.getElementById('lineCount');
    
    modalTitle.textContent = `Code Viewer - ${demoName}`;
    fileNameSpan.textContent = fileName;
    codeEditor.value = 'Loading...';
    
    modal.classList.add('active');
    
    try {
        const response = await fetch(`/api/view?demo=${demoName}&file=${fileName}`);
        const data = await response.json();
        
        if (data.success) {
            codeEditor.value = data.content;
            const lines = data.content.split('\n').length;
            lineCount.textContent = `${lines} lines`;
        } else {
            throw new Error(data.error || 'Failed to load file');
        }
    } catch (error) {
        codeEditor.value = `Error loading file: ${error.message}`;
        showToast(`Error loading file: ${error.message}`, 'error');
    }
}

/**
 * View README
 */
async function viewReadme(demoName) {
    await viewCode(demoName, 'README.md');
}

/**
 * Save Code
 */
async function saveCode() {
    const codeEditor = document.getElementById('codeEditor');
    const content = codeEditor.value;
    
    if (!currentDemo || !currentFile) {
        showToast('No file loaded', 'error');
        return;
    }
    
    showToast('Saving changes...', 'info');
    
    try {
        const response = await fetch('/api/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                demo: currentDemo,
                file: currentFile,
                content: content
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('File saved successfully!', 'success');
        } else {
            throw new Error(data.error || 'Failed to save file');
        }
    } catch (error) {
        showToast(`Error saving file: ${error.message}`, 'error');
    }
}

/**
 * Copy Code
 */
function copyCode() {
    const codeEditor = document.getElementById('codeEditor');
    codeEditor.select();
    document.execCommand('copy');
    showToast('Code copied to clipboard!', 'success');
}

/**
 * Close Modal
 */
function closeModal() {
    const modal = document.getElementById('codeModal');
    modal.classList.remove('active');
    currentDemo = null;
    currentFile = null;
}

/**
 * Terminal Functions
 */
function clearTerminal() {
    document.getElementById('terminalOutput').textContent = '';
}

function closeTerminal() {
    document.getElementById('terminal').style.display = 'none';
}

/**
 * Check Demo Statuses
 */
async function checkDemoStatuses() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        if (data.success && data.demos) {
            Object.keys(data.demos).forEach(demoName => {
                const status = data.demos[demoName];
                const statusIndicator = document.getElementById(`status-${demoName}`);
                
                if (statusIndicator) {
                    if (status.running) {
                        statusIndicator.classList.add('running');
                        statusIndicator.parentElement.querySelector('.status-text').textContent = 'Running';
                    } else {
                        statusIndicator.classList.remove('running');
                        statusIndicator.parentElement.querySelector('.status-text').textContent = 'Not Running';
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error checking demo statuses:', error);
    }
}

/**
 * Toast Notifications
 */
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * List Files (utility function)
 */
async function listFiles(demoName) {
    try {
        const response = await fetch(`/api/list?demo=${demoName}`);
        const data = await response.json();
        
        if (data.success) {
            return data.files;
        }
    } catch (error) {
        console.error('Error listing files:', error);
    }
    return [];
}

/**
 * Keyboard Shortcuts
 */
document.addEventListener('keydown', (e) => {
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Ctrl/Cmd + S to save (in modal)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        if (document.getElementById('codeModal').classList.contains('active')) {
            e.preventDefault();
            saveCode();
        }
    }
});

/**
 * Auto-refresh status every 30 seconds
 */
setInterval(checkDemoStatuses, 30000);

// Export functions for global access
window.runDemo = runDemo;
window.openDemo = openDemo;
window.viewCode = viewCode;
window.viewReadme = viewReadme;
window.saveCode = saveCode;
window.copyCode = copyCode;
window.closeModal = closeModal;
window.clearTerminal = clearTerminal;
window.closeTerminal = closeTerminal;

