const mongoClient = require("mongodb").MongoClient;

const connectionUrl = "mongodb://localhost:27017";
const dbName = "animalfarm";

mongoClient.connect(connectionUrl, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        throw "Error connecting to mongodb " + error;
    }
    const animalFarmDB = client.db(dbName);
    const buildings = animalFarmDB.collection('buildings');

    buildings.deleteOne({ type: "werehouse" }, (error, result) => {
        console.log(result);
        client.close();
    });


});
