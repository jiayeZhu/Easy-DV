/**
 * Created by zhujiaye on 2017/5/4.
 */

let _db = null;

module.exports = {
  initDB (db) {
    if (db == null) {
      return false
    } else {
      _db = db;
      return true;
    }
  },
  getDB () {
    return _db;
  },
  getDBFunction (event,arg) {
    let channel = arg.channel;
    // console.log(arg);
    // console.log(_db);
    event.sender.send(channel,_db);
  },
  async aggregateQuery (event,arg) {
    console.log('received');
    let collection = _db.collection('aggtest');
    collection.aggregate([
      { "$match" : { "a" : { "$gt" : 0 } } },
      { "$match" : { "b" : { "$gt" : 0 } } }
    ],(err,result)=>{
      if (err === null) {
        console.log(result);
        let channel = arg.channel;
        event.sender.send(channel,result);
      }
      else{
        console.log(err);
      }
    })
  }
}