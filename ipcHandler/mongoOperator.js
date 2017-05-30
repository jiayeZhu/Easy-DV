const mongodb = require('mongodb');

const client = mongodb.MongoClient;

let db = null;

module.exports = {
  async connectDB (url) {
    try {
      const _db = await client.connect(url);
      console.log('connected to the database');
      db = _db;
      return null;
    } catch (err) {
      console.log('failed to connect to the database');
      console.log(err);
      return err;
    }
  },
  getDB () {
    return db;
  },
  aggregateQuery (AggItems) {
    // console.log('received');
    // console.log('bbb');
    // console.log(arg);
    let collection = db.collection('accessLog');
    // console.log(JSON.stringify(AggItems));
    console.log('#####',AggItems,'$$$$$');
    let cursor = collection.aggregate(AggItems,{cursor:{batchSize:10000}});
    // console.log('a',cursor.toArray());
    return cursor.toArray();
  }
};
