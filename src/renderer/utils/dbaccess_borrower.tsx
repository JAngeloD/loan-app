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

    let isBi = (record.frequency == "bi") //Stores bool if the frequency is bi or weekly (bi == true) (weekly == fasle)
    let iter = record.total_loan_months * ((isBi) ? 2 : 1) //Determines how much the for loop iterates.
    let currentIterDate = new Date(record.starting_date.replace(/-/g, '\/')) // Current date being set into the nested array in the record
    let increment = (isBi) ? 15 : 31 //Determines the increment of the date; the gap.

    //Generates a list of days where the borrower must pay. These days depend on:
    //Interest, Total loan periods (Months), and Loan frequency
    for(let i = 0; i < iter; i++) {
        record.payment_dates.push({
            date: currentIterDate.toDateString(),
            paid: "N/A",
            amount: record.payment_per_period,
        })
        currentIterDate.setDate(currentIterDate.getDate() + increment);
    }

    db.data.push(record)
    db.write();
}

//TODO: Make it so that the id shifts up/down if an borrower whos id isn't at the end
function deleteData(id: number) {
    id -= 1;
    let nextID = db.data[id].id
    
    db.data.splice(id, 1);

    for(let i = 0; i < (db.data.length - id); i++) {
        db.data[i + id].id = nextID;
        nextID++;
    }

    db.write();
}

function editData(id: number, attribute: string, val) {
    db.data[id - 1][attribute] = val;
    db.write();
}

function getNextID() {
    return (db.data.length + 1);
}

export { fetchData, addData, deleteData, editData, getNextID}