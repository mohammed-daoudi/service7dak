
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import corsMiddleware from './middleware/cors';

dotenv.config();


const app = express();
app.use(corsMiddleware);
app.use(express.json());

// Import and use auth routes
import authRoutes from './routes/auth';
app.use('/api/auth', authRoutes);

// Import and use service routes
import serviceRoutes from './routes/services';
app.use('/api/services', serviceRoutes);

// Import and use category routes
import categoryRoutes from './routes/categories';
app.use('/api/categories', categoryRoutes);

// Import and use review routes
import reviewRoutes from './routes/reviews';
app.use('/api/reviews', reviewRoutes);

// Import and use user routes
import userRoutes from './routes/users';
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';
// Error handling middleware
import { errorHandler } from './middleware/errorHandler';

// Basic health check route
app.get('/', (_req, res) => {
  res.send('Service Marketplace API is running');
});



// Connect to MongoDB and start server only after successful connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Use error handler (should be after all routes)
app.use(errorHandler);

export default app;
