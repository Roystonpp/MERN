const express = require('express');
const router = express.Router();

//item Model
const Item = require('../../models/Item');

//@route GET api/items
//@desc Get All Items
//@access Public
router.get('/',(req, res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
});

//@route post api/items
//@desc post Items
//@access Public
router.post('/',(req, res) => {
  const newItem = new Item({
    name:req.body.name
  });

  newItem.save().then(Item => res.json(Item));
});

module.exports = router;

async function runTransactionWithRetry(txnFunc, client, session) {
    try {
      await txnFunc(client, session);
    } catch (error) {
      console.log('Transaction aborted. Caught exception during transaction.');
  
      // If transient error, retry the whole transaction
      if (error.errorLabels && error.errorLabels.indexOf('TransientTransactionError') >= 0) {
        console.log('TransientTransactionError, retrying transaction ...');
        await runTransactionWithRetry(txnFunc, client, session);
      } else {
        throw error;
      }
    }
  }