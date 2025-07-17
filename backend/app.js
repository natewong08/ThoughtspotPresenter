import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 8080;
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);

app.get("/thoughtspotToken", async (req, res) => {
	// secret_key must be stored securely; here we assume the ThoughtSpot server name and secret_key are stored in env file
	let thoughtspot_url = process.env.TS_SERVER_URI;
	let thoughtspot_secret_key = process.env.TS_SECRET_KEY;

	// Short-time out for cookie-based login; make longer for cookieless
	const timeoutInSec = 60;

	// Assuming 'user_email' is the session value that matches the username in ThoughtSpot
	let tsTokenUrl = thoughtspot_url + "api/rest/2.0/auth/token/full";
	let tsTokenBody = {
		username: "REVENUE_DISPLAY",
		validity_time_in_sec: timeoutInSec,
		auto_create: false,
		secret_key: thoughtspot_secret_key,
	};
	// using Fetch to make HTTP request; you may use other package
	const response = await fetch(tsTokenUrl, {
		method: "POST",
		body: JSON.stringify(tsTokenBody),
		headers: {
			Accept: "application/json",
			"X-Requested-By": "ThoughtSpot",
			"Content-Type": "application/json",
		},
	});

	const results = await response.json();
	res.send(results.token);
});

app.listen(port, () => {
	console.log("Server running...");
});
