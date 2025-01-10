import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// Convert import.meta.url to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files from the Angular app
const buildPath = path.join(__dirname, 'dist');
app.use(express.static(buildPath));

// Handle Angular routing (redirect all other routes to index.html)
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3456;
app.listen(PORT, () => {
  console.log(`Frontend is running on http://localhost:${PORT}`);
});
