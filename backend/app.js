const express = require('express');
const connectToDatabase = require('./config/database');
const fileRoutes = require('./routes/fileRoutes');
const cors = require('cors');
// Connect to MongoDB
connectToDatabase();

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
// Routes
app.use('/api', fileRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
