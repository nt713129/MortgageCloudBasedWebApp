

function validateMortgageRequest() {
    var x = document.getElementById("terms").checked;
    if (!x) {
      alert("Please Agree to terms and conditions");
      return false;
    }else{
      alert("Information is forwarded to broker please check your status in broker website");
      return true;
    }
  }