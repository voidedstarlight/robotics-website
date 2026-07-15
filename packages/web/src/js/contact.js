document.getElementById("submit-form").addEventListener("click", async () => {
	const params = Object.fromEntries(
		["email", "message", "name", "reason"].map(
			id => [id, document.getElementById(id).value]
		)
	);

	const request = await fetch("/a/contact", {
		body: JSON.stringify(params),
		headers: {
			"content-type": "application/json"
		},
		method: "POST"
	});

	// deal with status codes
});
