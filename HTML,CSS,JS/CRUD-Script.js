//Customer-------------------------------------------------------

let customer_array = [];

$("#customer_add_btn").on("click", function (){
    let customer_id = $("#customerId").val();
    let customer_name = $("#customerName").val();
    let customer_address = $("#customerAddress").val();
    let customer_tel = $("#customerTel").val();
    let customer_email = $("#customerEmail").val();

    console.log("customer_id: ",customer_id);
    console.log("customer_name: ",customer_name);
    console.log("customer_address: ",customer_address);
    console.log("customer_tel: ",customer_tel);
    console.log("customer_email: ",customer_email);

    let customer = {
        customer_id : customer_id,
        customer_name : customer_name,
        customer_address : customer_address,
        customer_tel : customer_tel,
        customer_email : customer_email
    }

    customer_array.push(customer);

    loadCustomerTable();


});

const loadCustomerTable = () => {
    $("#customerTableBody").empty();

    customer_array.map((item, )  => {

        console.log(item);

        let data = `<tr> <td>${item.customer_id}</td> <td>${item.customer_name}</td> <td>${item.customer_address}</td> <td>${item.customer_tel}</td> <td>${item.customer_email}</td> </tr>`

        $("#customerTableBody").append(data);

    });

}


//===============================================================