import { join } from 'path'
import { LowSync, JSONFileSync } from 'lowdb'
import { Borrower_Record, Data } from './dbstructure'

import { addMoneyOnHand } from './dbaccess_main'

//TODO: remove if uncessary in the future
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

    return output;
}

//Pushes a new record to the json db
function addData(record: Borrower_Record = null) {

    let isBi = (record.frequency == "bi") //Stores bool if the frequency is bi or weekly (bi == true) (weekly == fasle)
    let iter = record.total_loan_months * ((isBi) ? 2 : 1) //Determines how much the for loop iterates.
    let currentIterDate = new Date(record.starting_date.replace(/-/g, '\/')) // Current date being set into the nested array in the record
    let increment = (isBi) ? 15 : 31 //Determines the increment of the date; the gap.

    //Generates a list of days where the borrower must pay. These days depend on:
    //Interest, Total loan periods (Months), and Loan frequency
    for(let i = 0; i < iter; i++) {
        record.payment_dates.push({
            date: currentIterDate.toISOString().split('T').shift(),
            paid: "Not Paid",
            amount: record.payment_per_period,
        })
        currentIterDate.setDate(currentIterDate.getDate() + increment);
    }

    db.data.push(record)
    db.write();
}

//TODO: Make it so that the id shifts up/down if an borrower whos id isn't at the end
function deleteData(id: number) {

    id -= 1; //offsets id to make it index-based

    //Checks if the input exceeds the total record amount.
    if(id >= db.data.length) {
        alert("ID must exist")
        return;
    }

    let nextID = db.data[id].id

    db.data.splice(id, 1);

    //Reassigns IDs to all borrowers
    for(let i = 0; i < (db.data.length - id); i++) {
        db.data[i + id].id = nextID;
        nextID++;
    }

    //Releases all the payment left of the borrower if there are any
    addMoneyOnHand(db.data[id].payment_left);

    db.write();
}

function editData(id: number, attribute: string, val, payment_index = '', payment_col = '') {
    if(payment_index == null || payment_index == '') {
        db.data[id - 1][attribute] = val;
    }
    else {
        console.log("id: " + (id - 1) + " attribute: " + attribute + " payment index: " + payment_index + " payment col: " + payment_col)
        console.log(db.data[id - 1][attribute])
        db.data[id - 1][attribute][payment_index][payment_col] = val;
    }

    db.write();
}

function getNextID() {
    return (db.data.length + 1);
}

//Payment table related methods
function fetchDates(id: number) {return db.data[id].payment_dates} //Fetches all dates from a borrower
function fetchDate(id: number, dateIndex: number) {return db.data[id].payment_dates[dateIndex]} //Fetches one date from the given borrower

//Sets the status of the next payment date to "paid"
function payNextDate(id: number, amount: number) {
    id -= 1
    const nextPaymentDate = db.data[id].next_payment_date

    //loops and tries to find the next payment date in the payment array of the borrower
    for(let i = 0; i < db.data[id].payment_dates.length; i++) {
        if(db.data[id].payment_dates[i].date == nextPaymentDate) {
            db.data[id].payment_dates[i].paid = "paid"
            //Checks if there is another payment date and assigns the pointer to that 
            if((i+1) < db.data[id].payment_dates.length) {
                db.data[id].next_payment_date = db.data[id].payment_dates[i + 1].date
            }

        }
    }

    //Removes a portion of the borrower's potential revenue based on the frequency
    //TODO: Clean code
    let potential_revenue = db.data[id].potential_revenue / ((db.data[id].frequency == "monthly") ? db.data[id].months_left : db.data[id].months_left * 2)
    db.data[id].potential_revenue -= potential_revenue
    db.data[id].months_left -= (db.data[id].frequency == "monthly") ? 1 : 0.5
    db.data[id].payment_left -= amount - potential_revenue

    addMoneyOnHand(amount)

    db.write();
}

export { fetchData, addData, deleteData, editData, getNextID, payNextDate}