// Get element by id following this way to be sorter
function getMyEleId(ele) {
  return document.getElementById(ele);
}

// Get element by selector following this way to be sorter
function getMyEleSelector(ele) {
  return document.querySelector(ele);
}

// Handle get Uber type
function GetUberType() {
  var uberType = "";
  var uberX = getMyEleId("uberX").checked;
  var uberSUV = getMyEleId("uberSUV").checked;
  var uberBlack = getMyEleId("uberBlack").checked;

  if (uberX) {
    uberType = "uberX";
  } else if (uberSUV) {
    uberType = "uberSUV";
  } else if (uberBlack) {
    uberType = "uberBlack";
  }

  return uberType;
};


function a() {
  var chargeCost = 0;
  if (0 < kmNumber && kmNumber <= 1) {
    chargeCost = (kmNumber * UBER_ZONE_BEGIN) + (timeWait * UBER_ZONE_TIME);
  }
  if (1 < kmNumber && kmNumber <= 20) {
    chargeCost = (1 * UBER_ZONE_BEGIN) + ((kmNumber - 1) * UBER_ZONE_MIDDLE) + (timeWait * UBER_ZONE_TIME);
  }
  chargeCost = (1 * UBER_ZONE_BEGIN) + (19 * UBER_ZONE_MIDDLE) + ((kmNumber - 20) * UBER_ZONE_END) + (timeWait * UBER_ZONE_TIME);

}

// Handle Charge Cost
function HandleCharge() {
  getMyEleId("btncharge").addEventListener("click", function() {
    var kmNumber = getMyEleId("kmNumber").value;
    var timeWait = getMyEleId("timeWait").value;
    var chargeBlock = getMyEleId("divThanhTien");
    var chargeInfo = getMyEleSelector("#divThanhTien #xuatTien");

    // Check Km Number Value or Time Waiting is empty => Don't do anything
    // - These fields are required
    if (kmNumber.length == 0 || timeWait.length == 0) {
      chargeBlock.style.display = "block";
      chargeBlock.innerText = "Vui lòng không để trống!";

      return null;
    }

    // Check value's inputted is not number
    if (isNaN(kmNumber) || isNaN(timeWait)) {
      chargeBlock.style.display = "block";
      chargeBlock.innerText = "Vui lòng nhập số!";
    } else {
      // Convert to Float type to caculate correctly
      kmNumber = parseFloat(kmNumber);
      timeWait = parseFloat(timeWait);

      // Get Uber type
      var uberType = GetUberType();

      // Set UberX as default
      var UBER_ZONE_BEGIN = 8000;
      var UBER_ZONE_MIDDLE = 12000;
      var UBER_ZONE_END = 10000;
      var UBER_ZONE_TIME = 2000;

      switch (uberType) {
        case "uberSUV":
          UBER_ZONE_BEGIN = UBER_ZONE_BEGIN + 1000;
          UBER_ZONE_MIDDLE = UBER_ZONE_MIDDLE + 2000;
          UBER_ZONE_END = UBER_ZONE_END + 2000;
          UBER_ZONE_TIME = UBER_ZONE_TIME + 1000;
          break;
        case "uberBlack":
          UBER_ZONE_BEGIN = UBER_ZONE_BEGIN + 2000;
          UBER_ZONE_MIDDLE = UBER_ZONE_MIDDLE + 4000;
          UBER_ZONE_END = UBER_ZONE_END + 4000;
          UBER_ZONE_TIME = UBER_ZONE_TIME + 2000;
          break;
      }

      var chargeCost = 0;
      if (0 < kmNumber && kmNumber <= 1) {
        chargeCost = (kmNumber * UBER_ZONE_BEGIN) + (timeWait * UBER_ZONE_TIME);
      } else if (1 < kmNumber && kmNumber <= 20) {
        chargeCost = (1 * UBER_ZONE_BEGIN) + ((kmNumber - 1) * UBER_ZONE_MIDDLE) + (timeWait * UBER_ZONE_TIME);
      } else {
        chargeCost = (1 * UBER_ZONE_BEGIN) + (19 * UBER_ZONE_MIDDLE) + ((kmNumber - 20) * UBER_ZONE_END) + (timeWait * UBER_ZONE_TIME);
      }

      chargeBlock.style.display = "block";
      chargeInfo.innerHTML = chargeCost;
    }
  });
}

// Handle print bill
function handlePrintBill() {
  document
    .getElementById("btnPrintBill")
    .addEventListener("click", function() {
      var kmNumber = getMyEleId("kmNumber").value;
      var chargeInfo = getMyEleId("xuatTien").textContent;
      var kmInputted = getMyEleSelector("#billDetail #kmInputted");
      var chargeDetail = getMyEleSelector("#billDetail #chargeDetail");

      kmInputted.innerHTML = kmNumber.length ? kmNumber : 0;
      chargeDetail.innerHTML = chargeInfo.length ? chargeInfo : 0;
    });
}

GetUberType();
HandleCharge();
handlePrintBill();
