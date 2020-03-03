$(document).ready(function() {
  $(".nav-trigger").click(function() {
    $(".side-nav").toggleClass("visible");
  });
});

function session_chk() {
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else {
    var xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
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

function logout() {
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else {
    var xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.responseText == "1") {
        var nav_user = document.getElementsByClassName("nav-user")[0];
        nav_user.style.display = "none";
        document.getElementsByClassName("nav-login")[0].style.display = "block";
        window.location.href = "index.html";
      }
    }
  };
  xhr.open("GET", "php/logout.php", true);
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

function chkout_cart_chK() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.responseText != false) {
        var res = this.responseText;
        document.getElementsByClassName("cart-item-count")[0].innerHTML = res;
      }
    }
  };
  xhr.open("GET", "php/cart_chk.php", true);
  xhr.send();
}

function place_order() {
  var mob = document.getElementById("mob").value;
  var fname = document.getElementById("firstName").value;
  var lname = document.getElementById("lastName").value;
  var addr =
    document.getElementById("address").value +
    document.getElementById("address2").value;
  var ccno = document.getElementById("cc-number").value;
  var ccexp = document.getElementById("cc-expiration").value;
  var cccvv = document.getElementById("cc-cvv").value;
  updateCartTotal1();
  var ctotal = document.getElementsByClassName("cart-total-price")[0].innerText;
  var cprice = parseFloat(ctotal.replace("₹", ""));

  if (
    mob == null ||
    fname == null ||
    lname == null ||
    addr == null ||
    ccno == null ||
    ccexp == null ||
    cccvv == null
  ) {
    alert("Fill the fucking form correctly blyat!");
  }

  var phoneno = /^\d{10}$/;
  if (mob.match(phoneno)) {
    var xhr1 = new XMLHttpRequest();
    xhr1.onreadystatechange = function() {
      if (xhr1.readyState == 4) {
        //alert(this.responseText);
        var txt = xhr1.responseText;
        var res = txt.split(" ");
        var check = res[0] + res[1];
        if (check == "TransactionSuccessful") {
          console.log("res = " + res);
          alert("balance = " + res[2]);
          var bal = res[2];
          var flag = "";
          var email = res[3];
          //var bodyText = "";

          Email.send({
            Host: "smtp.gmail.com",
            Username: "freshfromfarm.dominic@gmail.com",
            /*Password: "D28DDB5740EC06D5C302128E41E32849EB4C",*/
            Password: "freshfromfarm9",
            SSL: "Required",
            To: email,
            From: "freshfromfarm.dominic@gmail.com",
            Subject: "Bill reciept for yourr order",
            Body:
              "Your cart total = ₹" +
              ctotal +
              "Your transaction was successful updated balance = ₹" +
              bal +
              ".\nThank You Visit Again!"
          }).then(message => {
            flag = message;
            console.log("flag = " + flag);
            if (flag == "OK") {
              alert("Transaction successful! Check Email for details!");
              window.location.href = "order.html";
            } else {
              console.log("shit happened!");
            }
          });
        }
      }
    };
    var url =
      "php/place_order.php?mob=" +
      parseInt(mob) +
      "&fname=" +
      fname +
      "&lname=" +
      lname +
      "&addr=" +
      addr +
      "&ccno=" +
      parseInt(ccno) +
      "&ccexp=" +
      ccexp +
      "&cccvv=" +
      parseInt(cccvv) +
      "&total=" +
      cprice;
    xhr1.open("GET", url, true);
    xhr1.send();
  } else {
    alert("Invalid Phone Number");
  }
}

function getCart() {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      //document.getElementById("yo").innerHTML = this.responseText;
      var txt = this.responseText;
      var res = txt.split(",");
      console.log(txt);
      //res[0] contains 1 item now
      for (i = 0; i < res.length - 1; i++) {
        ans = res[i].split(" ");
        console.log(ans);
        var title = ans[1];
        var price = ans[2];
        var qty = ans[3];
        console.log(title, price, qty);

        var cartItems = document.getElementsByClassName("chk-cart-items")[0];
        var cartRow = document.createElement("li");
        cartRow.classList.add(
          "list-group-item",
          "d-flex",
          "justify-content-between",
          "lh-condensed",
          "chk-cart-row"
        );
        var cartRowContents = `
                <div>
                  <h6 class="my-0">${title}</h6>
                  <small class="text-muted chk-cart-quantity-input">x${qty}</small>
                </div>
                <span class="text-muted chk-cart-price">₹${price}</span>`;
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        updateCartTotal1();
      }
    }
  };
  xhttp.open("GET", "php/chkAddToCart.php", true);
  xhttp.send();
}
function updateCartTotal1() {
  var cartItemContainer = document.getElementsByClassName("chk-cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("chk-cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("chk-cart-price")[0]
      .innerText;
    var qtyElement = cartRow.getElementsByClassName(
      "chk-cart-quantity-input"
    )[0].innerText;
    console.log(
      "priceElement = " + priceElement + ", qtyElement = " + qtyElement
    );
    var price = parseFloat(priceElement.replace("₹", ""));
    var qty = parseFloat(qtyElement.replace("x", ""));
    total = total + price * qty;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "₹" + total;
}
