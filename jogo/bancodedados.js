var admin = require("firebase-admin");

var serviceAccount = require("./credenciais.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jogo-24ebd.firebaseio.com"
});

var database = admin.database()
module.exports = {database}