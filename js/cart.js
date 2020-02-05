if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  console.log(removeCartItemButtons);
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var qtyInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < qtyInputs.length; i++) {
    var input = qtyInputs[i];
    input.addEventListener("change", qtyChanged);
  }

  var addToCartButtons = document.getElementsByClassName("itm-btn");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);

  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("yo").innerHTML = this.responseText;
      var txt = this.responseText;
      var res = txt.split(",");
      console.log(txt);
      //res[0] contains 1 item now
      for (i = 0; i < res.length - 1; i++) {
        ans = res[i].split(" ");
        console.log(ans);
        imageSrc = ans[1];
        title = ans[2];
        price = ans[3];
        qty = ans[4];
        console.log(imageSrc, title, price);

        var cartItems = document.getElementsByClassName("cart-items")[0];
        var cartRow = document.createElement("div");
        cartRow.classList.add("cart-row");
        var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${qty}">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        cartRow
          .getElementsByClassName("btn-danger")[0]
          .addEventListener("click", removeCartItem);
        cartRow
          .getElementsByClassName("cart-quantity-input")[0]
          .addEventListener("change", qtyChanged);
        updateCartTotal();
      }
    }
  };
  xhttp.open("GET", "addToCart.php", true);
  xhttp.send();
}

function purchaseClicked() {
  alert("Thank you for ur purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  //update cart table in db
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function removeCartItem(event) {
  var buttonClicked = event.target;
  var shopItem = buttonClicked.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("cart-item-title")[0].innerText;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 || this.status == 200) {
      console.log(title);
    }
  };
  xhr.open("GET", "remove_cart.php?title=" + title, true);
  xhr.send();
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function qtyChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
  }
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemNames = cartItems.getElementsByClassName("item-name");
  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("Item already added to cart!");
      return;
    }
  }
  var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", qtyChanged);
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("item-name")[0].innerText;
  sessionStorage.setItem("item_title", title);
  var price = shopItem.getElementsByClassName("item-price")[0].innerText;
  sessionStorage.setItem("item_price", price);
  //var imageSrc = shopItem.getElementByClassName('item-image')[0].src
  console.log(title, price);
  addItemToCart(title, price);
  //this func will be in cart.js so grab these itm vals and
  //pass it on the func in the cart.js file
  updateCartTotal();
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var qtyElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
    console.log(priceElement, qtyElement);
    var price = parseFloat(priceElement.innerText.replace("₹", ""));
    var qty = qtyElement.value;
    total = total + price * qty;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "₹" + total;
}
