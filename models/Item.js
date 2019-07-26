const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const ItemSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}

);

module.exports = Item = mongoose.model('item', ItemSchema);

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
