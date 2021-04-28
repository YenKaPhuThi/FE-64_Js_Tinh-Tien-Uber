function handleSumCharge() {
	document.getElementById("btncharge").addEventListener("click", function () {
		var kmNumber = document.getElementById("kmNumber");
		var timeWaiting = document.getElementById("timeWaiting");
		var chargeBlock = document.getElementById("divThanhTien");
		var chargeInfo = document.querySelector("#divThanhTien #xuatTien");
		var uberType = document.querySelectorAll('input[name="selector"]');

		kmNumberVal = kmNumber.value;
		timeWaitingVal = timeWaiting.value;

		// Checkt Km Number Value or Time Waiting is empty => don't do anything
		// - This field is required
		if (kmNumberVal.length == 0 || timeWaitingVal == 0) {
			chargeBlock.style.display = "block";
			chargeInfo.innerText = "Vui lòng không để trống!";

			return null;
		}

		if (isNaN(kmNumberVal) || isNaN(timeWaitingVal)) {
			chargeBlock.style.display = "block";
			chargeInfo.innerText = "Vui lòng nhập số!";
		} else {
			kmNumber = parseFloat(kmNumberVal);
			timeWaiting = parseFloat(timeWaitingVal);

			// Set uberX is checked as default
			// - So number Payment is caculate following uberX
			var kmNumberZone1 = 8000;
			var kmNumberZone2 = 12000;
			var kmNumberZone3 = 10000;

			timeWaiting = timeWaiting * 2000;

			var selectedUserType = "";
			for (var i = 0; i < uberType.length; i++) {
				if (uberType[i].checked) {
					selectedUserType = uberType[i].id;
					break;
				}
			}

			if (selectedUserType === "uberSUV") {
				kmNumberZone1 = kmNumberZone1 + 1000;
				kmNumberZone2 = kmNumberZone2 + 2000;
				kmNumberZone3 = kmNumberZone3 + 2000;
				timeWaiting = timeWaiting + 1000;
			} else if (selectedUserType === "uberBlack") {
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
	document.getElementById("btnPrintBill").addEventListener("click", function () {
		var billDetail = document.getElementById("billDetail");
		var getInfoCharging = handleSumCharge.kmNumberVal;

		console.log(getInfoCharging);
		billDetail.innerHTML = "Bill detail here";
	});
}

handleSumCharge();
handlePrintBill();