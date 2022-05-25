import { join } from 'path'
import { LowSync, JSONFileSync } from 'lowdb'
import lodash from 'lodash'

class LowWithLodash<T> extends LowSync<T> {
    chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

// Use JSON file for storage
const filePath = join(__dirname, 'db.json')
const adapter = new JSONFileSync(filePath)
const db = new LowSync(adapter)

//Initializes db.data
db.read();

function fetch(id) {
    const test = db.data[id];
    console.log(JSON.stringify(test));
}

function addNewBorrower() {
    // TODO: Write code to add another borrower
    // PREREQ: Finalize the 
    db.write();
}

export { fetch, addNewBorrower }