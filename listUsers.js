const admin = require('firebase-admin');
const serviceAccount = require('./assets/keys/astromedia-modular-firebase-adminsdk-tq87s-b1719e0f84.json'); // Replace with the path to your JSON file

// Initialize the Admin SDK using the service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

// Retrieve all users (pagination is required for large user sets)
auth.listUsers()
  .then((result) => {
    console.log('im here',result);
    result.users.forEach((userRecord) => {
      console.log(userRecord.toJSON());
    });
  })
  .catch((error) => {
    console.error("Error listing users:", error);
  });