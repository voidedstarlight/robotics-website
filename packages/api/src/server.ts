import {
	fastify, type FastifyReply, type FastifyRequest
} from "fastify";

import attachEmailHandler from "./email";
import attachPageRoutes from "./pages";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifyStatic from "@fastify/static";
import { join } from "path";

async function webserver() {
	const server = fastify({
		logger: {
			level: "warn"
		}
	});

	server.register(fastifyStatic, {
		prefix: "/",
		root: join(__dirname, "web/public")
	});

	await server.register(fastifyRateLimit, {
		global: false
	});

	attachEmailHandler(server);
	attachPageRoutes(server);

	return server;
}

const server = webserver();

void server.then(server => {
	if (process.env.NODE_ENV !== "production") {
		server.listen({
			host: "0.0.0.0",
			port: 5100
		}, err => {
			if (err) {
				console.warn("[server] failed to start fastify");
				console.warn(err);
				process.exit(1);
			} else {
				console.log("[server] http://0.0.0.0:5100");
			}
		});
	}
});

async function serverlessHandler(request: FastifyRequest, reply: FastifyReply) {
	await (await server).ready();
	(await server).server.emit("request", request, reply);
}

export default serverlessHandler;
