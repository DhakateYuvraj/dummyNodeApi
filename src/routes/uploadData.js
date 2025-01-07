const express = require("express");
const db = require("../firebase-admin"); // Import the configured Firebase Admin SDK


const getDirName = () =>{
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = today.toLocaleString("en-US", { month: "short" });
  const year = today.getFullYear();
  return `${day}${month}${year}`;
}

const router = express.Router();
router.get("/", async (req, res) => {
      try {
        res.json({
          status: 200,
          message: "Your app health is OK!",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
      }
    
    })
// POST API to upload data to Firebase Realtime Database
router.post("/", async (req, res) => {
  try {
    const dirName = getDirName();
    const data = req.body; // Get the payload from the request body

    if (!data || typeof data !== "object") {
      return res.status(400).json({ error: "Invalid payload. Must be a valid JSON object." });
    }

    const ref = db.ref(dirName); // Firebase node (change this as needed)
    const newRef = ref.push(); // Generate a unique key for the new entry
    await newRef.set(data); // Save the payload

    res.status(200).json({
      message: "Data uploaded successfully",
      key: newRef.key, // Return the unique key of the new entry
    });
  } catch (error) {
    console.error("Error uploading data:", error);
    res.status(500).json({ error: "Failed to upload data" });
  }
});

module.exports = router;
