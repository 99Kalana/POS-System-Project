
import { customer_array, item_array, order_array} from "../db/database.js";

//======================== order id and date ===============================
function generateOrderId() {
    const orderCount = order_array.length + 1;
    const orderId = `O${orderCount.toString().padStart(3, '0')}`;
    document.getElementById('order-id').textContent = orderId;
    return orderId;
}

document.getElementById('date').textContent = new Date().toLocaleDateString();

window.onload = generateOrderId();

//============================================================================

//=================== ID Selection ==========================================
 export function populateDropdowns() {
    const customerSelect = document.getElementById('customer-id');
    const itemSelect = document.getElementById('item-id');


    if (!customerSelect || !itemSelect) {
        console.error("Dropdown elements not found");
        return;
    }


    customerSelect.innerHTML = '<option value="">Customer ID</option>';
    itemSelect.innerHTML = '<option value="">Item ID</option>';


    customer_array.forEach(customer => {
        let option = document.createElement('option');
        option.value = customer._id;
        option.textContent = customer._id;
        customerSelect.appendChild(option);
    });


    item_array.forEach(item => {
        let option = document.createElement('option');
        option.value = item._id;
        option.textContent = item._id;
        itemSelect.appendChild(option);
    });


    customerSelect.addEventListener('change', function() {
        console.log(`Selected Customer ID: ${this.value}`);
    });

    itemSelect.addEventListener('change', function() {
        console.log(`Selected Item ID: ${this.value}`);
    });
}


window.onload = populateDropdowns;

 //=============================================================================================

// Function to auto-fill customer details along Customer ID==========================================================
function autoFillCustomerDetails() {
    const customerId = document.getElementById('customer-id').value;
    const customer = customer_array.find(c => c.id === customerId); // Find customer by ID

    if (customer) {
        document.getElementById('customer-name').value = customer.customer_name;
        // Populate other customer details if needed, such as address or email
    } else {
        // Clear fields if no customer is selected
        document.getElementById('customer-name').value = '';
    }
}

// Function to auto-fill item details along Item ID==================================================================
function autoFillItemDetails() {
    const itemId = document.getElementById('item-id').value;
    const item = item_array.find(i => i.id === itemId); // Find item by ID

    if (item) {
        document.getElementById('item-name').value = item.item_name;
        document.getElementById('item-price').value = item.item_price;
        document.getElementById('item-stock-qty').value = item.item_qty;

    } else {

        document.getElementById('item-name').value = '';
        document.getElementById('item-price').value = '';
        document.getElementById('item-stock-qty').value = '';
    }
}


document.getElementById('customer-id').addEventListener('change', autoFillCustomerDetails);
document.getElementById('item-id').addEventListener('change', autoFillItemDetails);


//===============================================================================================================

//order data store
let currentOrderItems = [];

//Order data function
function addItemToOrder() {
    const itemId = document.getElementById('item-id').value;
    const itemQty = parseInt(document.getElementById('order-qty').value);
    const item = item_array.find(i => i.id === itemId);

    if (item && itemQty > 0) {
        const itemTotal = item.item_price * itemQty;


        const orderItem = {
            id: item.id,
            name: item.item_name,
            unitPrice: item.item_price,
            qty: itemQty,
            total: itemTotal
        };


        currentOrderItems.push(orderItem);


        renderOrderTable();
    } else {
        alert("Please select an item and enter a valid quantity.");
    }
}


function renderOrderTable() {
    const orderTableBody = document.getElementById('orderTableBody');
    orderTableBody.innerHTML = '';

    currentOrderItems.forEach((item, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.unitPrice.toFixed(2)}</td>
            <td>${item.qty}</td>
            <td>${item.total.toFixed(2)}</td>
            <td><button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button></td>
        `;

        orderTableBody.appendChild(row);
    });


    calculateTotalPrice();


    attachDeleteEventListeners();
}


function deleteOrderItem(index) {
    currentOrderItems.splice(index, 1);
    renderOrderTable();
}
// delete button feature
function attachDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            deleteOrderItem(index);
        });
    });
}


document.getElementById('add-to-order').addEventListener('click', addItemToOrder);

function calculateTotalPrice() {
    const totalPrice = currentOrderItems.reduce((acc, item) => acc + item.total, 0);
    document.getElementById('total-price').textContent = `TOTAL PRICE /= ${totalPrice.toFixed(2)}`;
}


//===========================================================================================================================

//================================= Order Placement====================================================================

// Function to place the order
function placeOrder() {
    const orderId = document.getElementById('order-id').textContent;
    const orderDate = document.getElementById('date').textContent; // Assuming you have an element with ID 'date'


    currentOrderItems.forEach(orderItem => {
        const orderDetails = {
            orderId: orderId,
            date: orderDate,
            customerId: document.getElementById('customer-id').value, // Get selected customer ID
            itemId: orderItem.id,
            itemPrice: orderItem.unitPrice,
            orderQty: orderItem.qty,
        };


        order_array.push(orderDetails);

        // Reduce the item quantity
        const item = item_array.find(i => i.id === orderItem.id);
        if (item) {
            item.item_qty -= orderItem.qty; // Reduce the item quantity
        }
    });


    clearOrderFormAndTable();
    renderOrderTable();
    calculateTotalPrice();


    alert(`Order ${orderId} placed successfully!`);

    generateOrderId();
    document.getElementById('date').textContent = new Date().toLocaleDateString();
}


document.getElementById('place-order').addEventListener('click', placeOrder);


// Function to clear order form inputs and the order table
function clearOrderFormAndTable() {
    document.getElementById('customer-id').value = '';
    document.getElementById('customer-name').value = '';
    document.getElementById('item-id').value = '';
    document.getElementById('item-name').value = '';
    document.getElementById('item-price').value = '';
    document.getElementById('item-stock-qty').value = '';
    document.getElementById('order-qty').value = '';


    currentOrderItems = [];


    const orderTableBody = document.getElementById('orderTableBody');
    orderTableBody.innerHTML = '';


    document.getElementById('total-price').textContent = 'TOTAL PRICE = 0.00';


    generateOrderId();

    document.getElementById('date').textContent = new Date().toLocaleDateString();
}


//================================================== Order details /Order history =======================================

function populateOrderHistory() {
    const orderHistoryTableBody = document.querySelector('#order-history-page tbody');
    orderHistoryTableBody.innerHTML = '';


    order_array.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.date}</td>
            <td>${order.customerId}</td>
            <td>${order.itemId}</td>
            <td>${order.itemPrice.toFixed(2)}</td>
            <td>${order.orderQty}</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteOrder('${order.orderId}')">DELETE</button></td>
        `;
        orderHistoryTableBody.appendChild(row);
    });
}

document.getElementById('place-order').addEventListener('click', function() {

    populateOrderHistory();

    clearOrderFormAndTable();
});


//Field data setting

document.getElementById('search-order').addEventListener('click', function() {
    const orderId = document.getElementById('order-ids').value.trim();
    const order = order_array.find(order => order.orderId === orderId);

    if (order) {
        document.getElementById('dates').value = order.date;
        document.getElementById('customer-ids').value = order.customerId;
        document.getElementById('item-ids').value = order.itemId;
        document.getElementById('item-prices').value = order.itemPrice.toFixed(2);
        document.getElementById('order-qtys').value = order.orderQty;
    } else {
        alert('Order ID not found.');
    }
});

document.getElementById('clear-fields').addEventListener('click', function() {

    document.getElementById('dates').value = '';
    document.getElementById('customer-ids').value = '';
    document.getElementById('item-ids').value = '';
    document.getElementById('item-prices').value = '';
    document.getElementById('order-qtys').value = '';

});







