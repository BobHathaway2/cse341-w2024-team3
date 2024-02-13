const { MongoClient, ObjectId } = require('mongodb');

describe('insert', () => {
    let connection;
    let db;
  
    beforeAll(async () => {
        // Establish connection to MongoDB
      connection = await MongoClient.connect(process.env.MOONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      // Access the database
      db = await connection.db('teamProject3');  // Connect to the "teamProject3" database
    });
  
    afterAll(async () => {
        // Close the connection after all tests are done
      await connection.close();
    });
  
    it('should insert a doc into collection', async () => {
        // Access the users collection
      const clients = db.collection('clients');
  
      // Mock user data to insert
      const mockClient = { 
        _id: new ObjectId('65c35559f76457be4307c2bc'),
        FirstName: 'Ethan',
        LastName: 'Bray',
        MovieName: 'Jurassic Park',
        Paid: 'Yes ($ 5.00)',
        MovieOut: '10 Jan',
        MovieIn: '20 Jan'
      };

      // Insert the mock user into the collection
      await clients.insertOne(mockClient);
  
      // Query the collection to find the inserted user
      const insertedClient = await clients.findOne({_id: new ObjectId('65c35559f76457be4307c2bc')});

      // Assertion to check if the inserted user matches the mock user
      expect(insertedClient).toEqual(mockClient);
    });
});
