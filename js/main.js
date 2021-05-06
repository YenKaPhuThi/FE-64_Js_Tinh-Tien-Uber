function handleSumCharge() {
  document.getElementById("btncharge").addEventListener("click", function () {
    var kmNumber = document.getElementById("kmNumber");
    var timeWaiting = document.getElementById("timeWaiting");
    var chargeBlock = document.getElementById("divThanhTien");
    var chargeInfo = document.querySelector("#divThanhTien #xuatTien");
    var uberType = document.querySelectorAll('input[name="selector"]');

    // Get value of Km and Time waiting
    kmNumberVal = kmNumber.value;
    timeWaitingVal = timeWaiting.value;

    // Checkt Km Number Value or Time Waiting is empty => don't do anything
    // - These fields are required
    if (kmNumberVal.length == 0 || timeWaitingVal.length == 0) {
      chargeBlock.style.display = "block";
      chargeInfo.innerText = "Vui lòng không để trống!";

      return null;
    }
	  
    // Check value's inputted are not number	  
    if (isNaN(kmNumberVal) || isNaN(timeWaitingVal)) {
      chargeBlock.style.display = "block";
      chargeInfo.innerText = "Vui lòng nhập số!";
    } else {
      kmNumber = parseFloat(kmNumberVal);
      timeWaiting = parseFloat(timeWaitingVal);

      // Set uberX is checked as default
      var uberTypeSelected = "";
      for (var i = 0; i < uberType.length; i++) {
        if (uberType[i].checked) {
          uberTypeSelected = uberType[i].id;
          break;
        }
      }

      var kmNumberZone1 = 8000;
      var kmNumberZone2 = 12000;
      var kmNumberZone3 = 10000;

      timeWaiting = timeWaiting * 2000;

      if (uberTypeSelected === "uberSUV") {
        kmNumberZone1 = kmNumberZone1 + 1000;
        kmNumberZone2 = kmNumberZone2 + 2000;
        kmNumberZone3 = kmNumberZone3 + 2000;
        timeWaiting = timeWaiting + 1000;
      } else if (uberTypeSelected === "uberBlack") {
        kmNumberZone1 = kmNumberZone1 + 2000;
        kmNumberZone2 = kmNumberZone2 + 4000;
        kmNumberZone3 = kmNumberZone3 + 4000;
        timeWaiting = timeWaiting + 2000;
      }

      if (0 < kmNumber && kmNumber <= 1) {
        sumCharging = kmNumber * kmNumberZone1 + timeWaiting;
      } else if (1 < kmNumber && kmNumber <= 20) {
        sumCharging = kmNumber * kmNumberZone2 + timeWaiting;
      } else {
        sumCharging = kmNumber * kmNumberZone3 + timeWaiting;
      }

      chargeBlock.style.display = "block";
      chargeInfo.innerText = sumCharging + " vnd";
    }
  });
}

function handlePrintBill() {
  document
    .getElementById("btnPrintBill")
    .addEventListener("click", function () {
      var kmInputted =  document.querySelector("#billDetail #kmInputted");
      var chargeDetail =  document.querySelector("#billDetail #chargeDetail");
	  
      // Get value of Km and Charge Info    
      var kmNumberVal = document.getElementById("kmNumber").value;
      var chargeInfoVal = document.getElementById("xuatTien").textContent;

      kmInputted.innerHTML = kmNumberVal;
      chargeDetail.innerHTML = chargeInfoVal;
    });
}

handleSumCharge();
handlePrintBill();
