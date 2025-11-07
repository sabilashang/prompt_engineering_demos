/**
 * Presentation JavaScript
 * Handles navigation, content loading, and demo integration
 */

// Current section state
let currentSection = 1;
const totalSections = 7;

// Demo mapping with proper access methods
const demoMapping = {
    'ml_data_cleaning_demo': {
        name: 'ML Data Cleaning Demo',
        description: 'Upload a CSV file and let AI clean it automatically. Simple drag-and-drop interface.',
        type: 'web_app',
        url: 'http://localhost:5001',
        dashboardUrl: 'http://localhost:3000',
        port: 5001,
        instructions: 'Click the button to open the demo. Upload a CSV file and click "Clean CSV File" to see AI-powered data cleaning in action.'
    },
    'ml_model_eval_demo': {
        name: 'ML Model Evaluation Demo',
        description: 'Analyze model performance with AI-powered insights. One-click evaluation with visual metrics.',
        type: 'web_app',
        url: 'http://localhost:5003',
        dashboardUrl: 'http://localhost:3000',
        port: 5003,
        instructions: 'Click the button to open the demo. Click "Evaluate Model" to see AI analysis of model performance metrics.'
    },
    'mobile_ui_generation_demo': {
        name: 'Mobile UI Generation Demo',
        description: 'Generate React Native components from text descriptions. Simple text input interface.',
        type: 'web_app',
        url: 'http://localhost:5004',
        dashboardUrl: 'http://localhost:3000',
        port: 5004,
        instructions: 'Click the button to open the demo. Enter a description of the UI you want, then click "Generate UI Code" to see React Native code generated instantly.'
    },
    'backend_api_generation_demo': {
        name: 'Backend API Generation Demo',
        description: 'Generate Express.js REST API routes from descriptions. Simple and intuitive interface.',
        type: 'web_app',
        url: 'http://localhost:5005',
        dashboardUrl: 'http://localhost:3000',
        port: 5005,
        instructions: 'Click the button to open the demo. Describe the API endpoints you need, then click "Generate API Code" to get Express.js routes.'
    },
    'note_summarizer_app': {
        name: 'Note Summarizer App',
        description: 'Interactive web app for text summarization with beautiful UI. This is a Flask web app running on port 5002.',
        type: 'web_app',
        url: 'http://localhost:5002',
        dashboardUrl: 'http://localhost:3000',
        port: 5002,
        instructions: 'This demo runs as a Flask web app. Access it directly at http://localhost:5002 or use the dashboard.'
    },
    'json_generation': {
        name: 'JSON Generation Example',
        description: 'Generate structured JSON from natural language prompts. This is a conceptual example.',
        type: 'example',
        url: null,
        dashboardUrl: null,
        port: null,
        instructions: 'This is a conceptual example. You can try this with any LLM by providing a structured prompt.'
    },
    'visualization': {
        name: 'Visualization Code Generation',
        description: 'Generate matplotlib/seaborn visualization code from descriptions. This is a conceptual example.',
        type: 'example',
        url: null,
        dashboardUrl: null,
        port: null,
        instructions: 'This is a conceptual example. You can try this with any LLM by providing a prompt describing the visualization you want.'
    }
};

// Initialize presentation
document.addEventListener('DOMContentLoaded', () => {
    console.log('Presentation initializing...');
    initializePresentation();
    console.log('Loading section 1 content...');
    loadSectionContent(1);
    setupEventListeners();
    updateFooterButtons();
    console.log('Presentation initialized successfully');
});

/**
 * Initialize presentation
 */
function initializePresentation() {
    // Set initial active section
    updateNavigation();
    updateProgress();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = parseInt(link.getAttribute('data-section'));
            goToSection(section);
        });
    });

    // Sidebar toggle (mobile)
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            nextSection();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            previousSection();
        } else if (e.key === 'Escape') {
            closeDemoModal();
        }
    });

    // Close modal on background click
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeDemoModal();
            }
        });
    }
}

/**
 * Load section content
 */
function loadSectionContent(sectionNumber) {
    const contentId = `section-${sectionNumber}-content`;
    const contentElement = document.getElementById(contentId);

    if (!contentElement) {
        console.error(`Content element not found: ${contentId}`);
        return;
    }

    // Show loading state
    contentElement.innerHTML = '<div class="loading-message">Loading content...</div>';

    // Load content from section file
    const filePath = `sections/section-${sectionNumber}.html`;

    console.log(`Loading section ${sectionNumber} from: ${filePath}`);

    fetch(filePath)
        .then(response => {
            console.log(`Response status for section ${sectionNumber}:`, response.status);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: Failed to load section ${sectionNumber}`);
            }
            return response.text();
        })
        .then(html => {
            if (!html || html.trim().length === 0) {
                throw new Error(`Section ${sectionNumber} file is empty`);
            }

            console.log(`Section ${sectionNumber} content loaded, length: ${html.length} characters`);

            contentElement.innerHTML = html;

            // Re-attach demo button listeners after content load
            attachDemoListeners();

            console.log(`✓ Section ${sectionNumber} loaded successfully`);
        })
        .catch(error => {
            console.error(`Error loading section ${sectionNumber}:`, error);
            console.error(`Full error:`, error);

            // Try to provide helpful error message
            let errorMessage = error.message;
            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                errorMessage = 'Network error - Make sure you are using a web server (not opening file:// directly). Try: python -m http.server 8000';
            }

            contentElement.innerHTML = `
                <div class="error-message">
                    <h3>⚠️ Error Loading Content</h3>
                    <p><strong>Section ${sectionNumber}</strong> could not be loaded.</p>
                    <p><strong>Error:</strong> ${errorMessage}</p>
                    <p><strong>File path:</strong> ${filePath}</p>
                    <p><strong>Possible causes:</strong></p>
                    <ul>
                        <li>File doesn't exist at: <code>${filePath}</code></li>
                        <li>Not using a web server (try: <code>python -m http.server 8000</code>)</li>
                        <li>CORS issue (use a local web server, not file://)</li>
                        <li>Check browser console (F12) for more details</li>
                    </ul>
                    <p><strong>Solution:</strong> Make sure you're running a local web server and the file exists.</p>
                    <p style="margin-top: 1rem;"><strong>Quick Fix:</strong> Open terminal in session_content folder and run: <code>python -m http.server 8000</code></p>
                </div>
            `;
        });
}

/**
 * Attach demo button listeners
 */
function attachDemoListeners() {
    document.querySelectorAll('.btn-demo').forEach(button => {
        button.addEventListener('click', (e) => {
            const demoId = button.getAttribute('onclick')?.match(/showDemo\('([^']+)'\)/)?.[1];
            if (demoId) {
                showDemo(demoId);
            }
        });
    });
}

/**
 * Go to specific section
 */
function goToSection(sectionNumber) {
    if (sectionNumber < 1 || sectionNumber > totalSections) {
        return;
    }

    // Hide current section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show new section
    const newSection = document.getElementById(`section-${sectionNumber}`);
    if (newSection) {
        newSection.classList.add('active');
        currentSection = sectionNumber;

        // Always load content when navigating to a section
        const contentElement = document.getElementById(`section-${sectionNumber}-content`);
        if (contentElement) {
            // Check if content is already loaded (has actual content, not just comments or whitespace)
            const currentContent = contentElement.innerHTML.trim();

            // Check if we have real content (not just HTML comments or loading message)
            const hasRealContent = currentContent &&
                !currentContent.startsWith('<!--') &&
                currentContent !== '<div class="loading-message">Loading content...</div>' &&
                !currentContent.includes('⚠️ Error Loading Content') &&
                currentContent.length > 100; // Real content should be longer than 100 chars

            if (!hasRealContent) {
                console.log(`Loading content for section ${sectionNumber}...`);
                loadSectionContent(sectionNumber);
            } else {
                console.log(`Section ${sectionNumber} content already loaded`);
            }
        } else {
            console.error(`Content element not found for section ${sectionNumber}`);
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update navigation and progress
        updateNavigation();
        updateProgress();

        // Update footer buttons
        updateFooterButtons();
    }
}

/**
 * Go to next section
 */
function nextSection() {
    if (currentSection < totalSections) {
        goToSection(currentSection + 1);
    }
}

/**
 * Go to previous section
 */
function previousSection() {
    if (currentSection > 1) {
        goToSection(currentSection - 1);
    }
}

/**
 * Update navigation state
 */
function updateNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        const section = parseInt(link.getAttribute('data-section'));
        if (section === currentSection) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Update progress bar
 */
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentSectionSpan = document.getElementById('currentSection');

    if (progressFill) {
        const progress = (currentSection / totalSections) * 100;
        progressFill.style.width = `${progress}%`;
    }

    if (currentSectionSpan) {
        currentSectionSpan.textContent = currentSection;
    }
}

/**
 * Update footer buttons
 */
function updateFooterButtons() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
        const sectionNum = index + 1;
        const footer = section.querySelector('.section-footer');
        if (footer) {
            const prevBtn = footer.querySelector('.btn-secondary');
            const nextBtn = footer.querySelector('.btn-primary');

            if (prevBtn) {
                prevBtn.disabled = sectionNum === 1;
            }
            if (nextBtn) {
                nextBtn.disabled = sectionNum === totalSections;
                if (sectionNum === totalSections) {
                    nextBtn.textContent = 'Complete ✓';
                } else {
                    nextBtn.textContent = 'Next →';
                }
            }
        }
    });
}

/**
 * Show demo modal
 */
function showDemo(demoId) {
    const demo = demoMapping[demoId];
    if (!demo) {
        console.error(`Demo not found: ${demoId}`);
        return;
    }

    const modal = document.getElementById('demoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const openDemoBtn = document.getElementById('openDemoBtn');

    if (modal && modalTitle && modalDescription && openDemoBtn) {
        modalTitle.textContent = demo.name;
        modalDescription.textContent = demo.description;

        // Store current demo ID
        openDemoBtn.setAttribute('data-demo-id', demoId);

        modal.classList.add('active');
    }
}

/**
 * Open demo
 */
function openDemo() {
    const openDemoBtn = document.getElementById('openDemoBtn');
    const demoId = openDemoBtn?.getAttribute('data-demo-id');

    if (!demoId) {
        return;
    }

    const demo = demoMapping[demoId];
    if (!demo) {
        return;
    }

    // Close modal
    closeDemoModal();

    // Handle different demo types
    if (demo.type === 'web_app' && demo.url) {
        // Web apps: Open direct URL and dashboard
        window.open(demo.url, '_blank');
        if (demo.dashboardUrl) {
            setTimeout(() => {
                window.open(demo.dashboardUrl, '_blank');
            }, 500);
        }
        showToast(`Opening ${demo.name} at ${demo.url}`, 'info');
    } else if (demo.type === 'cli' && demo.dashboardUrl) {
        // CLI scripts: Open dashboard
        window.open(demo.dashboardUrl, '_blank');
        showToast(`Opening dashboard. Use it to run ${demo.name}`, 'info');
    } else if (demo.type === 'example') {
        // Examples: Show instructions
        alert(`${demo.name}\n\n${demo.instructions}`);
    } else {
        // Fallback: Open dashboard
        if (demo.dashboardUrl) {
            window.open(demo.dashboardUrl, '_blank');
            showToast(`Opening dashboard for ${demo.name}`, 'info');
        } else {
            alert(`${demo.name}\n\n${demo.instructions || 'This demo is not yet available.'}`);
        }
    }
}

/**
 * Close demo modal
 */
function closeDemoModal() {
    const modal = document.getElementById('demoModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    // Set message and type
    toast.textContent = message;
    toast.className = `toast toast-${type}`;
    toast.style.display = 'block';

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.style.display = 'none';
        }, 300);
    }, 3000);
}

// Make functions globally available
window.nextSection = nextSection;
window.previousSection = previousSection;
window.showDemo = showDemo;
window.openDemo = openDemo;
window.closeDemoModal = closeDemoModal;
window.showToast = showToast;

