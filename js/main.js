// var btncharging = document.getElementById("btncharging");
// var btnPrintBill = document.getElementById("btnPrintBill");

document.getElementById("btncharging").addEventListener("click", function () {
  handleSumCharging();
});

function handleSumCharging() {
  var uberType = document.getElementsByName("selector");
  var uberX = document.getElementById("uberX");
  var uberSUV = document.getElementById("uberSUV");
  var uberBlack = document.getElementById("uberBlack");
  var kmNumber = document.getElementById("kmNumber");
  var timeWaiting = document.getElementById("timeWaiting");
  var chargingInfoBlock = document.getElementById("divThanhTien");
  console.log(chargingInfoBlock);
  var chargingInfo = document.querySelector("#divThanhTien #xuatTien");

  kmNumberVal = kmNumber.value;
  timeWaitingVal = timeWaiting.value;

  kmNumber = parseFloat(kmNumberVal);
  timeWaiting = parseFloat(timeWaitingVal);

  staticTime = timeWaiting * 2000;

  if (0 < kmNumberVal && kmNumberVal <= 1) {
    sumCharging = kmNumber * 8000 + staticTime;
  } else if (1 < kmNumberVal && kmNumberVal <= 20) {
    sumCharging = kmNumber * 12000 + staticTime;
  } else {
    sumCharging = kmNumber * 10000 + staticTime;
  }

  chargingInfoBlock.style.display = "block";
  chargingInfo.innerText = sumCharging;
}
