var express = require('express');
const mongodb = require("mongodb");
var router = express.Router();

const client = new mongodb.MongoClient(process.env['AZURE_MONGO_DB_URL']);

async function getRates(limit) {
  await client.connect();
  const database = client.db('CryptocurrencyRateDb');
  const collections = database.collection('cryptocurrency_rate_collections');
  let rate = await collections.find({}).sort({ _id: -1 }).limit(limit).toArray();
  client.close();
  return rate
}

function addTimestampToElement(rate) {
  const timestamp = mongodb.ObjectId(rate._id).getTimestamp();
  const date = new Date(timestamp);
  date.setTime(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
  const strDate = date.toISOString().replace('T', ' ').substring(0, 19);
  rate.timestamp = strDate
}

/* GET rate listing. */
router.get('/', function (req, res, next) {
  (async () => {
    let rates = await getRates(1);
    rates.forEach(rate => addTimestampToElement(rate));
    res.json(rates);
  })().catch(next);
});

router.get('/all', function (req, res, next) {
  (async () => {
    let rates = await getRates(500);
    rates.forEach(rate => addTimestampToElement(rate));
    res.json(rates);
  })().catch(next);
});

module.exports = router;