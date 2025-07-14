const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./configs/db');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const sessionRoutes=require('./routes/sessionRoutes')

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers)
  optionsSuccessStatus: 200 // Some legacy browsers (IE11) choke on 204
};
// Custom middleware for logging API calls
const apiLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(apiLogger);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});
app.use('/api/auth', userRoutes);
app.use('/api/session', sessionRoutes)

// Connect to MongoDB
connectDB();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
