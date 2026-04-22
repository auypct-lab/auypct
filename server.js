import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";

// ✅ Your existing routes
import campaignRoutes from "./routes/campaignRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

// ✅ New routes (from my backend)
import authRoutes from "./routes/authRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import courseViewsRoutes from "./routes/courseViewsRoutes.js";
import courseEnrollRoutes from "./routes/courseEnrollRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import dns from "dns";
dns.setServers(['8.8.8.8', '8.8.4.4']);
console.log("DNS forcibly set to Google Public DNS");
dotenv.config();
connectDB();

const app = express();

// ✅ Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// ✅ Better CORS (supports both CLIENT_URL and CLIENT_ORIGIN)
const allowedOrigins = [
  "https://www.auypctrust.com",
  "https://auypctrust.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, cb) => {
      // allow server-to-server / Postman (no origin)
      if (!origin) return cb(null, true);

      if (allowedOrigins.includes(origin)) return cb(null, true);

      return cb(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// ✅ logs
app.use(morgan("dev"));

// ✅ Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// ✅ Health route
app.get("/", (req, res) =>
  res.json({ ok: true, message: "AUYPCT Backend Running" })
);

// ✅ Existing APIs
app.use("/api/campaigns", campaignRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/audits", auditRoutes);
app.use("/api/stats", statsRoutes);

// ✅ New APIs
app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/course-views", courseViewsRoutes);
app.use("/api/course-enrolls", courseEnrollRoutes);

// ✅ Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);