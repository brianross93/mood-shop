import data from './data.js'

const itemList = document.getElementById('item-list')
const qtyList = document.getElementById('cart-qty')
const totalList = document.getElementById('cart-total')
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
const all_items_button = Array.from(document.querySelectorAll("button"))
console.log(all_items_button, "---------")
all_items_button.forEach(elt => elt.addEventListener('click', () => {
    console.log('Here')
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
}))
  


let cart = [ ];

//----------------------
//Handle clicks on list
itemList.onclick = function(e) {
    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name // data-name="??"
        removeItem(name, 1)
        showItems();
        
    }
}

//Add Item
function addItem(name, price) {
    console.log(cart)
    for (let i=0;i<cart.length; i ++) {
        if (cart[i].name === name) {
            cart[i].qty += 1
            showItems();
            return
        }
    }
    // const item = {
    //     name: name, 
    //     price: price, 
    //     qty: 1
    // }
    cart.push({
        name, 
        price, 
        qty: 1
    })
    showItems();
}
//--------------------------------------------
//Show the items
function showItems() {
    


    let qtyString = ''
    let itemStr = ''
    let totalStr = ''
    
    for (let i=0; i < cart.length; i++) {
        
        //{name: 'Apple', price: 0.99, qty: 3}
        const {name, price, qty} = cart[i]

        itemStr += `<li>${name} $${price} x ${qty} = 
        ${qty * price}
        <button class='remove' data-name="${name}"> Remove</button> </li>`
        
    }
    
    qtyString += `<li>You have ${getQty()} items in your cart </li>`
    totalStr += `<li>Total price is: ${addPrice()} </li>`
    itemList.innerHTML = itemStr
    qtyList.innerHTML = qtyString
    totalList.innerHTML = totalStr


}
//-----------------------------------------
// Adds the price for multiple items
function addPrice() {
    
    let total_Price = 0
    for (let i=0; i < cart.length; i++) {
        total_Price += parseFloat((cart[i].price * cart[i].qty))
    }   return total_Price.toFixed(2);
    
}
//----------------------------------------
// gets quantity for items in cart
function getQty() {
    let qty = 0
    for (let i=0; i< cart.length; i++) {
        qty += parseFloat(cart[i].qty)
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
            showItems()
            return
        }
    }
}



//---------------------------
//Function calls here
// addItem('Apple', 0.99)
// addItem('Orange', 1.29)
// addItem('Apple', 0.99)
// addItem('Opinion', 0.02)
// addItem('Frisbee', 9.62)
// addItem('Frisbee', 9.62)

// showItems();        
// removeItem('Apple', 1);
// showItems(); 
// removeItem('Frisbee',2);
// showItems();
// console.log(cart)