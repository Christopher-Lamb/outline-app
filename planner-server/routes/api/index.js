// /routes/api/index.js
const express = require("express");
const router = express.Router();
const jsonController = require("../../controllers/jsonController");

router.post("/outline", jsonController.createFile);

router.get("/outline", jsonController.getFile);

router.get("/outline-list", jsonController.getFileList);

router.put("/outline", jsonController.updateFile);

router.delete("/outline", jsonController.deleteFile);

module.exports = router;
