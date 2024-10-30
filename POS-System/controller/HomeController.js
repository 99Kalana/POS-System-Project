import {customer_array,item_array} from "../db/database.js";

export function updateCounts() {

    const customerCount = customer_array.length;
    const itemCount = item_array.length;

    // Update the labels with the counts
    document.getElementById('customercount').textContent = customerCount;
    document.getElementById('itemcount').textContent = itemCount;
}


window.onload = function() {
    updateCounts();
};