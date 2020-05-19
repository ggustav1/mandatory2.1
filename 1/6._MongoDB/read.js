const mongoClient = require("mongodb").MongoClient;

const connectionUrl = "mongodb://localhost:27017";
const dbName = "animalfarm";

mongoClient.connect(connectionUrl, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        throw "Error connecting to mongodb " + error;
    }
    const animalFarmDB = client.db(dbName);
    const buildings = animalFarmDB.collection('buildings');
    
    // findOne also works
    buildings.find({ type: { $exists: true }/* , age: { $lt: 10, $gt: 2 }  */}, { projection: { _id: 0 } }).limit(1).toArray((error, foundBuildings) => {
        console.log(foundBuildings);
        client.close();
    });
});



