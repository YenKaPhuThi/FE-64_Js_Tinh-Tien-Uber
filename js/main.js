// Get element by id
function getMyEleId(ele) {
  return document.getElementById(ele);
}

// Get element by selector
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
}

// Message for notification
var messageNotice = [
  "Vui lòng không để trống số Km!",
  "Vui lòng không để trống thời gian chờ!",
  "Vui lòng nhập Km là số!",
  "Vui lòng nhập thời gian chờ là số!",
];

// Handle check input's value
function CheckValueInput(fieldEle, noticeEle, indexMsg) {
  var fieldEle = getMyEleId(fieldEle);
  var noticeEle = getMyEleId(noticeEle);

  noticeEle.style.display = "none";

  if (fieldEle.value === "") {
    noticeEle.style.display = "block";
    noticeEle.innerHTML = messageNotice[indexMsg];
  }
}

// Handle check input's value type is number
function CheckValueInputType(fieldEle, noticeEle, indexMsg) {
  var letterType = /^[0-9]+$/;
  var fieldEle = getMyEleId(fieldEle);
  var noticeEle = getMyEleId(noticeEle);

  noticeEle.style.display = "none";

  if (fieldEle.value.match(letterType)) {
    noticeEle.style.display = "block";
    noticeEle.innerHTML = messageNotice[indexMsg];
  }
}

// Handle Calculate Cost Payment
function HandleCalculateCost(kmEle, timeWaitEle) {
  var kmNumber = getMyEleId(kmEle).value;
  var timeWait = getMyEleId(timeWaitEle).value;

  // Get Uber type
  var uberType = GetUberType();

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

  return chargeCost;
}

// Handle Charge Cost Payment
function HandleCharge() {
  getMyEleId("btnCharge").addEventListener("click", function () {
    var chargeBlock = getMyEleId("divThanhTien");
    var chargeInfo = getMyEleSelector("#divThanhTien #xuatTien");

    // Check Km Number Value & Time Waiting is empty => Show message
    //- These fields are required
    CheckValueInput("kmNumber", "kmNotice", 0);
    CheckValueInput("timeWait", "timeWaitNotice", 1);

    // Check input's value is number
    // CheckValueInputType("kmNumber", "kmNotice", 2);
    // CheckValueInputType("timeWait", "timeWaitNotice", 3);

    chargeBlock.style.display = "block";
    chargeInfo.innerHTML = HandleCalculateCost("kmNumber", "timeWait");
  });
}

// Handle print bill
function HandlePrintBill() {
  getMyEleId("btnPrintBill").addEventListener("click", function () {
    var kmNumber = getMyEleId("kmNumber").value;
    var chargeInfo = getMyEleId("xuatTien").textContent;
    var kmInputted = getMyEleSelector("#billDetail #kmInputted");
    var chargeDetail = getMyEleSelector("#billDetail #chargeDetail");

    kmInputted.innerHTML = kmNumber.length ? kmNumber : 0;
    chargeDetail.innerHTML = chargeInfo.length ? chargeInfo : 0;
  });
}

HandleCharge();
HandlePrintBill();
