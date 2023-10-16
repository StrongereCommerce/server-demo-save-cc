// document
// 	.getElementById("payment-form")
// 	.addEventListener("submit", function (e) {
// 		e.preventDefault();

// 		const payload = {
// 			xCardNum: document.getElementById("cardNum").value,
// 			xExp: document.getElementById("exp").value,
// 			xKey: "strongecommedevd28c303e478c4bc2a1698897e4fa3d",
// 			xVersion: "4.5.9",
// 			xSoftwareName: "YourSoftwareName",
// 			xSoftwareVersion: "1.0.0",
// 			xCommand: "cc:save",
// 			xCustom01: "Register01",
// 			xStreet: document.getElementById("street").value,
// 			xZip: document.getElementById("zip").value,
// 			xName: document.getElementById("name").value,
// 		};
// 		const endpoint = "https://x1.cardknox.com/gateway";

// 		// Add a div element to display messages on the screen
// 		const messageDiv = document.createElement("div");
// 		messageDiv.id = "message";
// 		document.body.appendChild(messageDiv);

// 		// Clear any previous messages
// 		messageDiv.innerHTML = "";

// 		fetch(endpoint, {
// 			method: "POST",
// 			body: JSON.stringify(payload),
// 			headers: {
// 				"Content-Type": "application/json",
// 				"X-Recurring-Api-Version": "2.0",
// 			},
// 		})
// 			.then((response) => {
// 				if (!response.ok) {
// 					throw new Error(
// 						`Server returned an error with status ${response.status}`
// 					);
// 				}
// 				return response.json();
// 			})
// 			.then((data) => {
// 				if (data.xStatus && data.xStatus === "Approved") {
// 					messageDiv.innerHTML = "Payment successful!";
// 				} else {
// 					messageDiv.innerHTML = "Payment failed: " + data.xError;
// 				}
// 			})
// 			.catch((error) => {
// 				console.error("Error:", error);
// 				messageDiv.innerHTML = "An error occurred. Please try again.";
// 			});
// 	});

document
	.getElementById("payment-form")
	.addEventListener("submit", function (e) {
		e.preventDefault();

		const payload = {
			xCardNum: document.getElementById("cardNum").value,
			xExp: document.getElementById("exp").value,
			xKey: "strongecommedevd28c303e478c4bc2a1698897e4fa3d", // Replace with your Cardknox credentials
			xVersion: "4.5.9",
			xSoftwareName: "YourSoftwareName",
			xSoftwareVersion: "1.0.0",
			xCommand: "cc:save",
			xCustom01: "Register01",
			xStreet: document.getElementById("street").value,
			xZip: document.getElementById("zip").value,
			xName: document.getElementById("name").value,
		};

		const endpoint = "https://x1.cardknox.com/gateway";

		fetch(endpoint, {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
				"X-Recurring-Api-Version": "2.0",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error(
						`Server returned an error with status ${response.status}`
					);
				}
				return response.json();
			})
			.then((data) => {
				if (data.xStatus && data.xStatus === "Approved") {
					alert("Payment successful!");
				} else {
					alert("Payment failed: " + data.xError);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	});
