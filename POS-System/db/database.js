
import customerModel from '../models/CustomerModel.js';
import itemModel from '../models/ItemModel.js';

export let customer_array = [];

export let item_array = [];

export let order_array = [];


// Adding some example data for testing
customer_array.push(new customerModel('C001', 'John Doe', '123 Main St', '555-1234', 'johndoe@example.com'));
customer_array.push(new customerModel('C002', 'Jane Smith', '456 Elm St', '555-5678', 'janesmith@example.com'));

item_array.push(new itemModel('I001', 'Widget', 'Tool', 19.99, 'A useful widget', 100));
item_array.push(new itemModel('I002', 'Gadget', 'Accessory', 29.99, 'A handy gadget', 50));