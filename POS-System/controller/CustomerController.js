
import CustomerModel from "../models/customerModel.js";

import {customer_array} from "../db/database.js";

import {validateCustomerTel, validateCustomerEmail} from "../util/validation.js";

import {populateDropdowns} from "./OrderController.js";

const loadCustomerTable = () => {
    $("#customerTableBody").empty();

    customer_array.map((item, )  => {

        console.log(item);

        let data = `<tr>  <td>${item.customer_name}</td> <td>${item.customer_address}</td> <td>${item.customer_tel}</td> <td>${item.customer_email}</td> </tr>`

        $("#customerTableBody").append(data);

    });

}

const cleanCustomerForm = () =>{
    /*$("#customerId").val("");*/
    $("#customerName").val("");
    $("#customerAddress").val("");
    $("#customerTel").val("");
    $("#customerEmail").val("");
}

let selected_customer_index = null;

//Add
$("#customer_add_btn").on("click", function (){
    /*let customer_id = $("#customerId").val();*/
    let customer_name = $("#customerName").val();
    let customer_address = $("#customerAddress").val();
    let customer_tel = $("#customerTel").val();
    let customer_email = $("#customerEmail").val();

    if(customer_name.length === 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Customer Name!"
        });
    }else if (customer_address.length === 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Customer Address!"
        });
    }else if (!validateCustomerTel(customer_tel)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Customer Telephone Number!"
        });
    }else if (!validateCustomerEmail(customer_email)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Customer Email!"
        });
    }else {

        let customerIdCounter = customer_array.length ? Math.max(...customer_array.map(c => parseInt(c._id.slice(1)))) + 1 : 1;
        let customerId = `C${customerIdCounter.toString().padStart(3, '0')}`;


        let customer = new CustomerModel(
            /*customer_array.length+1,*/
            /*customer_id,*/
            customerId,
            customer_name,
            customer_address,
            customer_tel,
            customer_email
        );



        customer_array.push(customer);

        populateDropdowns();

        //Clean form
        cleanCustomerForm();

        loadCustomerTable();

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Customer details has been saved",
            showConfirmButton: false,
            timer: 1500
        });


    }


});

//Clear
$('#customer_clear_btn').on('click', function (){
   cleanCustomerForm();

    Swal.fire({
        title: "Cleared!",
        icon: "info"
    });

});

//Table ~ Event delegation
$('#customerTableBody').on('click', 'tr', function (){
    let index = $(this).index();

    selected_customer_index = $(this).index();

    let customer_obj = customer_array[index];

    let customer_name = customer_obj.customer_name;
    let customer_address = customer_obj.customer_address;
    let customer_tel = customer_obj.customer_tel;
    let customer_email = customer_obj.customer_email;

    $('#customerName').val(customer_name);
    $('#customerAddress').val(customer_address);
    $('#customerTel').val(customer_tel);
    $('#customerEmail').val(customer_email);

});


//Update

$('#customer_update_btn').on('click', function (){
    let index = selected_customer_index;

    let customer_name = $("#customerName").val();
    let customer_address = $("#customerAddress").val();
    let customer_tel = $("#customerTel").val();
    let customer_email = $("#customerEmail").val();

    let customer = new CustomerModel(
        customer_array[index].id,
        /*customer_id,*/
        customer_name,
        customer_address,
        customer_tel,
        customer_email
    );

    //Update customer
    customer_array[selected_customer_index]=customer;

    cleanCustomerForm();

    loadCustomerTable();

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Customer details has been updated",
        showConfirmButton: false,
        timer: 1500
    });

});


$('#customer_delete_btn').on('click', function (){


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            // ==========================================================
            customer_array.splice(selected_customer_index, 1);

            // clean customer form
            cleanCustomerForm();

            // reload the table
            loadCustomerTable();
            // ==========================================================

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Customer details has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                icon: "error"
            });
        }
    });

});

