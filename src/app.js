import express from "express";
import cors from "cors";
import helmet from "helmet"; // Added for security headers
import rateLimit from "express-rate-limit"; // Added for rate limiting
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import explainRoutes from "./routes/explainRoute.js";
import pdfRoutes from "./routes/pdfRoutes.js";
import imageRoute from "./routes/imageRoute.js";

const app = express();

// Security Middleware
app.use(helmet()); // Sets various HTTP headers for security
app.use(cors());
// Rate Limiting (Prevent brute-force attacks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Body Parser Configuration
app.use(bodyParser.json({ limit: "10mb" })); // Prevent large payload attacks
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api", authRoutes);
app.use("/diagnosis", explainRoutes);
app.use("/pdfs", pdfRoutes);
app.use("/images", imageRoute);

// Health Check Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    status: "live",
    message: "Auth backend is running",
    timestamp: new Date().toISOString(),
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error Handling Middleware (should be last)
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

export default app;
