function generateMatrices() {
	let numProcesses = document.getElementById("numProcesses").value;
	let numResources = document.getElementById("numResources").value;

	let matricesCont = document.getElementById("matricesCont");
	matricesCont.innerHTML = "";

	let allocationTable = document.createElement("div");
	allocationTable.className = "matrixCont";
	allocationTable.innerHTML =
		"<table class='matrix'><thead><tr><th colspan='" +
		(parseInt(numResources) + 1) +
		"'><h4>Allocation</h4></th></tr></thead><tbody id='allocationBody'></tbody></table>";
	matricesCont.appendChild(allocationTable);

	let maxTable = document.createElement("div");
	maxTable.className = "matrixCont";
	maxTable.innerHTML =
		"<table class='matrix'><thead><tr><th colspan='" +
		(parseInt(numResources) + 1) +
		"'><h4>Maximum</h4></th></tr></thead><tbody id='maxBody'></tbody></table>";
	matricesCont.appendChild(maxTable);

	let needTable = document.createElement("div");
	needTable.className = "matrixCont";
	needTable.innerHTML =
		"<table class='matrix'><thead><tr><th colspan='" +
		(parseInt(numResources) + 1) +
		"'><h4>Need</h4></th></tr></thead><tbody id='needBody'></tbody></table>";
	matricesCont.appendChild(needTable);

	let availableTable = document.createElement("div");
	availableTable.className = "matrixCont";
	availableTable.innerHTML =
		"<table class='matrix'><thead><tr><th colspan='" +
		(parseInt(numResources) + 1) +
		"'><h4>Available</h4></th></tr></thead><tbody id='availableBody'></tbody></table>";
	matricesCont.appendChild(availableTable);

	let allocationBody = document.getElementById("allocationBody");
	let maxBody = document.getElementById("maxBody");
	let needBody = document.getElementById("needBody");
	let availableBody = document.getElementById("availableBody");

	// Generate inputs for allocation, maximum, and need matrices
	for (let i = 1; i <= numProcesses; i++) {
		let allocationRow = "<tr><td>P" + i + "</td>";
		let maxRow = "<tr><td>P" + i + "</td>";
		let needRow = "<tr><td>P" + i + "</td>";
		for (let j = 1; j <= numResources; j++) {
			allocationRow +=
				"<td><input oninput='this.value = Math.abs(this.value)' size='2' maxlength='2' id='a" +
				i +
				j +
				"'></td>";
			maxRow +=
				"<td><input oninput='this.value = Math.abs(this.value)' size='2' maxlength='2' id='m" +
				i +
				j +
				"'></td>";
			needRow +=
				"<td><input readonly size='2' maxlength='2' id='n" + i + j + "'></td>";
		}
		allocationRow += "</tr>";
		maxRow += "</tr>";
		needRow += "</tr>";

		allocationBody.innerHTML += allocationRow;
		maxBody.innerHTML += maxRow;
		needBody.innerHTML += needRow;
	}

	// Generate inputs for available resources based on user input
	let availableRow = "<tr><td></td>";
	for (let k = 1; k <= numResources; k++) {
		availableRow +=
			"<td><input oninput='this.value = Math.abs(this.value)' size='2' maxlength='2' id='av1" +
			k +
			"'></td>";
	}
	availableRow += "</tr>";
	availableBody.innerHTML = availableRow;

	// Dynamically generate inputs for the number of instances of each resource
	let resInstInput = document.querySelector(".res-inst-input");
	resInstInput.innerHTML = ""; // Clear previous inputs
	for (let r = 0; r < numResources; r++) {
		let resInstInputItem = document.createElement("div");
		resInstInputItem.className = "res-inst";
		resInstInputItem.innerHTML =
			"<label for='resource" +
			String.fromCharCode(65 + r) +
			"'>No. of Inst of Res-" +
			String.fromCharCode(65 + r) +
			" : </label>" +
			"<input name='resource" +
			String.fromCharCode(65 + r) +
			"' type='text' size='2' maxlength='2 class='' id='resource" +
			String.fromCharCode(65 + r) +
			"' required>";
		resInstInput.appendChild(resInstInputItem);
	}

	// Dynamically generate the Process sequence chart
	let procSeq = document.querySelector(".proc-seq");
	procSeq.innerHTML = "";

	for (let i = 1; i <= numProcesses; i++) {
		let procSeqItem = document.createElement("div");
		procSeqItem.className = "procs";
		procSeqItem.innerHTML = "<div class='' id='p" + i + "'></div>";
		procSeq.appendChild(procSeqItem);
	}
}

function example() {
	let numProcesses = document.getElementById("numProcesses");
	numProcesses.value = parseInt(5);
	let numResources = document.getElementById("numResources");
	numResources.value = parseInt(3);

	generateMatrices();

	sampleAllocData = [
		[0, 1, 0],
		[2, 0, 0],
		[3, 0, 2],
		[2, 1, 1],
		[0, 0, 2],
	];

	sampleMaxData = [
		[7, 5, 3],
		[3, 2, 2],
		[9, 0, 2],
		[2, 2, 2],
		[4, 3, 3],
	];
	for (let i = 1; i <= 5; i++) {
		for (let j = 1; j <= 3; j++) {
			document.getElementById("a" + i + j).value =
				sampleAllocData[i - 1][j - 1];
			document.getElementById("m" + i + j).value = sampleMaxData[i - 1][j - 1];
		}
	}
	document.getElementById("resourceA").value = 10;
	document.getElementById("resourceB").value = 5;
	document.getElementById("resourceC").value = 7;
}

function reset() {
	let numProcesses = parseInt(document.getElementById("numProcesses").value);
	let numResources = parseInt(document.getElementById("numResources").value);

	// Remove the alert-msg
	const alertMsg = document.querySelector(".alert-msg");
	alertMsg.style.display = "none";

	// reset Alloc, Max, Need matrices values cell-by-cell
	for (let i = 1; i <= numProcesses; i++) {
		for (let j = 1; j <= numResources; j++) {
			document.getElementById("a" + i + j).value = "";
			document.getElementById("m" + i + j).value = "";
			document.getElementById("n" + i + j).value = "";
		}
		document.getElementById("p" + i).value = "";
	}

	// reset the available matrix
	for (let k = 1; k <= numResources; k++) {
		document.getElementById("av1" + k).value = "";
	}

	// Reset all no. of resource-instance inputs
	for (let k = 0; k <= numResources; k++) {
		document.getElementById("resource" + String.fromCharCode(65 + k)).value = "";
	}

	document.body.style.backgroundColor = "#ffffff";
}

function find_avaible() {
	let a = document.getElementById("resourceA").value;
	let b = document.getElementById("resourceB").value;
	let c = document.getElementById("resourceC").value;
	let x = 0;
	let y = 0;
	let z = 0;
	for (let i = 1; i <= 5; i++) {
		x = x + parseInt(document.getElementById("a" + i + "1").value);
		y = y + parseInt(document.getElementById("a" + i + "2").value);
		z = z + parseInt(document.getElementById("a" + i + "3").value);
	}
	document.getElementById("av11").value = a - x;
	document.getElementById("av12").value = b - y;
	document.getElementById("av13").value = c - z;
}

function find_need() {
	for (let i = 1; i <= 5; i++) {
		for (let j = 1; j <= 3; j++) {
			let mValue = parseInt(document.getElementById("m" + i + j).value);
			let aValue = parseInt(document.getElementById("a" + i + j).value);
			let result = mValue - aValue;

			// If result is negative, set it to an error value
			if (result < 0) {
				result = -1; // or use NaN for Not a Number
				// Log an error or throw an exception here
				alert("Process " + i + " is attempting to request more resources than it needs.")
			}

			document.getElementById("n" + i + j).value = result;
		}
	}
}

function run_algorithm() {
	let numProcesses = document.getElementById("numProcesses").value;
	let numResources = document.getElementById("numResources").value;

	find_avaible();
	find_need();
	let k = 1;
	let q = 1;
	for (let j = 1; j <= numProcesses; j++) {
		let x1 = parseInt(document.getElementById("av11").value); //av is for available
		let x2 = parseInt(document.getElementById("av12").value);
		let x3 = parseInt(document.getElementById("av13").value);
		for (let i = k; i <= numProcesses; i++) {
			let ex1 = parseInt(document.getElementById("a" + i + "1").value); // a is for allocation
			let ex2 = parseInt(document.getElementById("a" + i + "2").value);
			let ex3 = parseInt(document.getElementById("a" + i + "3").value);
			if (ex1 !== 0 || ex2 !== 0 || ex3 !== 0) {
				if (
					x1 >= parseInt(document.getElementById("n" + i + "1").value) &&
					x2 >= parseInt(document.getElementById("n" + i + "2").value) &&
					x3 >= parseInt(document.getElementById("n" + i + "3").value)
				) {
					// n is for needed
					document.getElementById("p" + q).innerHTML = "P" + i; // display the process
					document.getElementById("av11").value =
						parseInt(document.getElementById("av11").value) +
						parseInt(document.getElementById("a" + i + "1").value); // updation of available
					document.getElementById("av12").value =
						parseInt(document.getElementById("av12").value) +
						parseInt(document.getElementById("a" + i + "2").value);
					document.getElementById("av13").value =
						parseInt(document.getElementById("av13").value) +
						parseInt(document.getElementById("a" + i + "3").value);
					document.getElementById("a" + i + "1").value = "0"; // reset of allocation
					document.getElementById("a" + i + "2").value = "0";
					document.getElementById("a" + i + "3").value = "0";

					k = i + 1;
					if (k == 6) {
						k = 1;
					}
					q = q + 1; //check for deadlock
					break;
				}
			}
		}
	}
	const alertMsg = document.querySelector(".alert-msg");
	// Check for deadlock or safe state
	if (q <= numProcesses) {
		alertMsg.style.display = "flex";
		alertMsg.style.background = "#ef9a9a66";
		alertMsg.textContent = "Deadlock !!";
		reset();
	} else {
		alertMsg.style.display = "flex";
		alertMsg.style.background = "#83f28f66";
		alertMsg.textContent = "Safe Sequence !!";
	}
}
