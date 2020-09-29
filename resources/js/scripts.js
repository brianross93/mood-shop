import data from './data.js'
const itemsContainer = document.getElementById('items')

for (let i=0; i<data.length; i++) {
    let newDiv = document.createElement('div');
    newDiv.className = 'item'



    let img = document.createElement('img')
    let desc = document.createElement('P')
    desc.innerText = data[i].desc
    newDiv.appendChild(desc)
    img.src = data[i].image
    img.width = 300
    img.height = 300

    newDiv.appendChild(img)
    itemsContainer.appendChild(newDiv)

    let price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)

    let button = document.createElement('button')
    button.id = data[i].name

    button.dataset.price = data[i].price
    button.innerHTML = 'Add to Cart'
    newDiv.appendChild(button)
    itemsContainer.appendChild(newDiv)
    
}

let cart = [ ];

//Add Item
function addItem(name, price) {
    for (let i=0;i<cart.length; i ++) {
        if (cart[i].name === name) {
            cart[i].qty += 1
            return
        }
    }
    const item = {
        name: name, 
        price: price, 
        qty: 1
    }
    cart.push(item)
}
//--------------------------------------------
//Show the items
function showItems() {
    console.log(`You have ${getQty()} items in your cart`)
    console.log(`Total price is: ${addPrice()} `)
    for (let i=0; i < cart.length; i++) {
        console.log(` ${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)

    }
}
//-----------------------------------------
// Adds the price for multiple items
function addPrice() {
    
    let total_Price = 0
    for (let i=0; i < cart.length; i++) {
        total_Price += (cart[i].price * cart[i].qty)
    }   return total_Price.toFixed(2);
    
}
//----------------------------------------
// gets quantity for items in cart
function getQty() {
    let qty = 0
    for (let i=0; i< cart.length; i++) {
        qty += cart[i].qty
    }
    return qty;
}

function removeItem(name, qty =0) {
    for (let i=0; i < cart.length; i+=1) {
        if (cart[i].name === name) {
            if (qty>0) {
                cart[i].qty -= qty
            }

            if (cart[i].qty < 1 || qty ===0) {
                cart.splice(i, 1)
            }
            
            return
        }
    }
}



//---------------------------
//Function calls here
addItem('Apple', 0.99)
addItem('Orange', 1.29)
addItem('Apple', 0.99)
addItem('Opinion', 0.02)
addItem('Frisbee', 9.62)
addItem('Frisbee', 9.62)

showItems();        
removeItem('Apple', 1);
showItems(); 
removeItem('Frisbee',2);
showItems();