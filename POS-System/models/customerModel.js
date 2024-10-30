export default class CustomerModel{

    constructor(id, customer_name, customer_address, customer_tel, customer_email) {
        this._id = id;
        /*this._customer_id = customer_id;*/
        this._customer_name = customer_name;
        this._customer_address = customer_address;
        this._customer_tel = customer_tel;
        this._customer_email = customer_email;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get customer_name() {
        return this._customer_name;
    }

    set customer_name(value) {
        this._customer_name = value;
    }

    get customer_address() {
        return this._customer_address;
    }

    set customer_address(value) {
        this._customer_address = value;
    }

    get customer_tel() {
        return this._customer_tel;
    }

    set customer_tel(value) {
        this._customer_tel = value;
    }

    get customer_email() {
        return this._customer_email;
    }

    set customer_email(value) {
        this._customer_email = value;
    }
}