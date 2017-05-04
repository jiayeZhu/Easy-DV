/**
 * Created by zhujiaye on 2017/5/2.
 */
const mongodb = require('mongodb');
const assert = require('assert');
const client = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/easy_dv';

// client.connect(url,(err,db)=>{
//   assert.equal(null,err);
//   consol.log('connected to the db');
//   db.close();
// });

module.exports = {
  connectDB: async function (url) {
    try{
      let db = await client.connect(url);
      console.log('connected to the database');
      console.log(db);
      return db;
    } catch (err) {
      console.log('failed to connect to the database');
      return null;
    }
  },
  data:1
}