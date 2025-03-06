import express from 'express';
import cors from 'cors';
import "dotenv/config";
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRoutes from "./routes/authRoutes.js"
import userRouter from './routes/userRoutes.js';
import excelRoutes from './routes/excelRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

// endpoints 
app.get("/", (req, res) => res.send("api working well"));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.use("/api/images", userRouter);
app.use("/api/excel", excelRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong! Please try again later.'
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});