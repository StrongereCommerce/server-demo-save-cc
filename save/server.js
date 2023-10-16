const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const request = require("request");

const app = express();
app.use(bodyParser.json());
// Define your Cardknox credentials
const cardknoxCredentials = {
	xKey: "{key}", // Replace with your Cardknox credentials
	xVersion: "4.5.9",
	xSoftwareName: "YourSoftwareName",
	xSoftwareVersion: "1.0.0",
};

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/save-card", function (req, res) {
	// Extract card data from the request body (assuming you're sending card data from a form)
	const cardData = req.body;

	// Construct the payload including card data and Cardknox credentials
	const payload = {
		...cardknoxCredentials,
		xCommand: "cc:save",
		xCardNum: cardData.xCardNum,
		xExp: cardData.xExp,
		xStreet: cardData.xStreet,
		xZip: cardData.xZip,
		xMagstripe: cardData.xMagstripe,
		xName: cardData.xName,
	};
	// Make a POST request to the Cardknox gateway
	request.post(
		{
			url: "https://x1.cardknox.com/gateway",
			form: payload,
		},
		function (error, response, body) {
			if (error) {
				res.status(500).json({ error: "An error occurred." });
				return;
			}

			// Parse the query string response from Cardknox
			const responseData = parseQueryString(body);

			if (responseData.xStatus && responseData.xStatus === "Approved") {
				console.log(responseData);
				// Card method save was successful
				res.status(200).json({ message: "Card method saved successfully" });
			} else {
				// Card method save failed
				res.status(400).json({ error: responseData.xError });
			}
		}
	);
});

// Function to parse a query string into an object
function parseQueryString(queryString) {
	const params = new URLSearchParams(queryString);
	const data = {};
	for (const [key, value] of params) {
		data[key] = value;
	}
	return data;
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
	console.log(`Server is running on port ${PORT}`);
});
