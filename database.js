import mongoose from 'mongoose';
const uri = process.env.DBURI;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(uri);
    console.log("Established connection to database")
  } catch (err) {
    console.log("Error on DB connection", err);
    mongoose.connection.close();
  }
}
run().catch(err => console.log(err));
