const inputs = await fetch("http://localhost:8080/inputs").then((response) =>
	response.json()
);

const tsembed = window.tsembed;
tsembed.init({
	thoughtSpotHost: inputs.thoughtSpotHost,
	authType: tsembed.AuthType.TrustedAuthToken,
	getAuthToken: async () => {
		// fetch() returns a Promise naturally. Assumes a JSON response from the token request service with a 'token' property
		return fetch("http://localhost:8080/thoughtspotToken").then((response) =>
			response.text()
		);
	},
});

const liveboardEmbed = new tsembed.LiveboardEmbed(
	document.getElementById("ts-embed"),
	{
		frameParams: {
			width: "100%",
			height: "100%",
		},
		liveboardId: inputs.liveboardId,
	}
);

liveboardEmbed.render();
