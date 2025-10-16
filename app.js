require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  
const authRoutes = require('./routes/routes'); 
const serverless = require('serverless-http');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API routes
app.use('/api/auth', authRoutes);

// Serve static files (frontend pages)
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Export AWS Lambda handler
module.exports.handler = serverless(app);

// Run locally if not in Lambda environment
if (!process.env.LAMBDA_TASK_ROOT) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
