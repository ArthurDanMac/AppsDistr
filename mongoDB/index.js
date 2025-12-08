// "Guerrilla" Workshop - Distributed Applications-UPIITA-IPN

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}

async function main() {
  const uri =
    "mongodb+srv://maciasgalvanarturodaniel_db_user:qedoXlU0H3BduFdm@cluster0.woxmjiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
