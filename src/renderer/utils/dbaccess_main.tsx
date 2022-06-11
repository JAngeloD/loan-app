import { join } from 'path'
import { LowSync, JSONFileSync } from 'lowdb'
import lodash from 'lodash'

import { fetchData, getNextID } from './dbaccess_borrower'
import { DataMain } from './dbstructure'

class LowWithLodash<T> extends LowSync<T> {
    chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
}

// Use JSON file for storage
const filePath = join(__dirname, 'main.json')
const adapter = new JSONFileSync<DataMain>(filePath)
const db = new LowWithLodash(adapter)

//Initializes db.data
db.read();

function fetchAll() {
    return db.data;
}

function fetch(attribute = "") {
    if(attribute !== "") {
        return db.data[attribute];
    }

    return null;
}

function editDataMain(attribute = "", val: number) {
    if(attribute !== "") {
        db.data[attribute] = val;
    }

    db.write();
}

//Rechecks all borrowers and their information and push them into the db
function calculateData() {
    calculateExpectedRevenue()
    calculateMoneyOut()
}

//Scans all borrower's POTENTIAL revenue and returns total number and replaces the current expected revenue
function calculateExpectedRevenue() {
    
    let oldRevenue = fetch("potential_revenue")
    let newRevenue = 0

    for(let i = 0; i < (getNextID() - 1); i++) {
        newRevenue += fetchData(i, "potential_revenue");
    }
    editDataMain("potential_revenue", newRevenue)
    
    //If the old potential revenue is larger than the new potential  revenue value then add to current revenue
    if(oldRevenue > newRevenue) {
        console.log(oldRevenue - newRevenue)
        addToRevenue(oldRevenue - newRevenue)
    }

    return newRevenue;
}

function calculateMoneyOut() {
    let newMoneyOut = 0
    
    for(let i = 0; i < (getNextID() - 1); i++) {
        newMoneyOut += fetchData(i, "payment_left")
    }

    editDataMain("money_out", newMoneyOut)
}

function addToRevenue(val: number) {
    let newVal = fetch("revenue") + val
    editDataMain("revenue", newVal)
}

function addMoneyOnHand(val: number) {
    let newMoneyOnHand = fetch("money_on_hand") + val
    editDataMain("money_on_hand", newMoneyOnHand)
}

export { fetch,fetchAll, calculateData, addMoneyOnHand }