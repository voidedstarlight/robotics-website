import type { FastifyInstance } from "fastify";
import { resolve as path_resolve } from "path";

interface ContactRequestParams {
	email: string;
	message: string;
	name: string;
	reason: string;
}

function checkAPIKey(
	key: string | undefined,
	resolve: ((key: string | undefined) => void)
) {
	if (!key) console.warn("[email] API key not found in environment");
	resolve(key);
}

const api_key = new Promise<string | undefined>(resolve => {
	// [todo] refactor
	if (process.env.NODE_ENV !== "production") {
		void import("dotenv").then(dotenv => {
			dotenv.config({
				path: path_resolve(process.cwd(), "../../.env")
			});

			checkAPIKey(process.env.EMAIL_API_KEY, resolve);
		});
	} else {
		checkAPIKey(process.env.EMAIL_API_KEY, resolve);
	}
});

function sanitise(raw: string) {
	const symbols: Record<string, string> = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#x27;",
		"/": "&#x2F;"
	};

	return raw.replace(/[&<>"'/]/g, match => symbols[match]);
}

function attachEmailHandler(server: FastifyInstance) {
	server.post(
		"/a/contact",
		{
			schema: {
				body: {
					properties: {
						email: { type: "string" },
						message: { type: "string" },
						name: { type: "string" },
						reason: { type: "string" }
					},
					required: ["email", "message", "name", "reason"],
					type: "object"
				}
			}
		},
		async (request, reply) => {
			if (!await api_key) return reply.status(500).send();

			const { name, email, reason, message } = request.body as ContactRequestParams;

			const html = `<!DOCTYPE html><body style="font-family:Helvetica,sans-serif;font-size:16px;margin:2em;padding:0"><h1 style="font-size:1.9em;font-weight:bold;margin-bottom:0.3em;margin-top:0;padding:0">Message Received on Contact Page</h1><p style="font-family:Helvetica,sans-serif;font-size:16px;margin:0;padding:0;">Sent by ${sanitise(name)} on ${new Date().toLocaleString("en-US", {timeZone: "US/Pacific"})} for ${sanitise(reason)}</p><pre style="white-space:pre-wrap;font-family:Helvetica,sans-serif;font-size:16px;border:1px solid #0a5d2a;border-radius:12px;margin-top:1.5em;padding:0.8em;margin-bottom:0;">${sanitise(message).replace("\n", "<br>")}</pre></body>`;

			const api_request = await fetch("https://api.brevo.com/v3/smtp/email", {
				body: JSON.stringify({
					sender: {
						name: "Grizzly Robotics",
						email: "no-reply@grizzlyrobotics.org"
					},
					to: [{
						email: "test@voided.systems",
						name: "Test Recipient"
					}],
					subject: `Message from ${sanitise(name)}`,
					htmlContent: html
				}),
				headers: {
					"api-key": await api_key,
					"content-type": "application/json"
				},
				method: "POST"
			});

			if (api_request.ok) {
				return reply.send();
			}

			return reply.status(500).send();
		}
	);
}

export default attachEmailHandler;
