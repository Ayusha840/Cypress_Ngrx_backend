const mongoose = require('mongoose')
let db_link = 'mongodb://127.0.0.1:27017/Food24X7';

mongoose.set('strictQuery', true);

let database;
async function connectToDatabase() {
  await mongoose.connect(db_link)
}
function getDB() {
  if (!database) {
    throw { message: 'Database not connected!!!' }
  }
  return database
}

module.exports = {
  connectToDatabase,
}
