if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  function session_chk() {
    if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
    } else {
      var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.responseText != false) {
          document.getElementsByClassName("nav-user")[0].style.display = block;
          document.getElementsByClassName("nav-login")[0].style.display = none;
        }
      }
    };
    xhr.open("GET", "php/session_chk.php", true);
    xhr.send();
  }
}
