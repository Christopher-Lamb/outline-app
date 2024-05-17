// /routes/index.js
const express = require("express");
const router = express.Router();

const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.get("/", (req, res) => {
  res.send("Hi thereski");
});

module.exports = router;
