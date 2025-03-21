const fs = require('fs');
const path = require('path');

// Function to update the frontend environment with the backend port
const updateFrontendPort = (port) => {
    try {
        const envPath = path.join(__dirname, '../client/.env');
        const envContent = `VITE_API_PORT=${port}\n`;
        
        fs.writeFileSync(envPath, envContent);
        console.log(`Updated frontend environment with port ${port}`);
    } catch (error) {
        console.error('Error updating frontend port:', error);
    }
};

// Function to read port from backend env
const readBackendPort = (envPath) => {
    try {
        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            const portMatch = envContent.match(/PORT=(\d+)/);
            return portMatch ? portMatch[1] : null;
        }
    } catch (error) {
        console.error('Error reading backend port:', error);
    }
    return null;
};

// Watch for port changes in the backend
const watchBackendPort = () => {
    const backendEnvPath = path.join(__dirname, '../.env');
    
    // Initial port update
    const initialPort = readBackendPort(backendEnvPath);
    if (initialPort) {
        updateFrontendPort(initialPort);
    }

    // Watch for changes
    fs.watch(backendEnvPath, (eventType, filename) => {
        if (eventType === 'change') {
            const port = readBackendPort(backendEnvPath);
            if (port) {
                updateFrontendPort(port);
            }
        }
    });

    // Handle errors
    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error);
    });

    process.on('unhandledRejection', (error) => {
        console.error('Unhandled Rejection:', error);
    });
};

// Start watching for changes
watchBackendPort(); 