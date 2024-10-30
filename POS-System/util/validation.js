export const validateCustomerEmail = (customerEmail) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(customerEmail);
}

export const validateCustomerTel = (customerTel) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(customerTel);
}

export const validateItemPrice = (itemPrice) => {
    const itemPriceRegex =  /^(?!0\d)\d+\.\d+$/;
    return itemPriceRegex.test(itemPrice);
}

export const validateItemQTY = (itemQty) => {
    const itemQTYRegex = /^[1-9]\d*$/;
    return itemQTYRegex.test(itemQty);
}