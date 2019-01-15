var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Cm240790",
    database: "bamazon"
});


function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.';
    }
}


function userPurchase() {
    console.log('_____ENTER productSearch')
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "Please enter de ID number of the product you like to buy",
            choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        },
        {
            type: "input",
            name: "quantity",
            message: "How many pieces do you need?",
            validate: validateInput,
            filter: Number
        }
    ]).then(function (input) {
        var item = input.item_id;
        var quantity = input.quantity;

        var queryStr = 'SELECT * FROM products WHERE ?';

        connection.query(queryStr, { item_id: item }, function (err, res) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Please select a valid Item ID');
                displayInventory();

            } else {
                var productData = data[0];

                if (quantity <= productData.stock_quantity) {
                    console.log('The product you requested is in stock');

                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (product.Data.price * quantity);

                    connection.query(updateQueryStr, function (err, data) {
                        if (err) throw err;
                        console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n-------------------------------------------------------------\n");
                        connection.end();
                    })
                } else {
                    console.log('Sorry, not enough product in stock');
                    console.log('Please update your order');
                    console.log("\n-------------------------------------------------------------\n");
                    displayInventory();
                }
            }
        })
    })
}


function displayInventory() {
    queryStr = 'SELECT * FROM products';
    connection.query(queryStr, function (err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('..............\n');

        var strOut = '';
        for (var i = 0; i < data.length; i++) {
            strOut = '';
            strOut += 'Item ID: ' + data[i].item_id + ' // ';
            strOut += 'Product Name: ' + data[i].product_name + ' // ';
            strOut += 'Department: ' + data[i].department_name + ' // ';
            strOut += 'Price $' + data[i].price + '\n';

            console.log(strOut);
        }
        console.log("------------------------------------------------------\n");

        userPurchase();
    })
}

function runBamazon() {
    displayInventory();
}