const admin = require("firebase-admin");
require("dotenv").config();

console.log("process.env", process.env.TYPE);

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.TEMP1,
  client_x509_cert_url: process.env.Temp2,
  universe_domain: process.env.Temp3,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://localtestingapp-a6fcc-default-rtdb.firebaseio.com/", // Your Firebase Realtime DB URL
  });
}

const db = admin.database();

module.exports = db;
