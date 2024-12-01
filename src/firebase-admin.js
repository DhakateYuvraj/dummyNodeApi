const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://localtestingapp-a6fcc-default-rtdb.firebaseio.com/" // Your Firebase Realtime DB URL
  });
}

const db = admin.database();

module.exports = db;