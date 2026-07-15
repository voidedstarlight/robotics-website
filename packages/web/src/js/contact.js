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

	const form = document.getElementById("contact-form");
	form.classList.add("hidden");

	const title = document.getElementById("form-title");

	if (request.ok) {
		const success_message = document.getElementById("success-message");
		success_message.classList.remove("hidden");

		title.innerText = "Thank you for reaching out";
	} else {
		const failure_message = document.getElementById("failure-message");
		failure_message.classList.remove("hidden");
	}

	title.focus();

	const relative_scroll = title.getBoundingClientRect().top;
	const current_scroll = window.scrollY || window.pageYOffset;

	window.scrollTo({
		top: relative_scroll + current_scroll - 100,
		left: 0,
		behavior: "smooth"
	});
});
