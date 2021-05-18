// Get element by id
function getMyEleId(ele) {
  return document.getElementById(ele);
}

// Get element by selector
function getMyEleSelector(ele) {
  return document.querySelector(ele);
}

// Handle get Uber type
function getUberType() {
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
}

// Define error Messages
var errorMessage = [
  "Vui lòng không để trống số Km!",
  "Vui lòng không để trống thời gian chờ!",
  "Vui lòng nhập Km là số!",
  "Vui lòng nhập thời gian chờ là số!",
];

// Handle check input's value
function checkValueInput(fieldEle, errorEle, indexMsg) {
  var fieldEle = getMyEleId(fieldEle);
  var errorEle = getMyEleId(errorEle);

  errorEle.style.display = "none";

  if (fieldEle.value === "") {
    errorEle.style.display = "block";
    errorEle.innerHTML = errorMessage[indexMsg];
  }
}

// Handle check input's value type is number
function checkValueInputType(fieldEle, errorEle, indexMsg) {
  var fieldEle = getMyEleId(fieldEle);
  var errorEle = getMyEleId(errorEle);

  // Incase input's value is empty => Don't check value type
  if (fieldEle.value === "") {
    return null;
  } else {
    errorEle.style.display = "none";

    if (isNaN(fieldEle.value)) {
      errorEle.style.display = "block";
      errorEle.innerHTML = errorMessage[indexMsg];
    }
  }
}

// Handle Calculate Cost Payment
function handleCalculateCost(kmEle, timeWaitEle) {
  var kmNumber = getMyEleId(kmEle).value;
  var timeWait = getMyEleId(timeWaitEle).value;
  var chargeBlock = getMyEleId("divThanhTien");
  var chargeInfo = getMyEleSelector("#divThanhTien #xuatTien");

  // Incase input's value is empty  => Don't calculate cost payment
  if (kmNumber === "" || timeWait === "") {
    return null;
  } else {
    // Get Uber type
    var uberType = getUberType();

    // Convert input's value to float
    kmNumber = parseFloat(kmNumber);
    timeWait = parseFloat(timeWait);

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
      chargeCost = kmNumber * UBER_ZONE_BEGIN + timeWait * UBER_ZONE_TIME;
    } else if (1 < kmNumber && kmNumber <= 20) {
      chargeCost =
        1 * UBER_ZONE_BEGIN +
        (kmNumber - 1) * UBER_ZONE_MIDDLE +
        timeWait * UBER_ZONE_TIME;
    } else {
      chargeCost =
        1 * UBER_ZONE_BEGIN +
        19 * UBER_ZONE_MIDDLE +
        (kmNumber - 20) * UBER_ZONE_END +
        timeWait * UBER_ZONE_TIME;
    }

    chargeBlock.style.display = "block";
    chargeInfo.innerHTML = chargeCost;
  }
}

// Handle Charge Cost Payment
function handleCharge() {
  getMyEleId("btnCharge").addEventListener("click", function () {
    // Check Km Number Value & Time Waiting is empty => Show message
    //- These fields are required
    checkValueInput("kmNumber", "kmError", 0);
    checkValueInput("timeWait", "timeWaitError", 1);

    // Check input's value is number
    checkValueInputType("kmNumber", "kmError", 2);
    checkValueInputType("timeWait", "timeWaitError", 3);

    // Init handleCalculateCost()
    handleCalculateCost("kmNumber", "timeWait");
  });
}

// Handle print bill
function handlePrintBill() {
  getMyEleId("btnPrintBill").addEventListener("click", function () {
    var kmNumber = getMyEleId("kmNumber").value;
    var chargeInfo = getMyEleId("xuatTien").textContent;
    var kmInputted = getMyEleSelector("#billDetail #kmInputted");
    var chargeDetail = getMyEleSelector("#billDetail #chargeDetail");

    kmInputted.innerHTML = kmNumber.length ? kmNumber : 0;
    chargeDetail.innerHTML = chargeInfo.length ? chargeInfo : 0;
  });
}

handleCharge();
handlePrintBill();
