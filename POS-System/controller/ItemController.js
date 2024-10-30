
import ItemModel from "../models/itemModel.js";

import {item_array} from "../db/database.js";

import {validateItemPrice, validateItemQTY} from "../util/validation.js";

import {populateDropdowns} from "./OrderController.js";

import {updateCounts} from "./HomeController.js";

const loadItemTable = () => {
    $("#itemTableBody").empty();

    item_array.map((item, ) => {
        console.log(item);

        let data = `<tr> <td>${item.item_name}</td> <td>${item.item_type}</td> <td>${item.item_price}</td> <td>${item.item_description}</td> <td>${item.item_qty}</td> </tr>`

        $("#itemTableBody").append(data);

    });

}

const cleanItemForm = () =>{
    $("#itemName").val("");
    $("#itemType").val("");
    $("#itemPrice").val("");
    $("#itemDescription").val("");
    $("#itemQty").val("");
}

let selected_item_index = null;

//Add
$("#item_add_btn").on("click", function (){
    let item_name = $("#itemName").val();
    let item_type = $("#itemType").val();
    let item_price = $("#itemPrice").val();
    let item_description = $("#itemDescription").val();
    let item_qty = $("#itemQty").val();

    if(item_name.length === 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Name!"
        });
    }else if (item_type.length === 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Type!"
        });
    }else if (!validateItemPrice(item_price)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Price!"
        });
    }else if (item_description.length === 0){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Description!"
        });
    } else if (!validateItemQTY(item_qty)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Item Quantity!!"
        });
    }else {

        let itemIdCounter = item_array.length ? Math.max(...item_array.map(i => parseInt(i._id.slice(1)))) + 1 : 1;
        let itemId = `I${itemIdCounter.toString().padStart(3, '0')}`;

        let item = new ItemModel(
            /*item_array.length+1,*/
            itemId,
            item_name,
            item_type,
            item_price,
            item_description,
            item_qty
        );

        item_array.push(item);

        populateDropdowns();

        updateCounts();

        //Clean form
        cleanItemForm()

        loadItemTable()

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Item details has been saved",
            showConfirmButton: false,
            timer: 1500
        });


    }


});

//Clear
$('#item_clear_btn').on('click', function (){
    cleanItemForm()

    Swal.fire({
        title: "Cleared!",
        icon: "info"
    });

});

//Table ~ Event delegation
$('#itemTableBody').on('click', 'tr', function (){
    let index = $(this).index();

    selected_item_index = $(this).index();

    let item_obj = item_array[index];

    let item_name = item_obj.item_name;
    let item_type = item_obj.item_type;
    let item_price = item_obj.item_price;
    let item_description = item_obj.item_description;
    let item_qty = item_obj.item_qty;

    $('#itemName').val(item_name);
    $('#itemType').val(item_type);
    $('#itemPrice').val(item_price);
    $('#itemDescription').val(item_description);
    $('#itemQty').val(item_qty);

});


//Update

$('#item_update_btn').on('click', function (){
    let index = selected_item_index;

    let item_name = $("#itemName").val();
    let item_type = $("#itemType").val();
    let item_price = $("#itemPrice").val();
    let item_description = $("#itemDescription").val();
    let item_qty = $("#itemQty").val();

    let item = new ItemModel(
        item_array[index].id,
        item_name,
        item_type,
        item_price,
        item_description,
        item_qty
    );

    //Update customer
    item_array[selected_item_index]=item;

    cleanItemForm()

    loadItemTable()

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Item details has been updated",
        showConfirmButton: false,
        timer: 1500
    });

});


$('#item_delete_btn').on('click', function (){


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
            item_array.splice(selected_item_index, 1);

            // clean customer form
            cleanItemForm()

            // reload the table
            loadItemTable()
            // ==========================================================

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Item details has been deleted.",
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

