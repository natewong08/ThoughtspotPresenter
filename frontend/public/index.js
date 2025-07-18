const tsembed = window.tsembed;
tsembed.init({
	// enter your Thoughtspot host url here
	thoughtSpotHost: "",
	authType: tsembed.AuthType.TrustedAuthToken,
	getAuthToken: async () => {
		// fetch() returns a Promise naturally. Assumes a JSON response from the token request service with a 'token' property
		return fetch("http://localhost:8080/thoughtspotToken")
			.then((response) => response.text())
			.then((data) => data);
	},
});

const liveboardEmbed = new tsembed.LiveboardEmbed(
	document.getElementById("ts-embed"),
	{
		frameParams: {
			width: "100%",
			height: "100%",
		},
		// enter your liveboard id here
		liveboardId: "",
	}
);

liveboardEmbed.render();
