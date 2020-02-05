if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  var addToCartButtons = document.getElementsByClassName("itm-btn");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
  console.log(addToCartButtons);

  var items = document.getElementsByClassName("item");
  var price = 0;
  //console.log(items);
  for (var i = 0; i < items.length; i++) {
    var itemElement = items[i];
    //console.log(itemElement);
    var itemId = itemElement.getElementsByClassName("item-id")[0].innerText;
    //console.log("itemID = " + itemId);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 || this.status == 200) {
        var res = this.responseText;
        console.log("response = " + res);
        price = parseInt(res);
        itemElement.getElementsByClassName("item-price")[0].innerHTML = price;
      }
    };
    xhr.open("GET", "getItemPrice.php?itemId=" + parseFloat(itemId), false);
    xhr.send();
  }
}

function ajaxGetItemPrice(itemId) {}

function cart_chk() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 || this.status == 200) {
      if (this.responseText != false) {
        var res = this.responseText;
        document.getElementsByClassName("cart-item-no")[0].innerHTML = res;
      }
    }
  };
  xhr.open("GET", "cart_chk.php", true);
  xhr.send();
}

function addToCartClicked() {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName("item-name")[0].innerText;
  var price = shopItem.getElementsByClassName("item-price")[0].innerText;
  var item_id = shopItem.getElementsByClassName("item-id")[0].innerText;
  var qty = shopItem.getElementsByClassName("qty")[0].value;
  console.log(title, price, item_id, qty);

  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else {
    var xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function() {
    if (this.readyState == 4 || this.status == 200) {
      var tmp = this.responseText;
      console.log(tmp);
      if (!isNaN(tmp)) {
        document.getElementsByClassName("cart-item-no")[0].innerHTML = tmp;
      }

      alert("Item added in cart");
    }
  };
  xhr.open("POST", "cart.php?item_id=" + item_id + "&qty=" + qty, true);
  xhr.send();
}
