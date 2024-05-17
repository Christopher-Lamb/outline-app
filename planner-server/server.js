const express = require("express");
const app = express();
const cors = require("cors");         
const port = 3240;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
const routes = require("./routes"); // Import the top-level routes
app.use("/", routes); // Use the routes

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
