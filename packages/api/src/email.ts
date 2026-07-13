import type { FastifyInstance } from "fastify";
import { resolve as path_resolve } from "path";

const api_key: Promise<string> = new Promise(resolve => {
	// [todo] refactor
	if (process.env.NODE_ENV !== "production") {
		import("dotenv").then(dotenv => {
			dotenv.config({
				path: path_resolve(process.cwd(), "../../.env")
			});

			resolve(process.env.EMAIL_API_KEY as string);
		});
	} else {
		resolve(process.env.EMAIL_API_KEY as string);
	}
});

function attachEmailHandler(server: FastifyInstance) {
	server.post("/a/contact", async (request, reply) => {
		const api_request = await fetch("https://api.brevo.com/v3/smtp/email", {
			body: JSON.stringify({
				"sender":{
					"name": "Test Sender",
					"email": "test@grizzlyrobotics.org"
				},
				"to": [{
					"email":"test@voided.systems",
					"name":"Test Recipient"
				}],
				"subject":"Message Sending",
				"htmlContent":" Donec fermentum placerat fringilla. Praesent pretium fringilla leo nec lacinia. Pellentesque accumsan molestie nisl at malesuada. Donec auctor vitae nisi vitae lacinia. Morbi consequat, mauris vitae placerat condimentum, risus justo iaculis nulla, nec volutpat lectus dolor vitae sem. Donec maximus augue a libero dapibus laoreet. Nullam ac libero gravida, porttitor leo luctus, posuere leo. Nam nec scelerisque arcu. Maecenas porttitor odio ut dictum dignissim. Suspendisse vel est id est vestibulum accumsan non quis sem. Integer mauris leo, pellentesque ut molestie vitae, tristique sit amet tortor. Sed nec purus feugiat, ullamcorper libero at, laoreet nisl. Nunc at diam augue. Integer feugiat elit bibendum sem interdum, vitae varius neque posuere. Fusce elementum sollicitudin lectus vel mattis. Duis nec bibendum velit, nec dignissim erat. In vitae auctor augue, nec commodo sem. Aliquam non purus fringilla, lobortis lacus nec, tempus dui. Ut sit amet odio velit. Nam rhoncus maximus laoreet. Integer eleifend arcu ac neque aliquam eleifend. Mauris quis cursus eros. Pellentesque hendrerit, dui sit amet bibendum lobortis, risus felis sollicitudin nibh, sed vestibulum quam tellus id mauris. Sed sit amet tincidunt neque, ut dictum magna. Aenean ac orci id odio fringilla ultrices. Aliquam at massa egestas, fermentum ex sit amet, fermentum risus. Praesent enim mi, porttitor vel imperdiet at, efficitur quis magna.Nulla laoreet turpis sed eleifend egestas. Praesent rutrum vel turpis vel pellentesque. Donec ornare augue nec iaculis luctus. Mauris interdum ut augue sit amet dignissim. Cras ut ipsum id nunc vestibulum malesuada. Morbi a imperdiet sapien, ac lacinia metus. Sed at diam non leo rhoncus vehicula nec nec elit. Aenean sollicitudin, metus a gravida facilisis, erat ante vestibulum ex, quis ultrices orci tellus quis dui. Cras vehicula lobortis orci, non semper odio sagittis quis."
			}),
			headers: {
				"api-key": await api_key,
				"content-type": "application/json"
			},
			method: "POST",
		});

	
		if (api_request.ok) {
			return reply.send();
		}

		return reply.status(500).send();
	});
}

export default attachEmailHandler;
