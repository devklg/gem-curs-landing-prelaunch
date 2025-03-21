const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/talk-fusion-enrollment', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/enrollment', require('./routes/enrollment'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Function to find an available port
const findAvailablePort = async (startPort) => {
    const net = require('net');
    
    const isPortAvailable = (port) => {
        return new Promise((resolve) => {
            const server = net.createServer();
            
            server.once('error', () => {
                resolve(false);
            });
            
            server.once('listening', () => {
                server.close();
                resolve(true);
            });
            
            server.listen(port);
        });
    };
    
    let port = startPort;
    while (!(await isPortAvailable(port))) {
        console.log(`Port ${port} is in use, trying ${port + 1}...`);
        port++;
    }
    return port;
};

// Function to update environment file
const updateEnvFile = (port) => {
    try {
        // Update root .env
        const rootEnvPath = path.join(__dirname, '.env');
        let rootEnvContent = '';
        
        if (fs.existsSync(rootEnvPath)) {
            rootEnvContent = fs.readFileSync(rootEnvPath, 'utf8');
        }
        
        // Update or add PORT
        if (rootEnvContent.includes('PORT=')) {
            rootEnvContent = rootEnvContent.replace(/PORT=\d+/, `PORT=${port}`);
        } else {
            rootEnvContent += `\nPORT=${port}`;
        }
        
        fs.writeFileSync(rootEnvPath, rootEnvContent);
        console.log(`Updated root .env file with port ${port}`);

        // Update client .env
        const clientEnvPath = path.join(__dirname, 'client', '.env');
        let clientEnvContent = '';
        
        if (fs.existsSync(clientEnvPath)) {
            clientEnvContent = fs.readFileSync(clientEnvPath, 'utf8');
        }
        
        // Update or add VITE_API_PORT
        if (clientEnvContent.includes('VITE_API_PORT=')) {
            clientEnvContent = clientEnvContent.replace(/VITE_API_PORT=\d+/, `VITE_API_PORT=${port}`);
        } else {
            clientEnvContent += `\nVITE_API_PORT=${port}`;
        }
        
        fs.writeFileSync(clientEnvPath, clientEnvContent);
        console.log(`Updated client .env file with port ${port}`);
    } catch (error) {
        console.error('Error updating .env files:', error);
    }
};

// Start server with dynamic port
const startServer = async () => {
    try {
        const preferredPort = parseInt(process.env.PORT) || 5000;
        const availablePort = await findAvailablePort(preferredPort);
        
        app.listen(availablePort, () => {
            console.log(`Server running on port ${availablePort}`);
            // Update the port in the environment variables and .env file
            process.env.PORT = availablePort;
            updateEnvFile(availablePort);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle process termination
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
});

startServer(); 