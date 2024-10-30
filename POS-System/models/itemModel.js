export default class ItemModel{

    constructor(id, item_name, item_type, item_price, item_description, item_qty) {
        this._id = id;
        this._item_name = item_name;
        this._item_type = item_type;
        this._item_price = item_price;
        this._item_description = item_description;
        this._item_qty = item_qty
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get item_name() {
        return this._item_name;
    }

    set item_name(value) {
        this._item_name = value;
    }

    get item_type() {
        return this._item_type;
    }

    set item_type(value) {
        this._item_type = value;
    }

    get item_price() {
        return this._item_price;
    }

    set item_price(value) {
        this._item_price = value;
    }

    get item_description() {
        return this._item_description;
    }

    set item_description(value) {
        this._item_description = value;
    }

    get item_qty() {
        return this._item_qty;
    }

    set item_qty(value) {
        this._item_qty = value;
    }
}