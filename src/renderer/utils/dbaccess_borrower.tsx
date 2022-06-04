import { join } from 'path'
import { LowSync, JSONFileSync } from 'lowdb'
import { Borrower_Record, Data } from './dbstructure'

import lodash from 'lodash'

class LowWithLodash<T> extends LowSync<T> {
    chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

// Use JSON file for storage
const filePath = join(__dirname, 'borrower.json')
const adapter = new JSONFileSync<Data>(filePath)
const db = new LowWithLodash(adapter)

//Initializes db.data
db.read();

// Fetches the entire record of the borrower using the ID
function fetchData(id: number, attribute = "") {
    var output = db.data[id][attribute];

    if (attribute == "") {
        output = db.data[id]
    }

    console.log(output)
    return output;
}

function addData(record: Borrower_Record = null) {

    record.payment_dates = [{
        date: "poggers",
        paid: "1",
        amount: "2000",
    }]

    db.data.push(record)

    db.write();
}

function deleteData(id: number) {
    db.data.splice(id - 1, 1);
    db.write();
}

function editData(id: number, attribute: string, val) {
    db.data[id - 1][attribute] = val;
    db.write();
}

function getNextID() {
    return (db.data.length + 1).toString();
}

export { fetchData, addData, deleteData, editData, getNextID}