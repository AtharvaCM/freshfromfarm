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
      if (this.readyState == 4) {
        var res = this.responseText;
        console.log("response = " + res);
        price = parseInt(res);
        itemElement.getElementsByClassName("item-price")[0].innerHTML = price;
      }
    };
    xhr.open("GET", "php/getItemPrice.php?itemId=" + parseFloat(itemId), false);
    xhr.send();
    //get all the values as a single response so the page loads faster and get it as a xml or json
    //not from the DB but from the files and if you update any rate change the files so no need to
    //contact the DB everytime a page loads
  }
}

function showResult(str) {
  if (str.length == 0) {
    document.getElementById("livesearch").innerHTML = "";
    document.getElementById("livesearch").style.border = "0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      document.getElementById("livesearch").innerHTML = this.responseText;
      document.getElementById("livesearch").style.border = "1px solid #A5ACB2";
    }
  };
  xmlhttp.open("GET", "php/livesearch.php?q=" + str, true);
  xmlhttp.send();
}

function session_chk() {
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else {
    var xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      console.log(this.responseText);
      if (this.responseText != false) {
        var uname = this.responseText;
        var nav_user = document.getElementsByClassName("nav-user")[0];
        var nav_user_name = document.getElementsByClassName("nav-username")[0];
        nav_user.style.display = "block";
        nav_user_name.innerHTML = uname;
        document.getElementsByClassName("nav-login")[0].style.display = "none";
      }
    }
  };
  xhr.open("GET", "php/session_chk.php", true);
  xhr.send();
}

function cart_chk() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.responseText != false) {
        var res = this.responseText;
        document.getElementsByClassName("cart-item-no")[0].innerHTML = res;
      }
    }
  };
  xhr.open("GET", "php/cart_chk.php", true);
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
    if (this.readyState == 4) {
      var tmp = this.responseText;
      console.log(tmp);
      if (!isNaN(tmp)) {
        document.getElementsByClassName("cart-item-no")[0].innerHTML = tmp;
        alert("Item added in cart");
      }
    }
  };
  xhr.open("POST", "php/cart.php?item_id=" + item_id + "&qty=" + qty, true);
  xhr.send();
}
