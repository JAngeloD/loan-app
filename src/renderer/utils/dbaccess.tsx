import { join } from 'path'
import { LowSync, JSONFileSync } from 'lowdb'
import lodash from 'lodash'

type Date = {
    month: string
    paid: number
    amount: number
}

type Record = {
    id: number
    firstname: string
    lastname: string
    loanamount: number
    frequency: string
    email: string
    phone: string
    totalterms: number
    interest: number
    paymentdate: Date[]
}

type Data = Record[]

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
function fetch(id: number, attribute = "") {
    var output = db.data[id][attribute];
    return output;
}

function addNewBorrower() {
    // TODO: Write code to add another borrower
    // PREREQ: Finalize the JSON structure
    db.write();
}

export { fetch, addNewBorrower }