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

    db.data.push({
        id: 3,
        firstname: 'Angelo',
        lastname: 'De Vera',
        loanamount: 2000,
        frequency: 'bi',
        email: 'deveraangelo319@gmail.com',
        phone: '403-408-7465',
        totalterms: 3,
        interest: 4,
        paymentdate: []
    })

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

export { fetchData, addData, deleteData, editData }