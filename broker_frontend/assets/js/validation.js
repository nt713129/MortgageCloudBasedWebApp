

if(document.getElementById("msid")){
document.getElementById("msid").addEventListener("input", function(event){
    var value=event.srcElement.value;
    if(isNaN(value)){
        inValid162("mslidError","msid");
    }else{
        valid162("mslidError","msid");
    }
  });

  document.getElementById("mortvalue").addEventListener("input", function(event){
    var value=event.srcElement.value;
    if(isNaN(value)){
        inValid162("mortValueError","mortvalue");
    }else{
        valid162("mortValueError","mortvalue");
    }
  });

  function inValid162(errorId, elementId){
    document.getElementById(errorId).innerText="Enter only positive numbers";
    document.getElementById(elementId).value="";
    document.getElementById(elementId).className="form-control invalid"
  }

  function valid162(errorId, elementId){
    document.getElementById(errorId).innerText="";
    document.getElementById(elementId).className="form-control valid"
  }
}